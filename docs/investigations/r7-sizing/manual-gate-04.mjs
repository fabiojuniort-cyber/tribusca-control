import {verifyFirstRun} from './manual-gate-03.mjs';

export const GRANT='F2-R7-SIZING-04';
const priorRun=42163875401;
const priorHead='343eea13b82c376d68601309b69a20b0e60f28c4';
const workflow='f2-r7-sizing-04.yml';

export async function authorize(env=process.env,request=fetch){
 const sha=env.GITHUB_SHA;
 if(env.CI!=='true'||env.GITHUB_ACTIONS!=='true'||env.GITHUB_EVENT_NAME!=='workflow_dispatch'
   ||env.GITHUB_REF!=='refs/heads/main'||env.GITHUB_RUN_ATTEMPT!=='1'||env.F2_GRANT!==GRANT
   ||env.F2_VOLUME!=='18000'||env.F2_REVIEWED_HEAD!==sha||!/^[a-f0-9]{40}$/.test(sha||'')
   ||!/^\d+$/.test(env.GITHUB_RUN_ID||''))throw Error('manual_context_blocked');
 if(!env.GH_TOKEN?.trim())throw Error('authorization_token_missing');
 if(!/^\d+$/.test(env.F2_REVIEW_COMMENT_ID||''))throw Error('review_reference_missing');
 const base='https://api.github.com/repos/fabiojuniort-cyber/tribusca-control';
 const headers={Authorization:'Bearer '+env.GH_TOKEN,Accept:'application/vnd.github+json'};
 async function get(stage,route){
  let response;
  try{response=await request(base+route,{headers,redirect:'error'});}
  catch{throw Error('authorization_transport_failed stage='+stage);}
  const status=Number.isInteger(response.status)?response.status:'unavailable';
  if(!response.ok)throw Error(`authorization_read_failed stage=${stage} http_status=${status}`);
  try{return await response.json();}
  catch{throw Error(`authorization_json_failed stage=${stage} http_status=${status}`);}
 }
 const comment=await get('review_comment','/issues/comments/'+env.F2_REVIEW_COMMENT_ID);
 const marker=`COORD_PASS_R7_SIZING_04 ${sha} prev_run=${priorRun}`;
 if(comment?.user?.login!=='fabiojuniort-cyber'||comment.issue_url!==base+'/issues/127'
   ||typeof comment.created_at!=='string'||comment.updated_at!==comment.created_at
   ||typeof comment.body!=='string'||!comment.body.split(/\r?\n/).includes(marker))throw Error('coordinator_pass_missing');
 const prior=await get('grant_03_run','/actions/runs/'+priorRun);
 if(prior?.id!==priorRun||prior.path!=='.github/workflows/f2-r7-sizing-03.yml'||prior.head_sha!==priorHead
   ||prior.event!=='workflow_dispatch'||prior.head_branch!=='main'||prior.run_attempt!==1
   ||prior.status!=='completed'||prior.conclusion!=='failure')throw Error('grant_03_history_mismatch');
 const jobs=await get('grant_03_jobs',`/actions/runs/${priorRun}/jobs?per_page=100`);
 const expected=new Map([['stage_6000','success'],['stage_18000','failure'],['stage_45000','skipped']]);
 if(jobs?.total_count!==expected.size||!Array.isArray(jobs.jobs)||jobs.jobs.length!==expected.size
   ||new Set(jobs.jobs.map(job=>job.name)).size!==expected.size
   ||jobs.jobs.some(job=>expected.get(job.name)!==job.conclusion))throw Error('grant_03_jobs_mismatch');
 verifyFirstRun(await get('run_inventory','/actions/workflows/'+workflow+'/runs?per_page=100'),env.GITHUB_RUN_ID);
}
