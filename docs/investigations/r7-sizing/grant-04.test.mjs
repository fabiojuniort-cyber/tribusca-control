import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {authorizeGrant} from './grant-gate.mjs';

const sha='a'.repeat(40);
const env={CI:'true',GITHUB_ACTIONS:'true',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_REF:'refs/heads/main',
 GITHUB_RUN_ATTEMPT:'1',GITHUB_RUN_ID:'5',GITHUB_SHA:sha,F2_REVIEWED_HEAD:sha,F2_GRANT:'F2-R7-SIZING-04',
 F2_VOLUME:'18000',GH_TOKEN:'fake',F2_REVIEW_COMMENT_ID:'7'};
const prior=42163875401;
function fixture(){
 const calls=[];
 const replies=[
  {user:{login:'fabiojuniort-cyber'},issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/127',
   created_at:'time',updated_at:'time',body:`COORD_PASS_R7_SIZING_04 ${sha} prev_run=${prior}`},
  {id:prior,path:'.github/workflows/f2-r7-sizing-03.yml',head_sha:'343eea13b82c376d68601309b69a20b0e60f28c4',
   event:'workflow_dispatch',head_branch:'main',run_attempt:1,status:'completed',conclusion:'failure'},
  {total_count:3,jobs:[{name:'stage_6000',conclusion:'success'},{name:'stage_18000',conclusion:'failure'},{name:'stage_45000',conclusion:'skipped'}]},
  {total_count:1,workflow_runs:[{id:5}]},
 ];
 const request=async url=>{const payload=replies[calls.length];calls.push(url);return {ok:true,json:async()=>payload};};
 return {calls,replies,request};
}
test('grant 04 authorizes only with the expected comment, prior run, jobs and sole dispatch',async()=>{
 const f=fixture();
 assert.equal(await authorizeGrant(env,f.request),'F2-R7-SIZING-04');
 assert.deepEqual(f.calls.map(url=>new URL(url).pathname.split('/tribusca-control')[1]),[
  '/issues/comments/7','/actions/runs/42163875401','/actions/runs/42163875401/jobs','/actions/workflows/f2-r7-sizing-04.yml/runs',
 ]);
});
test('wrong volume, branch, event, rerun and stale SHA fail before any request',async()=>{
 const f=fixture();
 for(const override of [{F2_VOLUME:'6000'},{F2_VOLUME:'45000'},{GITHUB_REF:'refs/heads/other'},
  {GITHUB_EVENT_NAME:'push'},{GITHUB_RUN_ATTEMPT:'2'},{F2_REVIEWED_HEAD:'b'.repeat(40)}]){
  await assert.rejects(authorizeGrant({...env,...override},f.request),/manual_context_blocked/);
 }
 assert.deepEqual(f.calls,[]);
});
test('a second dispatch or missing current run fails closed',async()=>{
 for(const inventory of [{total_count:2,workflow_runs:[{id:5},{id:6}]},{total_count:0,workflow_runs:[]},
  {total_count:1,workflow_runs:[{id:6}]}]){
  const f=fixture();f.replies[3]=inventory;
  await assert.rejects(authorizeGrant(env,f.request),/budget_already_assigned_or_unverifiable/);
 }
});
test('an edited comment or divergent prior run or 6k result fails closed',async()=>{
 const cases=[[0,{updated_at:'edited'},/coordinator_pass_missing/],
  [1,{id:42},/grant_03_history_mismatch/],
  [2,{jobs:[{name:'stage_6000',conclusion:'failure'},{name:'stage_18000',conclusion:'failure'},{name:'stage_45000',conclusion:'skipped'}]},/grant_03_jobs_mismatch/]];
 for(const [index,delta,error] of cases){
  const f=fixture();Object.assign(f.replies[index],delta);
  await assert.rejects(authorizeGrant(env,f.request),error);
 }
});
test('workflow is manual and main-only, with exactly one 18k job and anonymous checkout after the gate',()=>{
 const yaml=readFileSync(new URL('../../../.github/workflows/f2-r7-sizing-04.yml',import.meta.url),'utf8');
 assert.deepEqual(yaml.match(/^on:\r?\n  ([a-z_]+):/m)?.slice(1),['workflow_dispatch']);
 assert.doesNotMatch(yaml,/^  (push|pull_request|schedule|workflow_call|repository_dispatch):/m);
 assert.deepEqual([...yaml.matchAll(/^  (stage_\d+):/gm)].map(m=>m[1]),['stage_18000']);
 assert.match(yaml,/if: github.ref == 'refs\/heads\/main'/);
 assert.match(yaml,/F2_VOLUME: '18000'/);
 const gate=yaml.indexOf('manual-gate-04.mjs'),checkout=yaml.indexOf('checkout-anonymous-03.sh'),runner=yaml.indexOf('run-stage.mjs');
 assert.ok(gate>=0&&gate<checkout&&checkout<runner);
 const checkoutScript=readFileSync(new URL('./checkout-anonymous-03.sh',import.meta.url),'utf8');
 for(const pin of ['b2150ab5ef34e9f9646e219d522e47738d9c04f5','2c41fbab8169b7efca6bd2e80c963d57a50585b6'])assert.ok(checkoutScript.includes(pin));
 assert.doesNotMatch(yaml,/environment:|OPS_BACKEND_READ_TOKEN/);
});
