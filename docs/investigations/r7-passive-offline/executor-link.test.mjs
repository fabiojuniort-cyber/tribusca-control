import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {productResult,aggregate} from './execution-state.mjs';
import {PINNED,prepareCandidate,finalizeEvidence} from './candidate-support.mjs';
import {executionAuthorized,configuration,requireBudget} from './candidate-config.mjs';
const product=productResult({code:0});
const pool=()=>({outcome:'COMPLETE',reason:null,pools:[{observation:{outcome:'COMPLETE',reason:null,capacity:2048,events:1},records:[{sequence:1,event:'acquire',client:1,code:null}]}]});
const observer=[{kind:'sample',ordinal:1},{kind:'observer_end',samples:1,elapsed_ms:1000}].map(x=>'F2_R7_DIAG '+JSON.stringify(x)).join('\n');
const valid=()=>({product,poolText:JSON.stringify(pool()),observerText:observer,observerExit:productResult({code:0}),observerEndedBeforeProduct:false,hashes:{...PINNED}});
test('product PASS and complete evidence are independent; conclusion stays NOT_PROVEN',()=>{
 const r=finalizeEvidence(valid());assert.equal(r.product_outcome,product);assert.equal(r.observation_outcome.status,'COMPLETE');assert.equal(r.diagnostic_conclusion,'NOT_PROVEN');
});
for(const mode of ['flush','missing','malformed','overflow','observer_stopped','observer_missing','observer_error','hash'])test('collector fault '+mode+' preserves exact product outcome',()=>{
 const v=valid();
 if(mode==='flush')v.flushText='F2_R7_OBSERVATION '+JSON.stringify({outcome:'INVALID',reason:'FLUSH_FAILED'});
 if(mode==='missing')v.poolText=undefined;
 if(mode==='malformed')v.poolText='{';
 if(mode==='overflow'){const p=pool();p.outcome='INVALID';p.reason='BUFFER_FULL';v.poolText=JSON.stringify(p);}
 if(mode==='observer_stopped'){v.observerText='F2_R7_DIAG '+JSON.stringify({kind:'sample',ordinal:1});v.observerExit=productResult({signal:'SIGKILL'});}
 if(mode==='observer_missing')v.observerText=undefined;
 if(mode==='observer_error')v.observerText+='\nF2_R7_DIAG '+JSON.stringify({kind:'observer_error',ordinal:2});
 if(mode==='hash')v.hashes.originalTest='changed';
 const r=finalizeEvidence(v);assert.equal(r.product_outcome,product);assert.equal(r.product_outcome.exitCode,0);assert.equal(r.observation_outcome.status,'INVALID');assert.equal(r.diagnostic_conclusion,'NOT_PROVEN');
});
test('actual dead child and simulated signal retain raw code/signal, never become PASS',()=>{
 const dead=spawnSync(process.execPath,['-e','process.exit(17)'],{encoding:'utf8',timeout:5000});assert.equal(dead.status,17);
 for(const p of [productResult({code:dead.status,signal:dead.signal}),productResult({signal:'SIGTERM'}),productResult({spawnError:Object.assign(Error('spawn'),{code:'ENOENT'})})]){
  const r=finalizeEvidence({...valid(),product:p,poolText:undefined});assert.equal(r.product_outcome,p);assert.notEqual(r.product_outcome.exitCode,0);assert.equal(r.observation_outcome.status,'INVALID');
 }
});
test('failed product can have complete observation; collector cannot convert it to success',()=>{
 const p=productResult({code:1}),r=finalizeEvidence({...valid(),product:p});assert.equal(r.product_outcome.exitCode,1);assert.equal(r.observation_outcome.status,'COMPLETE');
});
test('GNU timeout preserves command124 and marks inner test exit unknown',()=>{
 const p=productResult({code:124,boundary:'GNU_TIMEOUT'}),r=finalizeEvidence({...valid(),product:p});
 assert.equal(p.exitCode,124);assert.equal(p.innerExitCode,null);assert.equal(p.status,'TIMEOUT_WRAPPER');assert.equal(r.observation_outcome.status,'INVALID');
});
test('observer early graceful exit invalidates evidence even with exit0 and end marker',()=>{
 const r=finalizeEvidence({...valid(),observerEndedBeforeProduct:true});assert.equal(r.product_outcome,product);assert.ok(r.observation_outcome.reasons.includes('OBSERVER_ENDED_BEFORE_PRODUCT'));
});
test('observer cap, empty pool and invalid shape cannot claim complete evidence',()=>{
 for(const delta of [{poolText:JSON.stringify({outcome:'COMPLETE',pools:[]})},{poolText:JSON.stringify({outcome:'COMPLETE',pools:{}})},{observerText:observer.replace('1000','300000')}])assert.equal(finalizeEvidence({...valid(),...delta}).observation_outcome.status,'INVALID');
});
test('candidate only patches native constructor and is hash pinned/reversible',()=>{
 const read=n=>fs.readFileSync(new URL(n,import.meta.url),'utf8'),before=read('r7-test.snapshot.ts');
 const p=prepareCandidate(before,read);assert.equal(p.hashes.originalTest,PINNED.originalTest);
 assert.doesNotMatch(p.source,/instrumentPool|\.query\s*=|\.connect\s*=|\.release\s*=|\.end\s*=/);
 assert.throws(()=>prepareCandidate(before+'\n',read),/candidate_hash_changed/);
 assert.throws(()=>prepareCandidate(before,n=>read(n)+'\n'),/candidate_hash_changed/);
});
test('no granted budget and hard stop precedes every executable PG/process path',()=>{
 assert.equal(executionAuthorized,false);assert.equal(configuration.workflowEnabled,false);assert.throws(requireBudget,/R7_PAIR_NOT_AUTHORIZED/);
 const source=fs.readFileSync(new URL('run-pair-candidate.mjs',import.meta.url),'utf8');
 assert.ok(source.indexOf('requireBudget();')<source.indexOf('fs.mkdirSync'));
 assert.doesNotMatch(source,/instrumentPool|f2-r7-observe\.mjs|ops\/f2-r7\/observe\.mjs/);
 assert.match(source,/prepareCandidate/);assert.match(source,/finalizeEvidence/);assert.match(source,/result\.product_outcome=productResult/);
 const r=spawnSync(process.execPath,[new URL('run-pair-candidate.mjs',import.meta.url).pathname.replace(/^\/(?:([A-Z]):)/,'$1:')],{encoding:'utf8',timeout:5000});
 assert.notEqual(r.status,0);assert.match(r.stderr,/R7_PAIR_NOT_AUTHORIZED/);
});
test('all approved bounds and source order fixed without new workflow trigger',()=>{
 assert.equal(configuration.records,150000);assert.equal(configuration.batch,5000);assert.equal(configuration.statementTimeoutMs,45000);assert.equal(configuration.lockTimeoutMs,5000);assert.equal(configuration.pool,2);assert.equal(configuration.testTimeoutMs,240000);assert.equal(configuration.commandTimeoutSeconds,300);assert.equal(configuration.jobTimeoutMinutes,14);assert.equal(configuration.retries,0);
 assert.deepEqual(configuration.observer,{samples:300,durationMs:300000,cadenceMs:1000,statementMs:900,lockMs:500,pool:1});
});
