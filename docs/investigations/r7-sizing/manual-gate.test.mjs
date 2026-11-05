import {test} from 'node:test';
import assert from 'node:assert/strict';
import {authorize,GRANT} from './manual-gate.mjs';
const sha='a'.repeat(40);
const env={CI:'true',GITHUB_ACTIONS:'true',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_RUN_ATTEMPT:'1',F2_REVIEWED_HEAD:sha,GITHUB_SHA:sha,F2_GRANT:GRANT,GH_TOKEN:'synthetic-token',F2_REVIEW_COMMENT_ID:'123',GITHUB_RUN_ID:'2'};
const review={user:{login:'fabiojuniort-cyber'},issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/127',body:'COORD_PASS_R7_SIZING '+sha};
const ok=payload=>({ok:true,status:200,json:async()=>payload});
for(const status of [401,403,404,429,500])test('comment HTTP '+status,async()=>{
 let calls=0;
 await assert.rejects(authorize(env,async()=>{calls++;return {ok:false,status,json:async()=>assert.fail('error body read')};}),{message:'authorization_read_failed stage=review_comment http_status='+status});
 assert.equal(calls,1);
});
test('inventory HTTP failure has its own stage',async()=>{
 await assert.rejects(authorize(env,async url=>url.includes('/issues/comments/')?ok(review):{ok:false,status:403}),{message:'authorization_read_failed stage=run_inventory http_status=403'});
});
test('transport and JSON errors omit upstream details',async()=>{
 await assert.rejects(authorize(env,async()=>{throw Error('synthetic-token');}),{message:'authorization_transport_failed stage=review_comment http_status=unavailable'});
 await assert.rejects(authorize(env,async()=>({ok:true,status:200,json:async()=>{throw Error('sensitive body');}})),{message:'authorization_json_failed stage=review_comment http_status=200'});
});
test('missing token fails before request',async()=>{
 await assert.rejects(authorize({...env,GH_TOKEN:''},async()=>assert.fail('request issued')),/authorization_token_missing/);
});
test('older run blocks grant and rerun is rejected before request',async()=>{
 await assert.rejects(authorize(env,async url=>ok(url.includes('/issues/comments/')?review:{workflow_runs:[{id:1}]})),/budget_already_assigned/);
 await assert.rejects(authorize({...env,GITHUB_RUN_ATTEMPT:'2'},async()=>assert.fail('request issued')),/manual_context_blocked/);
});
test('matching review and unused grant pass',async()=>{
 await authorize(env,async url=>ok(url.includes('/issues/comments/')?review:{workflow_runs:[{id:2}]}));
});
