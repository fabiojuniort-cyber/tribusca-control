import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {authorizeGrant} from './grant-gate.mjs';

const sha='a'.repeat(40);
const env={CI:'true',GITHUB_ACTIONS:'true',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_REF:'refs/heads/main',
 GITHUB_RUN_ATTEMPT:'1',GITHUB_RUN_ID:'5',GITHUB_SHA:sha,F2_REVIEWED_HEAD:sha,F2_GRANT:'F2-R7-SIZING-05',
 F2_VOLUME:'45000',GH_TOKEN:'fake',F2_REVIEW_COMMENT_ID:'7'};
const prior=42331592401;
function fixture(){
 const calls=[];
 const replies=[
  {user:{login:'fabiojuniort-cyber'},issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/127',
   created_at:'time',updated_at:'time',body:`COORD_PASS_R7_SIZING_05 ${sha} prev_run=${prior} scope=45k max_attempts=2`},
  {id:prior,path:'.github/workflows/f2-r7-sizing-04.yml',head_sha:'a79236db826ad9d8142cb4468ea4b93adcb2ccdf',
   event:'workflow_dispatch',head_branch:'main',run_attempt:1,status:'completed',conclusion:'success'},
  {total_count:1,jobs:[{name:'stage_18000',conclusion:'success'}]},
  {total_count:1,workflow_runs:[{id:prior}]},
  {total_count:1,workflow_runs:[{id:5}]},
 ];
 const request=async url=>{const payload=replies[calls.length];calls.push(url);return {ok:true,json:async()=>payload};};
 return {calls,replies,request};
}
test('grant 05 authorizes only with the expected comment, prior run, jobs and sole dispatch',async()=>{
 const f=fixture();
 assert.equal(await authorizeGrant(env,f.request),'F2-R7-SIZING-05');
 assert.deepEqual(f.calls.map(url=>new URL(url).pathname.split('/tribusca-control')[1]),[
  '/issues/comments/7','/actions/runs/42331592401','/actions/runs/42331592401/jobs','/actions/workflows/f2-r7-sizing-04.yml/runs','/actions/workflows/f2-r7-sizing-05.yml/runs',
 ]);
});
test('wrong volume, branch, event, rerun and stale SHA fail before any request',async()=>{
 const f=fixture();
 for(const override of [{F2_VOLUME:'6000'},{F2_VOLUME:'18000'},{GITHUB_REF:'refs/heads/other'},
  {GITHUB_EVENT_NAME:'push'},{GITHUB_RUN_ATTEMPT:'2'},{F2_REVIEWED_HEAD:'b'.repeat(40)}]){
  await assert.rejects(authorizeGrant({...env,...override},f.request),/manual_context_blocked/);
 }
 assert.deepEqual(f.calls,[]);
});
test('a second dispatch or missing current run fails closed',async()=>{
 for(const inventory of [{total_count:2,workflow_runs:[{id:5},{id:6}]},{total_count:0,workflow_runs:[]},
  {total_count:1,workflow_runs:[{id:6}]}]){
  const f=fixture();f.replies[4]=inventory;
  await assert.rejects(authorizeGrant(env,f.request),/budget_already_assigned_or_unverifiable/);
 }
});
test('an edited comment or divergent prior run or 18k result fails closed',async()=>{
 const cases=[[0,{updated_at:'edited'},/coordinator_pass_missing/],
  [1,{id:42},/grant_04_history_mismatch/],
  [2,{jobs:[{name:'stage_6000',conclusion:'success'},{name:'stage_18000',conclusion:'success'},{name:'stage_45000',conclusion:'skipped'}]},/grant_04_jobs_mismatch/]];
 for(const [index,delta,error] of cases){
  const f=fixture();Object.assign(f.replies[index],delta);
  await assert.rejects(authorizeGrant(env,f.request),error);
 }
});
test('workflow is manual and main-only, with exactly one 45k job and anonymous checkout after the gate',()=>{
 const yaml=readFileSync(new URL('../../../.github/workflows/f2-r7-sizing-05.yml',import.meta.url),'utf8');
 assert.deepEqual(yaml.match(/^on:\r?\n  ([a-z_]+):/m)?.slice(1),['workflow_dispatch']);
 assert.doesNotMatch(yaml,/^  (push|pull_request|schedule|workflow_call|repository_dispatch):/m);
 assert.deepEqual([...yaml.matchAll(/^  (stage_\d+):/gm)].map(m=>m[1]),['stage_45000']);
 assert.match(yaml,/if: github.ref == 'refs\/heads\/main'/);
 assert.match(yaml,/F2_VOLUME: '45000'/);
 const gate=yaml.indexOf('manual-gate-05.mjs'),checkout=yaml.indexOf('checkout-anonymous-03.sh'),runner=yaml.indexOf('run-stage.mjs');
 assert.ok(gate>=0&&gate<checkout&&checkout<runner);
 const checkoutScript=readFileSync(new URL('./checkout-anonymous-03.sh',import.meta.url),'utf8');
 for(const pin of ['b2150ab5ef34e9f9646e219d522e47738d9c04f5','2c41fbab8169b7efca6bd2e80c963d57a50585b6'])assert.ok(checkoutScript.includes(pin));
 assert.doesNotMatch(yaml,/environment:|OPS_BACKEND_READ_TOKEN/);
});

test('grant 05 rejects missing scope approval, prior rerun and an additional grant 04 dispatch',async()=>{
 for(const change of [
  f=>{f.replies[0].body=f.replies[0].body.replace(' scope=45k max_attempts=2','');},
  f=>{f.replies[1].run_attempt=2;},
  f=>{f.replies[3]={total_count:2,workflow_runs:[{id:prior},{id:6}]};},
 ]){
  const f=fixture();change(f);
  await assert.rejects(authorizeGrant(env,f.request));
 }
});
test('API failures stop authorization and report stage/status without response bodies',async()=>{
 const request=async()=>({ok:false,status:403,json:async()=>{throw Error('private response');}});
 await assert.rejects(authorizeGrant(env,request),{message:'authorization_read_failed stage=review_comment http_status=403'});
});
test('all three action pins match the approved immutable SHAs and reject the upload typo',()=>{
 const yaml=readFileSync(new URL('../../../.github/workflows/f2-r7-sizing-05.yml',import.meta.url),'utf8');
 const approved=[
  ['actions/checkout','11bd71901bbe5b1630ceea73d27597364c9af683'],
  ['actions/setup-node','49933ea5288caeca8642d1e84afbd3f7d6820020'],
  ['actions/upload-artifact','ea165f8d65b6e75b540449e92b4886f43607fa02'],
 ];
 function verify(source){
  const actual=[...source.matchAll(/uses: ([^\s@]+)@([^\s]+)/g)].map(match=>[match[1],match[2]]);
  assert.deepEqual(actual,approved);
 }
 verify(yaml);
 assert.throws(()=>verify(yaml.replace(approved[2][1],'ea165f8d65b6e75b540549e92b4886f43607fa02')));
});
