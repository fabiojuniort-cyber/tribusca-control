import {test} from 'node:test';
import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import * as policy from './stage-policy.mjs';
import {expectations} from './diagnostic.mjs';

async function runWithSimulatedDependencies(firstExpectations) {
 const source=readFileSync(new URL('./run-stage.mjs',import.meta.url),'utf8');
 const commands=[], trees=[];
 const summaryFile=new Map();
 const dependencies={
  ...policy, expectations, path:path.posix,
  authorizeGrant:async()=> 'F2-R7-SIZING-03',
  buildDiagnostic:()=>({source:'mock',originalHash:'hash',expectations:trees.length===1?firstExpectations:expectations(6000)}),
  sha256:()=> 'hash', PINNED:{originalTest:'hash'},
  finalizeEvidence:({product})=>({product_outcome:product,observation_outcome:{status:'COMPLETE',reasons:[]}}),
  productResult:({code}={})=>code===0?{status:'EXITED',exitCode:0}:{status:'NOT_RUN'},
  fileURLToPath:()=> '/assets/',
  fs:{mkdirSync(){},existsSync:()=>true,readFileSync:file=>summaryFile.get(file)??'mock',
   writeFileSync:(file,value)=>summaryFile.set(file,value),copyFileSync(){},openSync:()=>1,closeSync(){}},
  crypto:{randomBytes:()=>Buffer.alloc(12)},os:{platform:()=> 'linux',release:()=> 'mock',cpus:()=>[],totalmem:()=>0},
  performance:{now:()=>0}, console:{log(){}},
  process:{env:{F2_VOLUME:'6000',RUNNER_TEMP:'/tmp',CI:'true',GITHUB_ACTIONS:'true',GITHUB_RUN_ATTEMPT:'1'},cwd:()=> '/lab',platform:'linux',version:'v24.22.2',on(){}},
  spawn(command,args,{cwd}){
   commands.push([command,args,cwd]);
   const child=new EventEmitter();
   child.stdout=new EventEmitter();child.stderr=new EventEmitter();
   child.exitCode=null;child.signalCode=null;
   child.kill=signal=>queueMicrotask(()=>{child.signalCode=signal;child.emit('close',null,signal);});
   if(command==='node'&&args.includes('--observer'))return child;
   let output='';
   if(command==='git'&&args[1]==='HEAD'){
    const tree=path.posix.basename(cwd);trees.push(tree);
    output=policy.SOURCES[tree==='backend-control'?0:1];
   }else if(command==='docker'&&args.some(a=>a.includes('current_database()')))output='radar_fiscal_test|18.6';
   else if(command==='docker'&&args.some(a=>a.includes('information_schema.columns')))output='PASS';
   else if(command==='timeout')output='ONB02_R7_BACKFILL '+JSON.stringify({rows:6000,batchSize:5000,restart:true,idempotent:true,atomicFailure:true,headersPreserved:true,otherEntityPreserved:true});
   queueMicrotask(()=>{child.stdout.emit('data',Buffer.from(output));child.exitCode=0;child.emit('close',0,null);});
   return child;
  },
 };
 // Run the actual entry-point body, replacing only its imports and module URL.
 const body=source.replace(/^import .*\r?\n/gm,'').replaceAll('import.meta.url',JSON.stringify(import.meta.url));
 const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
 await new AsyncFunction(...Object.keys(dependencies),body)(...Object.values(dependencies));
 return {trees,commands,exit:dependencies.process.exitCode,summary:JSON.parse(summaryFile.get('/lab/f2-r7-sizing-6000/summary.json'))};
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
});
