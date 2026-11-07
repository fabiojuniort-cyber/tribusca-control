import {test} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import * as policy from './stage-policy.mjs';
import {expectations} from './diagnostic.mjs';

async function runWithSimulatedDependencies(firstExpectations, failPreparation, stderr = 'PGPASSWORD="minha senha" connection failed: POSTGRESQL://user:sensitive@localhost/db\n' + 'x'.repeat(2500), volume = 6000, readinessFailures = 0, probeDuration = 0, clockStart = 0, subMillisecond = false) {
 const source=readFileSync(new URL('./run-stage.mjs',import.meta.url),'utf8');
 const commands=[], trees=[];
 const summaryFile=new Map();
 let sqlProbes=0;
 let clock=clockStart,afterContainer=false,readinessClockReads=0;
 const dependencies={
  ...policy, expectations, path:path.posix,
  setTimeout:(callback,delay)=>{if(delay<=1000){clock+=delay;queueMicrotask(callback);}return 0;},
  clearTimeout(){},
  authorizeGrant:async()=> volume===45000?'F2-R7-SIZING-05':volume===18000?'F2-R7-SIZING-04':'F2-R7-SIZING-03',
  buildDiagnostic:()=>({source:'mock',originalHash:'hash',expectations:trees.length===1?firstExpectations:expectations(volume)}),
  sha256:()=> 'hash', PINNED:{originalTest:'hash'},
  finalizeEvidence:({product})=>({product_outcome:product,observation_outcome:{status:'COMPLETE',reasons:[]}}),
  productResult:({code}={})=>code===0?{status:'EXITED',exitCode:0}:{status:'NOT_RUN'},
  fileURLToPath:()=> '/assets/',
  fs:{mkdirSync(){},existsSync:()=>true,readFileSync:file=>summaryFile.get(file)??'mock',
   writeFileSync:(file,value)=>summaryFile.set(file,value),copyFileSync(){},openSync:()=>1,closeSync(){}},
  crypto:{randomBytes:()=>Buffer.alloc(12)},os:{platform:()=> 'linux',release:()=> 'mock',cpus:()=>[],totalmem:()=>0},
  performance:{now:()=>{if(subMillisecond&&afterContainer&&++readinessClockReads===2)clock+=29999.5;return clock;}}, console:{log(){}},
  process:{env:{F2_VOLUME:String(volume),RUNNER_TEMP:'/tmp',CI:'true',GITHUB_ACTIONS:'true',GITHUB_RUN_ATTEMPT:'1'},cwd:()=> '/lab',platform:'linux',version:'v24.22.2',on(){}},
  spawn(command,args,{cwd}){
   commands.push([command,args,cwd]);
   const child=new EventEmitter();
   child.stdout=new EventEmitter();child.stderr=new EventEmitter();
   child.exitCode=null;child.signalCode=null;
   child.kill=signal=>queueMicrotask(()=>{child.signalCode=signal;child.emit('close',null,signal);});
   if(command==='node'&&args.includes('--observer'))return child;
   const preparation=command==='docker'&&(args[0]==='run'?'docker_run':args.some(a=>a.includes('current_database()'))?'docker_exec_psql_initial':null);
   if(preparation==='docker_run')afterContainer=true;
   if(preparation==='docker_exec_psql_initial'){sqlProbes++;clock+=probeDuration;}
   if(preparation&&(preparation===failPreparation||(preparation==='docker_exec_psql_initial'&&sqlProbes<=readinessFailures))){
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
  assert.equal(control.error,step==='docker_run'?'command_failed:docker:2':'database_not_ready');
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
   step:'docker_run',exit_code:2,stderr:'context [LAB_VALUE_REDACTED]',stderr_truncated:false,error_kind:'EXIT_ERROR',signal:null,spawn_error_code:null,spawn_error:null,termination_confirmed:true,
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
test('grant 05 runs at most two trees at 45k and stops on the first failed preparation',async()=>{
 const expected=expectations(45000);
 const failed=await runWithSimulatedDependencies(expected,'docker_exec_psql_initial',undefined,45000);
 assert.equal(failed.exit,1);
 assert.deepEqual(failed.trees,['backend-control']);
 assert.equal(failed.summary[0].product_outcome.status,'NOT_RUN');
 assert.equal(failed.summary[0].preparation_failure.step,'docker_exec_psql_initial');
 const passed=await runWithSimulatedDependencies(expected,undefined,undefined,45000);
 assert.equal(passed.exit,0);
 assert.deepEqual(passed.trees,['backend-control','backend-integration']);
 assert.deepEqual(passed.summary.map(tree=>[tree.metrics.rows,tree.attempt]),[[45000,1],[45000,1]]);
});

for(const [scenario,failures]of [['temporary socket-only server',2],['target database absent',3],['complete readiness',0],['readiness exhausted',30]]){
 test(scenario+' requires real TCP SQL before preparation',async()=>{
  const result=await runWithSimulatedDependencies(expectations(45000),undefined,'PGPASSWORD="minha senha" POSTGRESQL://user:sensitive@localhost/db',45000,failures);
  const probes=result.commands.filter(([cmd,args])=>cmd==='docker'&&args.some(a=>a.includes('current_database()')));
  assert.ok(probes.every(([,args])=>args.includes('127.0.0.1')&&args.includes('radar_fiscal_test')&&args.includes('PGCONNECT_TIMEOUT=1')));
  assert.equal(result.commands.some(([,args])=>args.includes('pg_isready')),false);
  if(failures===30){
   assert.equal(probes.length,30);
   assert.deepEqual(result.trees,['backend-control']);
   assert.equal(result.summary[0].product_outcome.status,'NOT_RUN');
   assert.equal(result.summary[0].error,'database_not_ready');
   assert.doesNotMatch(result.summary[0].preparation_failure.stderr,/minha|senha|sensitive/);
  }else{
   assert.equal(result.exit,0);
   assert.equal(probes.length,failures+2);
   assert.ok(result.summary.every(r=>r.preparation_failure===undefined));
  }
 });
}

test('elapsed probe time exhausts the deadline before thirty probes',async()=>{
 const r=await runWithSimulatedDependencies(expectations(45000),undefined,'SQL error',45000,30,11000,0.123);
 const probes=r.commands.filter(([,args])=>args.includes('PGCONNECT_TIMEOUT=1'));
 assert.equal(probes.length,3);
 assert.deepEqual(r.trees,['backend-control']);
 assert.equal(r.summary[0].product_outcome.status,'NOT_RUN');
});

test('a real sub-ms deadline balance in the entry path starts no SQL process',async()=>{
 const r=await runWithSimulatedDependencies(expectations(45000),undefined,'',45000,0,0,0.123,true);
 assert.equal(r.commands.filter(([,args])=>args.includes('PGCONNECT_TIMEOUT=1')).length,0);
 assert.deepEqual(r.trees,['backend-control']);
 assert.equal(r.summary[0].product_outcome.status,'NOT_RUN');
 assert.equal(r.summary[0].error,'database_not_ready');
});
