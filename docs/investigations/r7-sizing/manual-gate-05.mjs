import {verifyFirstRun} from './manual-gate-03.mjs';

export const GRANT='F2-R7-SIZING-05';
const priorRun=42331592401;
const priorHead='a79236db826ad9d8142cb4468ea4b93adcb2ccdf';
const workflow='f2-r7-sizing-05.yml';

export async function authorize(env=process.env,request=fetch){
 const sha=env.GITHUB_SHA;
 if(env.CI!=='true'||env.GITHUB_ACTIONS!=='true'||env.GITHUB_EVENT_NAME!=='workflow_dispatch'
   ||env.GITHUB_REF!=='refs/heads/main'||env.GITHUB_RUN_ATTEMPT!=='1'||env.F2_GRANT!==GRANT
   ||env.F2_VOLUME!=='45000'||env.F2_REVIEWED_HEAD!==sha||!/^[a-f0-9]{40}$/.test(sha||'')
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
 const marker=`COORD_PASS_R7_SIZING_05 ${sha} prev_run=${priorRun} scope=45k max_attempts=2`;
 if(comment?.user?.login!=='fabiojuniort-cyber'||comment.issue_url!==base+'/issues/127'
   ||typeof comment.created_at!=='string'||comment.updated_at!==comment.created_at
   ||typeof comment.body!=='string'||!comment.body.split(/\r?\n/).includes(marker))throw Error('coordinator_pass_missing');
 const prior=await get('grant_04_run','/actions/runs/'+priorRun);
 if(prior?.id!==priorRun||prior.path!=='.github/workflows/f2-r7-sizing-04.yml'||prior.head_sha!==priorHead
   ||prior.event!=='workflow_dispatch'||prior.head_branch!=='main'||prior.run_attempt!==1
   ||prior.status!=='completed'||prior.conclusion!=='success')throw Error('grant_04_history_mismatch');
 const jobs=await get('grant_04_jobs',`/actions/runs/${priorRun}/jobs?per_page=100`);
 const expected=new Map([['stage_18000','success']]);
 if(jobs?.total_count!==expected.size||!Array.isArray(jobs.jobs)||jobs.jobs.length!==expected.size
   ||new Set(jobs.jobs.map(job=>job.name)).size!==expected.size
   ||jobs.jobs.some(job=>expected.get(job.name)!==job.conclusion))throw Error('grant_04_jobs_mismatch');
 verifyFirstRun(await get('grant_04_inventory','/actions/workflows/f2-r7-sizing-04.yml/runs?per_page=100'),String(priorRun));
 verifyFirstRun(await get('run_inventory','/actions/workflows/'+workflow+'/runs?per_page=100'),env.GITHUB_RUN_ID);
}
