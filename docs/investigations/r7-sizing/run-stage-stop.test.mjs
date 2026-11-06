import {test} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import * as policy from './stage-policy.mjs';
import {expectations} from './diagnostic.mjs';

async function runWithSimulatedDependencies(firstExpectations, failPreparation, stderr = 'PGPASSWORD="minha senha" connection failed: POSTGRESQL://user:sensitive@localhost/db\n' + 'x'.repeat(2500), volume = 6000) {
 const source=readFileSync(new URL('./run-stage.mjs',import.meta.url),'utf8');
 const commands=[], trees=[];
 const summaryFile=new Map();
 const dependencies={
  ...policy, expectations, path:path.posix,
  authorizeGrant:async()=> volume===18000?'F2-R7-SIZING-04':'F2-R7-SIZING-03',
  buildDiagnostic:()=>({source:'mock',originalHash:'hash',expectations:trees.length===1?firstExpectations:expectations(volume)}),
  sha256:()=> 'hash', PINNED:{originalTest:'hash'},
  finalizeEvidence:({product})=>({product_outcome:product,observation_outcome:{status:'COMPLETE',reasons:[]}}),
  productResult:({code}={})=>code===0?{status:'EXITED',exitCode:0}:{status:'NOT_RUN'},
  fileURLToPath:()=> '/assets/',
  fs:{mkdirSync(){},existsSync:()=>true,readFileSync:file=>summaryFile.get(file)??'mock',
   writeFileSync:(file,value)=>summaryFile.set(file,value),copyFileSync(){},openSync:()=>1,closeSync(){}},
  crypto:{randomBytes:()=>Buffer.alloc(12)},os:{platform:()=> 'linux',release:()=> 'mock',cpus:()=>[],totalmem:()=>0},
  performance:{now:()=>0}, console:{log(){}},
  process:{env:{F2_VOLUME:String(volume),RUNNER_TEMP:'/tmp',CI:'true',GITHUB_ACTIONS:'true',GITHUB_RUN_ATTEMPT:'1'},cwd:()=> '/lab',platform:'linux',version:'v24.22.2',on(){}},
  spawn(command,args,{cwd}){
   commands.push([command,args,cwd]);
   const child=new EventEmitter();
   child.stdout=new EventEmitter();child.stderr=new EventEmitter();
   child.exitCode=null;child.signalCode=null;
   child.kill=signal=>queueMicrotask(()=>{child.signalCode=signal;child.emit('close',null,signal);});
   if(command==='node'&&args.includes('--observer'))return child;
   const preparation=command==='docker'&&(args[0]==='run'?'docker_run':args.some(a=>a.includes('current_database()'))?'docker_exec_psql_initial':null);
   if(preparation&&preparation===failPreparation){
    queueMicrotask(()=>{
     child.stdout.emit('data',Buffer.from('stdout excluded'));
     child.stderr.emit('data',Buffer.from(stderr));
     child.exitCode=2;child.emit('close',2,null);
    });
    return child;
   }
   let output='';
   if(command==='git'&&args[1]==='HEAD'){
    const tree=path.posix.basename(cwd);trees.push(tree);
    output=policy.SOURCES[tree==='backend-control'?0:1];
   }else if(command==='docker'&&args.some(a=>a.includes('current_database()')))output='radar_fiscal_test|18.6';
   else if(command==='docker'&&args.some(a=>a.includes('information_schema.columns')))output='PASS';
   else if(command==='timeout')output='ONB02_R7_BACKFILL '+JSON.stringify({rows:volume,batchSize:5000,restart:true,idempotent:true,atomicFailure:true,headersPreserved:true,otherEntityPreserved:true});
   queueMicrotask(()=>{child.stdout.emit('data',Buffer.from(output));child.exitCode=0;child.emit('close',0,null);});
   return child;
  },
 };
 // Run the actual entry-point body, replacing only its imports and module URL.
 const body=source.replace(/^import .*\r?\n/gm,'').replaceAll('import.meta.url',JSON.stringify(import.meta.url));
 const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
 await new AsyncFunction(...Object.keys(dependencies),body)(...Object.values(dependencies));
 return {trees,commands,exit:dependencies.process.exitCode,summary:JSON.parse(summaryFile.get(`/lab/f2-r7-sizing-${volume}/summary.json`))};
}
test('divergent control expectations stop the real runner before integration',async()=>{
 const result=await runWithSimulatedDependencies(expectations(18000));
 assert.equal(result.exit,1);
 assert.equal(result.summary[0].product_outcome.exitCode,0);
 assert.equal(result.summary[0].semantic_code,0);
 assert.equal(result.summary[0].observation_outcome.status,'COMPLETE');
 assert.deepEqual(result.trees,['backend-control']);
 assert.equal(result.commands.filter(([cmd,args])=>cmd==='docker'&&args[0]==='run').length,1);
 assert.equal(result.summary.length,1);
});
test('valid control expectations allow the integration tree',async()=>{
 const result=await runWithSimulatedDependencies(expectations(6000));
 assert.deepEqual(result.trees,['backend-control','backend-integration']);
 assert.equal(result.exit,0);
 assert.equal(result.summary.length,2);
 assert.ok(result.summary.every(tree=>tree.product_outcome.exitCode===0&&tree.preparation_failure===undefined));
});

