export const GRANT='F2-R7-SIZING-01';
export function checkContext(env){
 if(env.CI!=='true'||env.GITHUB_ACTIONS!=='true'||env.GITHUB_EVENT_NAME!=='workflow_dispatch'||env.GITHUB_RUN_ATTEMPT!=='1'||env.F2_REVIEWED_HEAD!==env.GITHUB_SHA||!/^[a-f0-9]{40}$/.test(env.GITHUB_SHA||'')||env.F2_GRANT!==GRANT)throw Error('manual_context_blocked');
}
export function verifyReview(comment,sha){
 if(comment?.user?.login!=='fabiojuniort-cyber'||!comment.issue_url?.endsWith('/tribusca-control/issues/127')||!comment.body?.split(/\r?\n/).includes('COORD_PASS_R7_SIZING '+sha))throw Error('coordinator_pass_missing');
}
export function verifyFirstRun(runs,currentId){
 // This workflow name is dedicated to this grant, across every branch/HEAD.
 if(runs.some(x=>Number(x.id)<Number(currentId)))throw Error('budget_already_assigned');
}
export async function authorize(env=process.env,request=fetch){
 checkContext(env);
 const base='https://api.github.com/repos/fabiojuniort-cyber/tribusca-control';
 const headers={Authorization:'Bearer '+env.GH_TOKEN,Accept:'application/vnd.github+json'};
 async function get(url){const r=await request(url,{headers});if(!r.ok)throw Error('authorization_read_failed');return r.json();}
 if(!/^\d+$/.test(env.F2_REVIEW_COMMENT_ID||''))throw Error('review_reference_missing');
 verifyReview(await get(base+'/issues/comments/'+env.F2_REVIEW_COMMENT_ID),env.GITHUB_SHA);
 // Fail closed on missing pagination: every older run of this workflow must be inspected.
 for(let page=1;page<=20;page++){
  const j=await get(base+'/actions/workflows/f2-r7-sizing-manual.yml/runs?per_page=100&page='+page);
  if(!Array.isArray(j.workflow_runs))throw Error('run_inventory_invalid');
  verifyFirstRun(j.workflow_runs,env.GITHUB_RUN_ID,env.GITHUB_SHA);
  if(j.workflow_runs.length<100)return;
 }
 throw Error('run_inventory_incomplete');
}
