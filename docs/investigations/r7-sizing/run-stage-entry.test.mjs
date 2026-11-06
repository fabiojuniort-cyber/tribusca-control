// Offline test through the same entry point the workflow calls: `node docs/investigations/r7-sizing/run-stage.mjs`.
// fetch is replaced by a preload stub (no network) and `docker` by a PATH shim that only records the call,
// so a passing gate is proven by reaching the first Docker step and nothing beyond it runs.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {PRIOR_RUN_ID} from './manual-gate-02.mjs';
const here=path.dirname(fileURLToPath(import.meta.url));
const entry=path.join(here,'run-stage.mjs');
const node=process.env.F2_ENTRY_NODE||process.execPath;
const sha='c'.repeat(40),runId='50000000000',stamp='2026-11-06T01:00:00Z';
function run(grant,body){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'f2-entry-'));
 const bin=path.join(dir,'bin');fs.mkdirSync(bin);
 const marker=path.join(dir,'docker-called');
 fs.writeFileSync(path.join(bin,'docker'),`#!/bin/sh\necho "$@" > "${marker}"\nexit 97\n`,{mode:0o755});
 const stub=path.join(dir,'stub.mjs');
 fs.writeFileSync(stub,`const review=${JSON.stringify({user:{login:'fabiojuniort-cyber'},issue_url:'https://api.github.com/repos/fabiojuniort-cyber/tribusca-control/issues/127',created_at:stamp,updated_at:stamp,body})};
globalThis.fetch=async url=>{url=String(url);const json=p=>({ok:true,status:200,json:async()=>p});
 if(url.includes('/issues/comments/'))return json(review);
 if(url.includes('f2-r7-sizing-manual.yml'))return json({total_count:1,workflow_runs:[{id:${PRIOR_RUN_ID},status:'completed'}]});
 if(url.includes('f2-r7-sizing-02.yml'))return json({workflow_runs:[{id:${runId}}]});
 throw Error('unexpected_url');};`);
 const tmp=path.join(dir,'runner-temp');fs.mkdirSync(tmp);
 const env={PATH:bin+':'+process.env.PATH,HOME:dir,CI:'true',GITHUB_ACTIONS:'true',GITHUB_EVENT_NAME:'workflow_dispatch',GITHUB_RUN_ATTEMPT:'1',GITHUB_RUN_ID:runId,GITHUB_SHA:sha,F2_REVIEWED_HEAD:sha,F2_REVIEW_COMMENT_ID:'123',F2_GRANT:grant,F2_VOLUME:'6000',GH_TOKEN:'synthetic-token',RUNNER_TEMP:tmp};
 const r=spawnSync(node,['--import',stub,entry],{cwd:dir,env,encoding:'utf8',timeout:30000});
 return {r,dir,marker,docker:fs.existsSync(marker)?fs.readFileSync(marker,'utf8').trim():null};
}
const pass02=`COORD_PASS_R7_SIZING_02 ${sha} prev_run=${PRIOR_RUN_ID}`;
test('runtime matches workflow pin',()=>assert.equal(spawnSync(node,['-v'],{encoding:'utf8'}).stdout.trim(),'v24.22.2','set F2_ENTRY_NODE to node v24.22.2'));
test('valid 02 context passes the gate and stops at the first Docker step',()=>{
 const {r,docker}=run('F2-R7-SIZING-02',pass02);
 assert.match(docker??'',/^pull postgres:18-bookworm@sha256:/,r.stderr);
 assert.match(r.stderr,/command_failed:docker:97/);
});
for(const [name,grant,body,error] of [
 ['unknown grant','F2-R7-SIZING-03',pass02,/grant_unknown/],
 ['missing grant','',pass02,/grant_unknown/],
 ['grant 01 with a 02 PASS','F2-R7-SIZING-01',pass02,/manual_context_blocked|coordinator_pass_missing/],
 ['02 with the old 01 PASS','F2-R7-SIZING-02','COORD_PASS_R7_SIZING '+sha,/coordinator_pass_missing/],
])test(name+' stops before Docker',()=>{
 const {r,docker}=run(grant,body);
 assert.notEqual(r.status,0);
 assert.equal(docker,null,'docker must not be called');
 assert.match(r.stderr,error);
});
