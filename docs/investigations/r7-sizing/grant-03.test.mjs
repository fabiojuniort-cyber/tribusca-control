import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {authorize} from './manual-gate-03.mjs';
import {authorizeGrant} from './grant-gate.mjs';
import {nextVolume,SOURCES} from './stage-policy.mjs';
import {expectations,VOLUMES} from './diagnostic.mjs';
const head='a'.repeat(40), stamp='2026-11-06T01:00:00Z';
const env={CI:'true',GITHUB_ACTIONS:'true',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_RUN_ATTEMPT:'1',GITHUB_RUN_ID:'500',GITHUB_SHA:head,F2_REVIEWED_HEAD:head,F2_GRANT:'F2-R7-SIZING-03',F2_REVIEW_COMMENT_ID:'77',GH_TOKEN:'fake'};
const paths=['/issues/comments/77','/actions/runs/42160266992','/actions/workflows/f2-r7-sizing-manual.yml/runs','/actions/workflows/f2-r7-sizing-02.yml/runs','/actions/workflows/f2-r7-sizing-03.yml/runs'];
function fixture(){
 return [{user:{login:'fabiojuniort-cyber'},issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/127',created_at:stamp,updated_at:stamp,body:'COORD_PASS_R7_SIZING_03 '+head+' prev_run=42147266762 probe_run=42160266992'},
 {id:42160266992,path:'.github/workflows/f2-r7-backend-checkout-probe.yml',event:'workflow_dispatch',head_branch:'main',head_sha:'58da7ff285b7e554f847553e0eaeaf7ebee45bee',run_attempt:1,status:'completed',conclusion:'success'},
 {total_count:1,workflow_runs:[{id:42132149543,status:'completed'}]},
 {total_count:1,workflow_runs:[{id:42147266762,status:'completed',conclusion:'failure'}]},
 {total_count:1,workflow_runs:[{id:500}]}];
}
function stub(rows,calls=[]){return async url=>{const i=paths.findIndex(p=>url.includes(p));assert.ok(i>=0);calls.push(i);return {ok:true,status:200,json:async()=>rows[i]};};}
test('executor selects 03 and verifies all evidence in order',async()=>{const calls=[];assert.equal(await authorizeGrant(env,stub(fixture(),calls)),env.F2_GRANT);assert.deepEqual(calls,[0,1,2,3,4]);});
for(const [name,i,change,error] of [
 ['different probe run',1,r=>r.id=123,/checkout_probe_not_proven/],
 ['failed probe',1,r=>r.conclusion='failure',/checkout_probe_not_proven/],
 ['different probe SHA',1,r=>r.head_sha=head,/checkout_probe_not_proven/],
 ['probe rerun',1,r=>r.run_attempt=2,/checkout_probe_not_proven/],
 ['wrong review',0,r=>r.body+=' invalid',/coordinator_pass_missing/],
 ['lost grant 01 history',2,r=>r.total_count=0,/grant_01_history_mismatch/],
 ['wrong prior run',3,r=>r.workflow_runs[0].id=42132149543,/prior_run_mismatch/],
 ['second dispatch',4,r=>{r.total_count=2;r.workflow_runs.unshift({id:499});},/budget_already_assigned/],
 ['current run not indexed',4,r=>r.workflow_runs[0].id=499,/budget_already_assigned/],
])test(name,async()=>{const f=fixture(),calls=[];change(f[i]);await assert.rejects(authorize(env,stub(f,calls)),error);assert.equal(calls.at(-1),i);});
test('rerun blocked before API',async()=>{await assert.rejects(authorize({...env,GITHUB_RUN_ATTEMPT:'2'},async()=>assert.fail('network')),/manual_context_blocked/);});
test('workflow depends on preceding successes and gate precedes checkout and runner',()=>{
 const w=fs.readFileSync(new URL('../../../.github/workflows/f2-r7-sizing-03.yml',import.meta.url),'utf8').replace(/\r\n/g,'\n');
 assert.deepEqual([...w.matchAll(/^  stage_(\d+):$/gm)].map(x=>+x[1]),VOLUMES);
 assert.deepEqual([...w.matchAll(/needs: stage_(\d+)\n    if: needs\.stage_\1\.result == 'success'/g)].map(x=>+x[1]),[6000,18000]);
 for(const block of w.split(/^  stage_\d+:$/m).slice(1))assert.ok(block.indexOf('await authorize()')<block.indexOf('checkout-anonymous-03.sh')&&block.indexOf('checkout-anonymous-03.sh')<block.indexOf('run-stage.mjs'));
 assert.doesNotMatch(w,/continue-on-error|OPS_BACKEND_READ_TOKEN/);
});
test('stage policy blocks continuation after any failed tree',()=>{
 const results=n=>SOURCES.map(source=>({source,attempt:1,product_outcome:{status:'EXITED',exitCode:0},semantic_code:0,observation_outcome:{status:'COMPLETE'},instrumentation:{expectations:expectations(n)},metrics:{rows:n}}));
 for(const [i,n] of VOLUMES.entries()){const rows=results(n);assert.equal(nextVolume(rows,n),VOLUMES[i+1]??null);rows[0].observation_outcome.status='INVALID';assert.equal(nextVolume(rows,n),null);assert.equal(nextVolume(rows.slice(0,1),n),null);}
});
test('stage policy rejects every invalid control-tree criterion',()=>{
 const n=6000;
 const pair=SOURCES.map(source=>({source,attempt:1,product_outcome:{status:'EXITED',exitCode:0},semantic_code:0,observation_outcome:{status:'COMPLETE'},instrumentation:{expectations:expectations(n)},metrics:{rows:n}}));
 for(const change of [
  {source:SOURCES[1]}, {attempt:2}, {product_outcome:{status:'NOT_RUN'}},
  {product_outcome:{status:'EXITED',exitCode:1}}, {semantic_code:1},
  {observation_outcome:{status:'INVALID'}}, {original_test_changed:true}, {error:'unexpected'},
  {instrumentation:{expectations:expectations(18000)}}, {metrics:{rows:18000}},
 ])assert.equal(nextVolume([{...pair[0],...change},pair[1]],n),null);
});
