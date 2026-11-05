// Alternative 1. No driver method replacement, query, error listener or I/O.
import {performance} from 'node:perf_hooks';
export const LIMITS=Object.freeze({events:2048,pools:16,externalSamples:300,externalDurationMs:300000,externalCadenceMs:1000,externalStatementMs:900,externalLockMs:500});
export function observePool(pool){
 const records=new Array(LIMITS.events),ids=new WeakMap(),handlers=[];
 let used=0,nextId=0,invalid=null,detached=false,overheadMs=0;
 const invalidate=reason=>{invalid??=reason;};
 function capture(type,client,error){
  const started=performance.now();
  try{
   if(invalid||detached)return;
   if(used===LIMITS.events){invalidate('BUFFER_FULL');return;}
   if(!ids.has(client))ids.set(client,++nextId);
   // Do not invoke getters, stringify driver objects, or mutate error/client.
   const descriptor=error==null?null:Object.getOwnPropertyDescriptor(error,'code');
   if(descriptor&&!Object.hasOwn(descriptor,'value')){invalidate('UNSAFE_ERROR_FIELD');return;}
   const code=typeof descriptor?.value==='string'&&/^[A-Z0-9]{5}$/.test(descriptor.value)?descriptor.value:null;
   records[used]={sequence:used+1,event:type,client:ids.get(client),code};used++;
  }catch{invalidate('CAPTURE_FAILED');}
  finally{overheadMs+=performance.now()-started;}
 }
 for(const type of ['connect','acquire','release','remove']){
  const fn=type==='release'?(error,client)=>capture(type,client,error):(client)=>capture(type,client,null);
  try{pool.on(type,fn);handlers.push([type,fn]);}
  catch{invalidate('ATTACH_FAILED');break;}
 }
 function detach(){
  if(detached)return;
  detached=true;
  for(const [type,fn]of handlers){try{pool.removeListener(type,fn);}catch{invalidate('DETACH_FAILED');}}
 }
 return Object.freeze({
  detach,
  status(){return {outcome:invalid?'INVALID':detached?'COMPLETE':'INCOMPLETE',reason:invalid,events:used,capacity:LIMITS.events,handlerOverheadMs:overheadMs};},
  // Explicitly invoke after native pool.end/product outcome has been captured.
  // Never place flush in the product query/COMMIT continuation.
  flush(sink){
   if(!detached){invalidate('FLUSH_BEFORE_DETACH');return {ok:false,...this.status()};}
   try{
    const result=sink({observation:this.status(),records:records.slice(0,used)});
    if(result&&typeof result.then==='function'){Promise.resolve(result).catch(()=>{});invalidate('ASYNC_SINK_UNSUPPORTED');}
   }catch{invalidate('FLUSH_FAILED');}
   return {ok:invalid===null,...this.status()};
  }
 });
}
export function createObservationSession(){
 const handles=[];let reason=null,finished=false;
 return Object.freeze({
  attach(pool){
   try{if(finished)reason??='ATTACH_AFTER_FINISH';else if(handles.length===LIMITS.pools)reason??='POOL_LIMIT';else handles.push(observePool(pool));}
   catch{reason??='SESSION_ATTACH_FAILED';}
   return pool;
  },
  finish(sink){
   if(finished)return {outcome:'INVALID',reason:'ALREADY_FINISHED'};
   finished=true;const pools=[];
   for(const h of handles){h.detach();h.flush(data=>pools.push(data));if(h.status().outcome==='INVALID')reason??=h.status().reason;}
   try{
    const r=sink({outcome:reason?'INVALID':'COMPLETE',reason,pools});
    if(r&&typeof r.then==='function'){Promise.resolve(r).catch(()=>{});reason??='ASYNC_SINK_UNSUPPORTED';}
   }catch{reason??='FLUSH_FAILED';}
   return {outcome:reason?'INVALID':'COMPLETE',reason,pools:handles.length};
  }
 });
}
