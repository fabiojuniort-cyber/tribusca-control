import {preparePassiveR7} from './prepare-passive.mjs';
import {sha256,aggregate,productResult} from './execution-state.mjs';
export const PINNED=Object.freeze({
 'passive-pool.mjs':'f71c77cadb7c3bb725b73993c65f79ca001afdda0902745ce63e4f147da00fd2',
 'prepare-passive.mjs':'5d7362b978c3125f59574dfdd0c0efca19522fd7ed52fca3ec045b91fcac1cd2',
 'external-observer.mjs':'16945d4afe7e62a81cc59ec16a65fdea4813f26b897ff15ac825a90a359c67aa',
 originalTest:'9cc1208240ba761efe055d9cff3c27c58e25be2824214ee6ace0ab6501055346'
});
export function prepareCandidate(before,readAsset){
 const hashes={originalTest:sha256(before)};
 for(const name of ['passive-pool.mjs','prepare-passive.mjs','external-observer.mjs'])hashes[name]=sha256(readAsset(name));
 for(const [name,h]of Object.entries(PINNED))if(hashes[name]!==h)throw Error('candidate_hash_changed:'+name);
 const patch=preparePassiveR7(before);
 return {source:patch.source,hashes,instrumentedTestHash:sha256(patch.source)};
}
export function finalizeEvidence({product=productResult(),poolText,observerText,observerExit,observerEndedBeforeProduct,flushText='',hashes}){
 return aggregate({product,poolText,observerText,observerExit,observerEndedBeforeProduct,flushText,expectedFiles:PINNED,actualFiles:hashes});
}
