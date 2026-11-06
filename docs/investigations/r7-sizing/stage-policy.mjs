import {VOLUMES,expectations} from './diagnostic.mjs';
export const SOURCES=Object.freeze(['b2150ab5ef34e9f9646e219d522e47738d9c04f5','2c41fbab8169b7efca6bd2e80c963d57a50585b6']);
export const normalizeProductLog=text=>text.split('\n').map(x=>x.replace(/^#\s?/, '').trimStart()).join('\n');
export function parseMetrics(text,n){
 const lines=normalizeProductLog(text).split('\n').filter(x=>x.startsWith('ONB02_R7_BACKFILL '));
 if(lines.length!==1)throw Error('diagnostic_metrics_missing');
 const x=JSON.parse(lines[0].slice('ONB02_R7_BACKFILL '.length));
 if(x.rows!==n||x.batchSize!==5000||['restart','idempotent','atomicFailure','headersPreserved','otherEntityPreserved'].some(k=>x[k]!==true))throw Error('diagnostic_metrics_divergence');
 return x;
}
export function stagePass(results,n){
 const expected=expectations(n);
 return results.length===2&&results.every((r,i)=>r.source===SOURCES[i]&&r.attempt===1&&r.product_outcome?.status==='EXITED'&&r.product_outcome.exitCode===0&&r.semantic_code===0&&r.observation_outcome?.status==='COMPLETE'&&!r.original_test_changed&&JSON.stringify(r.instrumentation?.expectations)===JSON.stringify(expected)&&r.metrics?.rows===n);
}
export function nextVolume(results,n){
 if(!stagePass(results,n))return null;
 return VOLUMES[VOLUMES.indexOf(n)+1]??null;
}
