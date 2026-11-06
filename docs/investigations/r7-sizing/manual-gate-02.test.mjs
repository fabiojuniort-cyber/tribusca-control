import {test} from 'node:test';
import assert from 'node:assert/strict';
import {authorize,GRANT,PRIOR_RUN_ID} from './manual-gate-02.mjs';
const sha='a'.repeat(40);
const env={CI:'true',GITHUB_ACTIONS:'true',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_RUN_ATTEMPT:'1',F2_REVIEWED_HEAD:sha,GITHUB_SHA:sha,F2_GRANT:GRANT,GH_TOKEN:'synthetic-token',F2_REVIEW_COMMENT_ID:'123',GITHUB_RUN_ID:'50000000000'};
const t='2026-11-06T01:00:00Z';
const review={user:{login:'fabiojuniort-cyber'},issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/127',created_at:t,updated_at:t,body:`COORD_PASS_R7_SIZING_02 ${sha} prev_run=${PRIOR_RUN_ID}`};
const prior={total_count:1,workflow_runs:[{id:PRIOR_RUN_ID,status:'completed'}]};
const ok=p=>({ok:true,status:200,json:async()=>p});
const api=(o={})=>async url=>{
 if(url.includes('/issues/comments/'))return o.review??ok(review);
 if(url.includes('f2-r7-sizing-manual.yml'))return o.prior??ok(prior);
 return o.inv??ok({workflow_runs:[{id:Number(env.GITHUB_RUN_ID)}]});
};
const noRequest=async()=>assert.fail('request issued');
test('valid PASS, intact history and unused grant pass',()=>authorize(env,api()));
test('re-run rejected before any request',()=>assert.rejects(authorize({...env,GITHUB_RUN_ATTEMPT:'2'},noRequest),/manual_context_blocked/));
test('duplicate dispatch rejected',()=>assert.rejects(authorize(env,api({inv:ok({workflow_runs:[{id:1},{id:Number(env.GITHUB_RUN_ID)}]})})),/budget_already_assigned/));
test('divergent SHA rejected before any request',()=>assert.rejects(authorize({...env,F2_REVIEWED_HEAD:'b'.repeat(40)},noRequest),/manual_context_blocked/));
test('PASS for another SHA rejected',()=>assert.rejects(authorize(env,api({review:ok({...review,body:`COORD_PASS_R7_SIZING_02 ${'b'.repeat(40)} prev_run=${PRIOR_RUN_ID}`})})),/coordinator_pass_missing/));
test('grant 01 rejected',()=>assert.rejects(authorize({...env,F2_GRANT:'F2-R7-SIZING-01'},noRequest),/manual_context_blocked/));
for(const [name,patch] of [
 ['old 01 PASS reused',{body:'COORD_PASS_R7_SIZING '+sha}],
 ['missing prev_run',{body:'COORD_PASS_R7_SIZING_02 '+sha}],
 ['wrong prev_run',{body:`COORD_PASS_R7_SIZING_02 ${sha} prev_run=1`}],
 ['edited comment',{updated_at:'2026-11-06T02:00:00Z'}],
 ['wrong author',{user:{login:'someone'}}],
 ['wrong issue',{issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/128'}],
])test('invalid PASS: '+name,()=>assert.rejects(authorize(env,api({review:ok({...review,...patch})})),/coordinator_pass_missing/));
for(const [name,p] of [['zero prior runs',{total_count:0,workflow_runs:[]}],['two prior runs',{total_count:2,workflow_runs:[{id:PRIOR_RUN_ID,status:'completed'},{id:2,status:'completed'}]}],['prior run in progress',{total_count:1,workflow_runs:[{id:PRIOR_RUN_ID,status:'in_progress'}]}]])
 test('history: '+name,()=>assert.rejects(authorize(env,api({prior:ok(p)})),/prior_run_mismatch/));
for(const status of [401,403,404,429,500])test('inventory HTTP '+status+' fails closed',()=>assert.rejects(authorize(env,api({inv:{ok:false,status}})),{message:'authorization_read_failed stage=run_inventory http_status='+status}));
test('comment 403 reports stage and status',()=>assert.rejects(authorize(env,api({review:{ok:false,status:403}})),{message:'authorization_read_failed stage=review_comment http_status=403'}));
test('invalid inventory fails closed',()=>assert.rejects(authorize(env,api({inv:ok({})})),/run_inventory_invalid/));
test('incomplete inventory fails closed',()=>assert.rejects(authorize(env,api({inv:ok({workflow_runs:Array.from({length:100},()=>({id:Number(env.GITHUB_RUN_ID)}))})})),/run_inventory_incomplete/));
test('transport error hides details',()=>assert.rejects(authorize(env,async()=>{throw Error('synthetic-token')}),{message:'authorization_transport_failed stage=review_comment http_status=unavailable'}));
test('missing token fails before request',()=>assert.rejects(authorize({...env,GH_TOKEN:' '},noRequest),/authorization_token_missing/));
