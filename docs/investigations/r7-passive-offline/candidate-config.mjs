// No execution budget granted. This candidate cannot run a pair.
export const executionAuthorized=false;
export function requireBudget(){throw Error('R7_PAIR_NOT_AUTHORIZED');}
export const configuration=Object.freeze({
 image:'postgres:18-bookworm@sha256:5c4783a8cc3f0074912164f94dfa1be4e043438f0f707cf968d7af9a0d31a2c8',
 node:'v24.22.2',cases:[['control','b2150ab5ef34e9f9646e219d522e47738d9c04f5'],['integration','2c41fbab8169b7efca6bd2e80c963d57a50585b6']],
 records:150000,batch:5000,statementTimeoutMs:45000,lockTimeoutMs:5000,pool:2,testTimeoutMs:240000,commandTimeoutSeconds:300,jobTimeoutMinutes:14,
 observer:{samples:300,durationMs:300000,cadenceMs:1000,statementMs:900,lockMs:500,pool:1},
 workflowEnabled:false,retries:0
});
