import {createHash} from 'node:crypto';
export function productResult({code=null,signal=null,spawnError=null,boundary='DIRECT_CHILD'}={}){
 const timed=boundary==='GNU_TIMEOUT'&&[124,137].includes(code);
 const status=spawnError?'SPAWN_ERROR':signal?'SIGNALLED':timed?'TIMEOUT_WRAPPER':Number.isInteger(code)?'EXITED':'NOT_RUN';
 return Object.freeze({status,exitCode:code,signal,spawnErrorCode:spawnError?.code||null,boundary,innerExitCode:timed?null:code});
}
export function aggregate({product,poolText,observerText,observerExit,observerEndedBeforeProduct,flushText='',expectedFiles,actualFiles}){
 const reasons=[];
 function bad(reason){if(!reasons.includes(reason))reasons.push(reason);}
 try{
  if(typeof poolText!=='string')bad('POOL_FILE_MISSING');
  else{
   const p=JSON.parse(poolText);
   if(p.outcome!=='COMPLETE'||p.reason)bad('POOL_INVALID');
   if(!Array.isArray(p.pools)||p.pools.length===0||p.pools.length>16)bad('POOL_SHAPE');
   for(const x of p.pools||[]){
    if(x.observation?.outcome!=='COMPLETE'||x.observation?.reason)bad('POOL_INVALID');
    if(x.observation?.capacity!==2048||!Array.isArray(x.records)||x.records.length>2048||x.observation?.events!==x.records.length)bad('POOL_BOUNDS');
    for(const [i,r]of (x.records||[]).entries())if(r.sequence!==i+1||!['connect','acquire','release','remove'].includes(r.event)||!Number.isInteger(r.client)||r.client<1)bad('POOL_RECORD');
   }
  }
 }catch{bad('POOL_FILE_MALFORMED');}
 try{
  for(const line of flushText.split('\n').filter(x=>x.startsWith('F2_R7_OBSERVATION '))){if(JSON.parse(line.slice(18)).outcome!=='COMPLETE')bad('FLUSH_FAILED');}
 }catch{bad('FLUSH_STATUS_MALFORMED');}
 try{
  if(typeof observerText!=='string')bad('OBSERVER_FILE_MISSING');
  else{
   const events=observerText.split('\n').filter(x=>x.startsWith('F2_R7_DIAG ')).map(x=>JSON.parse(x.slice(11)));
   const samples=events.filter(x=>x.kind==='sample'),ends=events.filter(x=>x.kind==='observer_end');
   if(ends.length!==1||samples.length===0)bad('OBSERVER_INCOMPLETE');
   if(events.some(x=>x.kind==='observer_error'))bad('OBSERVER_QUERY_ERROR');
   if(samples.length>=300||ends.some(x=>x.samples>=300||x.elapsed_ms>=300000))bad('OBSERVER_LIMIT_REACHED');
   if(samples.some((x,i)=>x.ordinal!==i+1)||ends.some(x=>x.samples!==samples.length))bad('OBSERVER_SEQUENCE');
  }
 }catch{bad('OBSERVER_FILE_MALFORMED');}
 if(!observerExit||observerExit.spawnErrorCode||!(observerExit.exitCode===0||observerExit.signal==='SIGTERM'))bad('OBSERVER_EXIT');
 if(observerEndedBeforeProduct===true)bad('OBSERVER_ENDED_BEFORE_PRODUCT');
 if(typeof observerEndedBeforeProduct!=='boolean')bad('OBSERVER_LIFECYCLE_MISSING');
 if(!expectedFiles||!actualFiles)bad('HASHES_MISSING');
 else for(const [name,sha]of Object.entries(expectedFiles))if(actualFiles[name]!==sha)bad('HASH_MISMATCH');
 if(product.status!=='EXITED')bad('PRODUCT_INCOMPLETE');
 return {product_outcome:product,observation_outcome:{status:reasons.length?'INVALID':'COMPLETE',reasons},diagnostic_conclusion:'NOT_PROVEN'};
}
export const sha256=data=>createHash('sha256').update(data).digest('hex');
