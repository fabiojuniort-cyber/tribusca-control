import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {EventEmitter} from 'node:events';
import {spawnSync} from 'node:child_process';
import {observePool,createObservationSession,LIMITS} from './passive-pool.mjs';
import {preparePassiveR7} from './prepare-passive.mjs';
const root=path.resolve(process.env.F2_NATIVE_ROOT||'radar-fiscal-backend'),req=createRequire(path.join(root,'package.json')),Pool=req('pg-pool');
test('all native methods and error listeners preserved; detach removes only own handlers',()=>{
 const p=new Pool({max:2}),methods=['query','connect','end','_releaseOnce'].map(k=>[k,p[k]]),own=()=>{};p.on('acquire',own);
 const h=observePool(p);assert.equal(p.listenerCount('error'),0);
 for(const[k,v]of methods)assert.equal(p[k],v);
 h.detach();h.detach();assert.deepEqual(p.listeners('acquire'),[own]);assert.equal(p.listenerCount('error'),0);
});
test('fixed capacity invalidates evidence without throwing or growing',()=>{
 const p=new EventEmitter(),c={};const h=observePool(p);
 for(let n=0;n<LIMITS.events+50;n++)assert.doesNotThrow(()=>p.emit('acquire',c));
 assert.equal(h.status().events,2048);assert.equal(h.status().reason,'BUFFER_FULL');h.detach();
 h.flush(x=>assert.equal(x.records.length,2048));
});
test('unsafe getter never executed; broken capture invalidates only evidence',()=>{
 const p=new EventEmitter(),h=observePool(p),c={};let invoked=false;
 const e={get code(){invoked=true;throw Error('must not read');}};
 assert.doesNotThrow(()=>p.emit('release',e,c));assert.equal(invoked,false);assert.equal(h.status().reason,'UNSAFE_ERROR_FIELD');
 h.detach();const q=new EventEmitter(),g=observePool(q);assert.doesNotThrow(()=>q.emit('acquire',null));assert.equal(g.status().reason,'CAPTURE_FAILED');g.detach();
});
test('flush failures and asynchronous rejection never replace product result',async()=>{
 for(const sink of [()=>{throw Error('disk unavailable');},()=>{JSON.stringify(1n);},()=>Promise.reject(Error('async sink unavailable'))]){
  const p=new EventEmitter(),h=observePool(p),product={committed:true};p.emit('acquire',{});h.detach();
  assert.equal(h.flush(sink).ok,false);assert.deepEqual(product,{committed:true});await new Promise(r=>setImmediate(r));
 }
});
test('session limit, post-finish attach and repeated finish fail evidence only',()=>{
 const s=createObservationSession();for(let n=0;n<17;n++){const p=new EventEmitter();assert.equal(s.attach(p),p);}
 assert.equal(s.finish(()=>{}).reason,'POOL_LIMIT');assert.equal(s.finish(()=>{}).reason,'ALREADY_FINISHED');
 const q=createObservationSession(),p=new EventEmitter();q.attach(p);assert.equal(q.finish(()=>{throw Error('write');}).reason,'FLUSH_FAILED');
 const a=createObservationSession();assert.equal(a.finish(()=>Promise.reject(Error('write'))).reason,'ASYNC_SINK_UNSUPPORTED');
});
test('pure patch is reversible and keeps assertion body and fixed timeouts',()=>{
 const before=fs.readFileSync(new URL('r7-test.snapshot.ts',import.meta.url),'utf8'),x=preparePassiveR7(before);
 assert.equal(x.reversible,true);assert.equal(x.source.slice(x.source.indexOf("test('R7:")),before.slice(before.indexOf("test('R7:")));
 assert.match(x.source,/statement_timeout=45000 -c lock_timeout=5000/);
 assert.doesNotMatch(x.source,/instrumentPool|\.query\s*=|\.connect\s*=|\.release\s*=|\.end\s*=/);
 assert.throws(()=>preparePassiveR7('anchor changed'));
});
test('external collection retains original budget and contains no driver replacement',()=>{
 const x=fs.readFileSync(new URL('external-observer.mjs',import.meta.url),'utf8');
 assert.match(x,/count<300/);assert.match(x,/start<300000/);assert.match(x,/1000-/);assert.match(x,/statement_timeout=900 -c lock_timeout=500/);
 assert.doesNotMatch(x,/snapshotSQL|instrumentPool|audit_backfill_batch|\.query\s*=|\.connect\s*=/);
});
test('native max2 queue/release and reused client methods remain native',async()=>{
 class Client extends EventEmitter{constructor(){super();this._queryable=true;this._ending=false;}connect(cb){queueMicrotask(cb);}end(cb){queueMicrotask(()=>cb?.());}query(){return Promise.resolve({rows:[]});}}
 const p=new Pool({Client,max:2,idleTimeoutMillis:0}),h=observePool(p),c1=await p.connect(),c2=await p.connect();
 const methods=[c1.query,c1.release,c2.query,c2.release];let acquired=false;const pending=p.connect().then(c=>{acquired=true;return c;});
 await new Promise(r=>setImmediate(r));assert.equal(acquired,false);assert.equal(p.totalCount,2);assert.equal(p.waitingCount,1);
 assert.equal(c1.query,methods[0]);assert.equal(c1.release,methods[1]);c1.release();const c3=await pending;assert.equal(c3,c1);c3.release();c2.release();await p.end();h.detach();assert.equal(h.status().outcome,'COMPLETE');
});
test('capture/overflow and post-COMMIT sink failure preserve real native pool outcome',async()=>{
 for(const fault of ['capture','overflow','flush']){
  const result={rows:[{committed:true}]};
  class C extends EventEmitter{constructor(){super();this._queryable=true;}connect(cb){queueMicrotask(cb);}end(cb){queueMicrotask(()=>cb?.());}query(t,v,cb){if(typeof v==='function')cb=v;queueMicrotask(()=>cb(null,result));}}
  const p=new Pool({Client:C,max:2,idleTimeoutMillis:0}),h=observePool(p);
  if(fault==='capture')p.emit('acquire',null);
  if(fault==='overflow')for(let n=0;n<=LIMITS.events;n++)p.emit('acquire',p);
  const returned=await p.query('COMMIT');assert.equal(returned,result);
  await p.end();h.detach();h.flush(()=>{if(fault==='flush')throw Error('post-commit disk failure');});
  assert.equal(h.status().outcome,'INVALID');assert.equal(returned,result);
 }
});
test('fatal EventEmitter paths compared in subprocess without artificial catch',()=>{
 for(const direct of [false,true]){
  const statuses=[];
  for(const observed of [false,true]){
   const code=`const {createRequire}=await import('node:module');const {EventEmitter}=await import('node:events');const req=createRequire(${JSON.stringify(path.join(root,'package.json'))});const Pool=req('pg-pool');class C extends EventEmitter{constructor(){super();this._queryable=true;}connect(cb){queueMicrotask(cb)}end(cb){queueMicrotask(()=>cb?.())}query(t,v,cb){if(typeof v==='function')cb=v;queueMicrotask(()=>this.emit('error',Error('synthetic fatal')))}}const p=new Pool({Client:C,max:2,idleTimeoutMillis:0});${observed?`const {observePool}=await import(${JSON.stringify(new URL('passive-pool.mjs',import.meta.url).href)});observePool(p);`:''}${direct?`const c=await p.connect();c.query('WORK');`:`try{await p.query('WORK')}catch(e){if(e.message!=='synthetic fatal')throw e;}await p.end();`}`;
   const r=spawnSync(process.execPath,['--input-type=module','-e',code],{encoding:'utf8',timeout:5000});assert.equal(r.error,undefined);statuses.push(r.status);
  }
  assert.deepEqual(statuses,direct?[1,1]:[0,0]);
 }
});
