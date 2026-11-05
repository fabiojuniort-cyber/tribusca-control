import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import {buildDiagnostic,expectations,sha256,VOLUMES,ORIGINAL_SHA256} from './diagnostic.mjs';
import {checkContext,verifyReview,verifyFirstRun,authorize} from './manual-gate.mjs';
import {nextVolume,stagePass,SOURCES,parseMetrics,normalizeProductLog} from './stage-policy.mjs';
import {finalizeEvidence,PINNED} from './candidate-support.mjs';
const original=fs.readFileSync(new URL('r7-test.snapshot.ts',import.meta.url),'utf8');
const expected={6000:[4000,2000,1333,2667,6000,0,2,true],18000:[12000,6000,4000,8000,15000,3000,4,false],45000:[30000,15000,10000,20000,15000,30000,9,false]};
for(const n of VOLUMES)test('diagnostic '+n+' counts, atomic rollback, restart, idempotency and preserved history model',()=>{
 const e=expectations(n);assert.deepEqual([e.company,e.curation,e.created,e.updated,e.first,e.remaining,e.batches,e.firstCompleted],expected[n]);
 const fixture=Array.from({length:n},(_,i)=>({id:i+1,tenant:i<e.company?(i%2):1,action:i<e.company?((i+1)%3===0?'CREATED':'UPDATED'):'CURATION',header:'immutable-'+i,allowed:i<e.company?{is_active:true}:{rows:i+1},privateText:i<e.company?'synthetic':null,done:false}));
 const before=structuredClone(fixture),headers=fixture.map(x=>[x.id,x.tenant,x.action,x.header]);let checkpoint=0;
 function batch(fail=false){const picked=fixture.filter(x=>!x.done).slice(0,5000);if(fail)throw Error('synthetic_batch_interruption');for(const x of picked){x.privateText=null;x.done=true;}checkpoint+=picked.length;return picked.length;}
 assert.throws(()=>batch(true));assert.equal(checkpoint,0);assert.deepEqual(fixture,before);
 let first=0;for(let k=0;k<3&&fixture.some(x=>!x.done);k++)first+=batch();assert.equal(first,e.first);assert.equal(n-checkpoint,e.remaining);
 // Persisted state, not a connection-local cursor, survives a simulated reopen.
 const restarted=JSON.parse(JSON.stringify({fixture,checkpoint}));assert.equal(restarted.checkpoint,e.first);
 fixture.splice(0,fixture.length,...restarted.fixture);checkpoint=restarted.checkpoint;
 let resumed=0;while(fixture.some(x=>!x.done))resumed+=batch();assert.equal(resumed,e.remaining);assert.equal(checkpoint,n);assert.equal(batch(),0);
 assert.deepEqual(fixture.map(x=>[x.id,x.tenant,x.action,x.header]),headers);assert.deepEqual(fixture.map(x=>x.allowed),before.map(x=>x.allowed));
 assert.equal(fixture.filter(x=>x.action==='CREATED').length,e.created);assert.equal(fixture.filter(x=>x.action==='UPDATED').length,e.updated);assert.equal(fixture.filter(x=>x.action==='CURATION').length,e.curation);
 const p=buildDiagnostic(original,n);assert.equal(p.originalHash,ORIGINAL_SHA256);assert.equal(sha256(original),ORIGINAL_SHA256);assert.equal(p.edits,12);
 assert.match(p.source,/failed batch must not advance/);assert.match(p.source,/plan must not mutate checkpoint/);assert.match(p.source,/second known event uses its explicit rule/);assert.match(p.source,/assert.equal\(first.completed,/);
 const sqlOriginal=original.match(/`[^`]*`/gs),sqlNew=p.source.match(/`[^`]*`/gs);
 // All SQL literals are identical except the two generate_series upper bounds.
 assert.deepEqual(sqlNew,sqlOriginal.map(x=>x.replace('generate_series(1,100000)','generate_series(1,'+e.company+')').replace('generate_series(1,50000)','generate_series(1,'+e.curation+')')));
});
test('all unexpected volumes and input hashes rejected',()=>{
 for(const n of [0,5000,15000,150000,6001,NaN])assert.throws(()=>buildDiagnostic(original,n));assert.throws(()=>buildDiagnostic(original+'\n',6000));
});
const env={CI:'true',GITHUB_ACTIONS:'true',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_RUN_ATTEMPT:'1',F2_REVIEWED_HEAD:'a'.repeat(40),GITHUB_SHA:'a'.repeat(40),F2_GRANT:'F2-R7-SIZING-01',F2_REVIEW_COMMENT_ID:'123',GITHUB_RUN_ID:'10'};
test('push, ready/synchronize, rerun, head mismatch, missing grant blocked',()=>{
 checkContext(env);for(const event of ['push','pull_request','ready_for_review','synchronize','repository_dispatch'])assert.throws(()=>checkContext({...env,GITHUB_EVENT_NAME:event}));assert.throws(()=>checkContext({...env,GITHUB_RUN_ATTEMPT:'2'}));assert.throws(()=>checkContext({...env,F2_REVIEWED_HEAD:'b'.repeat(40)}));assert.throws(()=>checkContext({...env,F2_GRANT:''}));
});
test('coordinator full-head PASS exact line and origin checked',()=>{
 const c={user:{login:'fabiojuniort-cyber'},issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/127',body:'COORD_PASS_R7_SIZING '+env.GITHUB_SHA};verifyReview(c,env.GITHUB_SHA);for(const patch of [{body:'APPROVED'},{body:c.body+' extra'},{user:{login:'other'}},{issue_url:'wrong'}])assert.throws(()=>verifyReview({...c,...patch},env.GITHUB_SHA));
});
test('grant one run across all HEADs; API fails closed',async()=>{
 verifyFirstRun([{id:10}],10);assert.throws(()=>verifyFirstRun([{id:9,head_sha:'other'}],10));
 await assert.rejects(authorize(env,async()=>({ok:false})),/authorization_read_failed/);
 const review={user:{login:'fabiojuniort-cyber'},issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/127',body:'COORD_PASS_R7_SIZING '+env.GITHUB_SHA};
 await authorize(env,async url=>({ok:true,json:async()=>url.includes('/issues/comments/')?review:{workflow_runs:[{id:10}]}}));
});
const valid=n=>SOURCES.map(source=>({source,attempt:1,product_outcome:{status:'EXITED',exitCode:0},semantic_code:0,observation_outcome:{status:'COMPLETE'},instrumentation:{expectations:expectations(n)},metrics:{rows:n}}));
test('global first anomaly stops matrix, no second-tree or next-volume approval inferred',()=>{
 assert.equal(nextVolume(valid(6000),6000),18000);assert.equal(nextVolume(valid(18000),18000),45000);assert.equal(nextVolume(valid(45000),45000),null);
 for(const field of ['product','observation','preparation','hash','metrics']){const r=valid(6000);if(field==='product')r[0].product_outcome.exitCode=1;if(field==='observation')r[0].observation_outcome.status='INVALID';if(field==='preparation')r[0].semantic_code=1;if(field==='hash')r[0].original_test_changed=true;if(field==='metrics')r[0].metrics.rows=7;assert.equal(stagePass(r,6000),false);assert.equal(nextVolume(r,6000),null);}
 assert.equal(stagePass(valid(6000).slice(0,1),6000),false);
});
test('metrics wrong row count or absent invariants fail separately from product',()=>{
 const x={rows:6000,batchSize:5000,restart:true,idempotent:true,atomicFailure:true,headersPreserved:true,otherEntityPreserved:true};assert.equal(parseMetrics('ONB02_R7_BACKFILL '+JSON.stringify(x),6000).rows,6000);assert.throws(()=>parseMetrics('',6000));assert.throws(()=>parseMetrics('ONB02_R7_BACKFILL '+JSON.stringify({...x,rows:18000}),6000));
 assert.equal(parseMetrics('# ONB02_R7_BACKFILL '+JSON.stringify(x),6000).rows,6000);
});
test('runner unauthorized subprocess stops before filesystem or PG; no original write',()=>{
 const runner=new URL('run-stage.mjs',import.meta.url),r=spawnSync(process.execPath,[runner.pathname],{encoding:'utf8',timeout:5000,env:{...process.env,CI:'false',GITHUB_ACTIONS:'false'}});assert.notEqual(r.status,0);assert.match(r.stderr,/manual_context_blocked/);
 const s=fs.readFileSync(runner,'utf8');assert.doesNotMatch(s,/instrumentPool|f2-r7-observe\.mjs|requireBudget/);assert.ok(s.indexOf('await authorize()')<s.indexOf('fs.mkdirSync'));assert.match(s,/first anomaly|result.status!==/);assert.match(s,/flag:'wx'/);assert.doesNotMatch(s,/fs.writeFileSync\(f,/);
 assert.match(buildDiagnostic(original,6000).source,/statement_timeout=45000 -c lock_timeout=5000/);assert.match(s,/'300s'/);assert.match(s,/onb02-r6-purge/);
});
test('TAP-prefixed flush INVALID cannot be hidden by log formatting',()=>{
 const r=finalizeEvidence({product:{status:'EXITED',exitCode:0},flushText:normalizeProductLog('# F2_R7_OBSERVATION {"outcome":"INVALID"}'),hashes:PINNED});assert.ok(r.observation_outcome.reasons.includes('FLUSH_FAILED'));assert.equal(r.product_outcome.exitCode,0);
});
test('workflow is manual-only, three serial14min jobs, no automatic events',()=>{
 const s=fs.readFileSync(new URL('f2-r7-sizing-manual.yml',import.meta.url),'utf8');assert.equal((s.match(/^  workflow_dispatch:/gm)||[]).length,1);assert.doesNotMatch(s,/^\s+(push|pull_request|schedule|repository_dispatch|workflow_call):/m);assert.equal((s.match(/timeout-minutes: 14/g)||[]).length,3);assert.match(s,/needs: stage_6000/);assert.match(s,/needs: stage_18000/);assert.doesNotMatch(s,/strategy:|matrix:|continue-on-error|cancel-in-progress: true/);assert.equal((s.match(/node-version: '24.22.2'/g)||[]).length,3);
});