for(const step of ['docker_run','docker_exec_psql_initial']){
 test(step+' failure is recorded and stops before integration',async()=>{
  const result=await runWithSimulatedDependencies(expectations(6000),step);
  assert.equal(result.exit,1);
  assert.deepEqual(result.trees,['backend-control']);
  assert.equal(result.summary.length,1);
  const [control]=result.summary;
  assert.equal(control.status,'BLOCKED_PREPARATION');
  assert.equal(control.product_outcome.status,'NOT_RUN');
  assert.deepEqual(control.steps,[]);
  assert.equal(control.error,'command_failed:docker:2');
  const failure=control.preparation_failure;
  assert.equal(failure.step,step);
  assert.equal(failure.exit_code,2);
  assert.match(failure.stderr,/^\[LAB_VALUE_REDACTED\] connection failed: \[LAB_DSN_REDACTED\]/);
  assert.doesNotMatch(failure.stderr,/minha|senha|sensitive|POSTGRESQL|stdout excluded/);
  assert.equal(failure.stderr.length,2048);
  assert.equal(failure.stderr_truncated,true);
  assert.equal(result.commands.some(([cmd])=>cmd==='npm'||cmd==='timeout'),false);
 });
}

test('ambiguous password assignments omit the remainder of stderr',async()=>{
 for(const stderr of ['context PGPASSWORD="minha senha\ncontinuation','context POSTGRES_PASSWORD=minha senha\ncontinuation']){
  const result=await runWithSimulatedDependencies(expectations(6000),'docker_run',stderr);
  assert.deepEqual(result.trees,['backend-control']);
  assert.equal(result.summary[0].product_outcome.status,'NOT_RUN');
  assert.deepEqual(result.summary[0].preparation_failure,{
   step:'docker_run',exit_code:2,stderr:'context [LAB_VALUE_REDACTED]',stderr_truncated:false,
  });
 }
});

test('grant 04 runs at most two trees at 18k and stops on the first failed preparation',async()=>{
 const expected=expectations(18000);
 const failed=await runWithSimulatedDependencies(expected,'docker_exec_psql_initial',undefined,18000);
 assert.equal(failed.exit,1);
 assert.deepEqual(failed.trees,['backend-control']);
 assert.equal(failed.summary[0].product_outcome.status,'NOT_RUN');
 assert.equal(failed.summary[0].preparation_failure.step,'docker_exec_psql_initial');
 const passed=await runWithSimulatedDependencies(expected,undefined,undefined,18000);
 assert.equal(passed.exit,0);
 assert.deepEqual(passed.trees,['backend-control','backend-integration']);
 assert.deepEqual(passed.summary.map(tree=>[tree.metrics.rows,tree.attempt]),[[18000,1],[18000,1]]);
});
