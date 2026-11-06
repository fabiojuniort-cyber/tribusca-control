// F2-R7-SIZING-02 gate. F2-R7-SIZING-01 (manual-gate.mjs, run 42132149543) stays untouched as history.
export const GRANT='F2-R7-SIZING-02';
export const PRIOR_RUN_ID=42132149543;
export const WORKFLOW='f2-r7-sizing-02.yml';
export const PRIOR_WORKFLOW='f2-r7-sizing-manual.yml';
export function checkContext(env){
 if(env.CI!=='true'||env.GITHUB_ACTIONS!=='true'||env.GITHUB_EVENT_NAME!=='workflow_dispatch'||env.GITHUB_RUN_ATTEMPT!=='1'||env.F2_REVIEWED_HEAD!==env.GITHUB_SHA||!/^[a-f0-9]{40}$/.test(env.GITHUB_SHA||'')||env.F2_GRANT!==GRANT||!/^\d+$/.test(env.GITHUB_RUN_ID||''))throw Error('manual_context_blocked');
}
export function verifyReview(comment,sha){
 const line='COORD_PASS_R7_SIZING_02 '+sha+' prev_run='+PRIOR_RUN_ID;
 if(comment?.user?.login!=='fabiojuniort-cyber'||!comment.issue_url?.endsWith('/tribusca-control/issues/127')||typeof comment.created_at!=='string'||comment.updated_at!==comment.created_at||!comment.body?.split(/\r?\n/).includes(line))throw Error('coordinator_pass_missing');
}
export function verifyFirstRun(runs,currentId){
 if(runs.some(x=>Number(x.id)<Number(currentId)))throw Error('budget_already_assigned');
}
export function verifyPriorRun(j){
 const runs=j?.workflow_runs;
 if(!Array.isArray(runs)||j.total_count!==1||runs.length!==1||Number(runs[0].id)!==PRIOR_RUN_ID||runs[0].status!=='completed')throw Error('prior_run_mismatch');
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
 verifyReview(await get('review_comment',base+'/issues/comments/'+env.F2_REVIEW_COMMENT_ID),env.GITHUB_SHA);
 verifyPriorRun(await get('prior_run_inventory',base+'/actions/workflows/'+PRIOR_WORKFLOW+'/runs?per_page=100'));
 for(let page=1;page<=20;page++){
  const j=await get('run_inventory',base+'/actions/workflows/'+WORKFLOW+'/runs?per_page=100&page='+page);
  if(!Array.isArray(j?.workflow_runs))throw Error('run_inventory_invalid');
  verifyFirstRun(j.workflow_runs,env.GITHUB_RUN_ID);
  if(j.workflow_runs.length<100)return;
 }
 throw Error('run_inventory_incomplete');
}
