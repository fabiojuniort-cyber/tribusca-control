// Executor entry gate: selects the gate of the grant declared by the workflow (F2_GRANT).
// Every grant is validated by its own module; an unknown or missing grant never skips authorization.
import * as gate01 from './manual-gate.mjs';
import * as gate02 from './manual-gate-02.mjs';
const GATES=new Map([[gate01.GRANT,gate01],[gate02.GRANT,gate02]]);
export async function authorizeGrant(env=process.env,request=fetch){
 const gate=GATES.get(env.F2_GRANT);
 if(!gate)throw Error('grant_unknown');
 await gate.authorize(env,request);
 return gate.GRANT;
}
