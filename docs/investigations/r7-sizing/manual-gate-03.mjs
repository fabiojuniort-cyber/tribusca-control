export const GRANT='F2-R7-SIZING-03';
export const PRIOR_RUN_ID=42147266762;
export const PROBE_RUN_ID='42160266992';
export const WORKFLOW='f2-r7-sizing-03.yml';
export const PRIOR_WORKFLOW='f2-r7-sizing-02.yml';
export function checkContext(env){
 if(env.CI!=='true'||env.GITHUB_ACTIONS!=='true'||env.GITHUB_EVENT_NAME!=='workflow_dispatch'||env.GITHUB_RUN_ATTEMPT!=='1'||env.F2_REVIEWED_HEAD!==env.GITHUB_SHA||!/^[a-f0-9]{40}$/.test(env.GITHUB_SHA||'')||env.F2_GRANT!==GRANT||!/^\d+$/.test(env.GITHUB_RUN_ID||''))throw Error('manual_context_blocked');
}
export function verifyReview(comment,sha,probeRun){
 const line='COORD_PASS_R7_SIZING_03 '+sha+' prev_run='+PRIOR_RUN_ID+' probe_run='+probeRun;
 if(comment?.user?.login!=='fabiojuniort-cyber'||!comment.issue_url?.endsWith('/tribusca-control/issues/127')||typeof comment.created_at!=='string'||comment.updated_at!==comment.created_at||!comment.body?.split(/\r?\n/).includes(line))throw Error('coordinator_pass_missing');
}
export function verifyFirstRun(inventory,currentId){
 const runs=inventory?.workflow_runs;
 if(inventory?.total_count!==1||!Array.isArray(runs)||runs.length!==1||String(runs[0].id)!==currentId)throw Error('budget_already_assigned_or_unverifiable');
}
export function verifyPriorRun(j){
 const runs=j?.workflow_runs;
 if(!Array.isArray(runs)||j.total_count!==1||runs.length!==1||Number(runs[0].id)!==PRIOR_RUN_ID||runs[0].status!=='completed'||runs[0].conclusion!=='failure')throw Error('prior_run_mismatch');
}
export async function authorize(env=process.env,request=fetch){
 checkContext(env);
 if(!env.GH_TOKEN?.trim())throw Error('authorization_token_missing');
 if(!/^\d+$/.test(env.F2_REVIEW_COMMENT_ID||''))throw Error('review_reference_missing');
 const base='https://api.github.com/repos/fabiojuniort-cyber/tribusca-control';
 const headers={Authorization:'Bearer '+env.GH_TOKEN,Accept:'application/vnd.github+json'};
 async function get(stage,url){
  let response;
  try{response=await request(url,{headers,redirect:'error'});}
  catch{throw Error(`authorization_transport_failed stage=${stage} http_status=unavailable`);}
  const status=Number.isInteger(response.status)?response.status:'unavailable';
  if(!response.ok)throw Error(`authorization_read_failed stage=${stage} http_status=${status}`);
  try{return await response.json();}
  catch{throw Error(`authorization_json_failed stage=${stage} http_status=${status}`);}
 }
 const probeRun=PROBE_RUN_ID;
 verifyReview(await get('review_comment',base+'/issues/comments/'+env.F2_REVIEW_COMMENT_ID),env.GITHUB_SHA,probeRun);
 const probe=await get('checkout_probe',base+'/actions/runs/'+probeRun);
 if(String(probe?.id)!==probeRun||probe.path!=='.github/workflows/f2-r7-backend-checkout-probe.yml'||probe.event!=='workflow_dispatch'||probe.head_branch!=='main'||probe.head_sha!=='58da7ff285b7e554f847553e0eaeaf7ebee45bee'||probe.run_attempt!==1||probe.status!=='completed'||probe.conclusion!=='success')throw Error('checkout_probe_not_proven');
 const original=await get('grant_01_inventory',base+'/actions/workflows/f2-r7-sizing-manual.yml/runs?per_page=100');
 if(original?.total_count!==1||original.workflow_runs?.length!==1||original.workflow_runs[0].id!==42132149543||original.workflow_runs[0].status!=='completed')throw Error('grant_01_history_mismatch');
 verifyPriorRun(await get('prior_run_inventory',base+'/actions/workflows/'+PRIOR_WORKFLOW+'/runs?per_page=100'));
 verifyFirstRun(await get('run_inventory',base+'/actions/workflows/'+WORKFLOW+'/runs?per_page=100'),env.GITHUB_RUN_ID);
}
