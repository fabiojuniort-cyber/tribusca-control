import {createHash} from 'node:crypto';
import {preparePassiveR7} from './prepare-passive.mjs';
export const VOLUMES=Object.freeze([6000,18000,45000]);
export const ORIGINAL_SHA256='9cc1208240ba761efe055d9cff3c27c58e25be2824214ee6ace0ab6501055346';
export const sha256=x=>createHash('sha256').update(x).digest('hex');
export function expectations(n){
 if(!VOLUMES.includes(n))throw Error('volume_not_authorized');
 const company=n*2/3,curation=n/3,first=Math.min(n,15000);
 return Object.freeze({n,company,curation,created:Math.floor(company/3),updated:company-Math.floor(company/3),first,remaining:n-first,firstCompleted:first===n,batches:Math.ceil(n/5000),failedBatchProcessed:0,idempotentProcessed:0});
}
export function buildDiagnostic(original,n){
 if(sha256(original)!==ORIGINAL_SHA256)throw Error('original_test_hash_changed');
 const e=expectations(n),edits=[];
 const literals={100000:[1,e.company],50000:[1,e.curation],150000:[3,e.n],15000:[1,e.first],135000:[2,e.remaining],66667:[1,e.updated],33333:[1,e.created]};
 let generated=original.replace(/\b(100000|50000|150000|15000|135000|66667|33333)\b/g,(value)=>{edits.push(value);return String(literals[value][1]);});
 for(const [value,[count]]of Object.entries(literals))if(edits.filter(x=>x===value).length!==count)throw Error('constant_anchor_changed');
 const completed='assert.equal(first.completed,false);';
 if(generated.split(completed).length!==2)throw Error('completion_anchor_changed');
 generated=generated.replace(completed,`assert.equal(first.completed,${e.firstCompleted});`);
 if(generated.split('R7: 150k legacy audits').length!==2)throw Error('title_anchor_changed');
 generated=generated.replace('R7: 150k legacy audits',`R7 DIAGNOSTIC ${n}: legacy audits`);
 // Construction and assertion code retained; only enumerated numeric expectations/title differ.
 const prepared=preparePassiveR7(generated);
 return {originalHash:sha256(original),diagnosticHash:sha256(generated),instrumentedHash:sha256(prepared.source),expectations:e,edits:edits.length+2,source:prepared.source};
}
