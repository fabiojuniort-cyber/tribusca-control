// Offline doubles only. No socket, PG server, Docker or CI dispatch.
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {EventEmitter} from 'node:events';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=path.resolve(process.argv[2]||'radar-fiscal-backend');
const req=createRequire(path.join(root,'package.json'));
const Pool=req('pg-pool');
const hash=b=>createHash('sha256').update(b).digest('hex');
assert.equal(hash(fs.readFileSync(req.resolve('pg-pool'))),'6f304776edaabde2954cbf8c4366fa6d9512bfba0e408e78cc56b3c46c69d058');
const lock=JSON.parse(fs.readFileSync(new URL('package-lock.snapshot.json',import.meta.url)));
for(const name of ['pg','pg-pool']){
 let dir=path.dirname(req.resolve(name));
 while(!fs.existsSync(path.join(dir,'package.json')))dir=path.dirname(dir);
 assert.equal(JSON.parse(fs.readFileSync(path.join(dir,'package.json'))).version,lock.packages['node_modules/'+name].version);
}
import {observePool} from './passive-pool.mjs';
const source=fs.readFileSync(new URL('passive-pool.mjs',import.meta.url),'utf8');
const observed=[];
function instrumentPool(pool){observed.push(observePool(pool));return pool;}
Object.assign(process.env,{CI:'true',GITHUB_ACTIONS:'true',F2_R7_LAB_NONCE:'a'.repeat(24),DATABASE_ADMIN_URL:'postgresql://postgres:postgres@localhost:5432/radar_fiscal_test'});
const gucs={server_version:'18.6',statement_timeout:'45s',lock_timeout:'5s',jit:'off',track_io_timing:'on',session_preload_libraries:'auto_explain','auto_explain.log_min_duration':'250','auto_explain.log_parameter_max_length':'0','auto_explain.log_analyze':'on','auto_explain.log_timing':'off','auto_explain.log_nested_statements':'on','auto_explain.log_buffers':'on','auto_explain.log_format':'json'};
const report={node:process.version,offline:true,pg18Equivalence:'NOT_PROVEN',harnessEquivalence:'NOT_PROVEN',hashes:{observer:hash(source),lock:hash(fs.readFileSync(new URL('package-lock.snapshot.json',import.meta.url))),nativePool:hash(fs.readFileSync(req.resolve('pg-pool'))),nativePgEntry:hash(fs.readFileSync(req.resolve('pg'))),nativeClient:hash(fs.readFileSync(path.join(path.dirname(req.resolve('pg')),'client.js')))},cases:[]};
const originalLog=console.log;
async function run(mode,scenario){
 const trace=[],clients=[];let id=0,failed=false,committed=false;
 const error=Object.assign(Error('synthetic'),{code:scenario==='sql_error'?'P0001':'57014'});
 class Client extends EventEmitter{
  constructor(){super();this.id=++id;this._queryable=true;this._ending=false;clients.push(this);}
  connect(cb){trace.push(['connect',this.id]);queueMicrotask(()=>cb(scenario==='connect_error'&&!failed?(failed=true,error):null));}
  end(cb){trace.push(['discard',this.id]);this._ending=true;queueMicrotask(()=>cb?.());}
  query(sql,values,cb){
   if(typeof values==='function')cb=values;
   sql=typeof sql==='string'?sql:sql.text;
   const auxiliary=/current_setting|pg_backend_pid|jsonb_build_object/.test(sql);
   trace.push([auxiliary?'observe':'query',this.id,auxiliary?'snapshot/settings':sql,this.listenerCount('error')]);
   let result={rows:[{ok:true}]};
   if(sql.includes('current_setting'))result={rows:Object.entries(gucs).map(([name,value])=>({name,value}))};
   if(sql.includes('pg_backend_pid'))result={rows:[{pid:this.id}]};
   if(sql.includes('jsonb_build_object'))result={rows:[{data:{}}]};
   if(sql==='COMMIT')committed=true;
   const shouldFail=(!auxiliary&&sql==='WORK'&&['sql_error','statement_timeout','sync_throw','fatal_async','rollback_error'].includes(scenario)&&!failed)||
    (scenario==='snapshot_after_commit_error'&&auxiliary&&committed&&!failed);
   if(shouldFail)failed=true;
   if(!auxiliary)this.lastBusinessResult=result;
   if(shouldFail&&scenario==='sync_throw')throw error;
   const action=(done)=>queueMicrotask(()=>{
    if(shouldFail&&scenario==='fatal_async'){
     this._queryable=false;
     try{this.emit('error',error);trace.push(['fatal_event_handled',this.id]);}
     catch(e){trace.push(['fatal_event_unhandled',this.id,e===error]);}
    }
    done(shouldFail?error:null,result);
   });
   if(cb){action(cb);return;}
   return new Promise((resolve,reject)=>action((e,r)=>e?reject(e):resolve(r)));
  }
 }
 const pool=new Pool({Client,max:2,idleTimeoutMillis:0});
 pool.on('acquire',c=>trace.push(['acquire',c.id]));
 pool.on('release',(e,c)=>trace.push(['release',c.id,e?.code||null]));
 pool.on('error',(e,c)=>trace.push(['pool_error',c.id,e.code]));
 if(mode==='instrumented')instrumentPool(pool);
 console.log=()=>{};
 try{
  if(['commit','rollback','rollback_error','snapshot_after_commit_error'].includes(scenario)){
   const c=await pool.connect();
   try{await c.query('BEGIN');try{await c.query('WORK');}catch(e){if(scenario!=='rollback_error')throw e;assert.equal(e,error);trace.push(['error',e.code,'same_object']);}await c.query(scenario.startsWith('rollback')?'ROLLBACK':'COMMIT');trace.push(['return','transaction']);}
   finally{c.release();}
  }else{
   try{const r=await pool.query('WORK');assert.equal(r,clients[0].lastBusinessResult);assert.equal(r.rows[0].ok,true);trace.push(['return','success']);}
   catch(e){assert.equal(e,error);trace.push(['error',e.code,'same_object']);}
   await pool.query('AFTER');trace.push(['return','after']);
  }
 }catch(e){assert.equal(e,error);trace.push(['error',e.code,'same_object']);}
 finally{
  const listeners=clients.map(c=>({id:c.id,errorListeners:c.listenerCount('error'),idle:pool._idle.some(x=>x.client===c)}));
  const releases=trace.filter(x=>x[0]==='release');
  assert.equal(releases.length,trace.filter(x=>x[0]==='acquire').length);
  for(const c of clients)assert.equal(releases.filter(x=>x[1]===c.id).length,trace.filter(x=>x[0]==='acquire'&&x[1]===c.id).length);
  await pool.end();console.log=originalLog;
  return {trace,listeners,releaseCount:releases.length,committed};
 }
}
for(const scenario of ['success','sql_error','statement_timeout','sync_throw','connect_error','fatal_async','commit','rollback','rollback_error','snapshot_after_commit_error']){
 const native=await run('native',scenario),instrumented=await run('instrumented',scenario);
 const strip=t=>t.filter(x=>x[0]!=='observe').map(x=>x[0]==='query'?x.slice(0,3):x);
 const equal=JSON.stringify(strip(native.trace))===JSON.stringify(strip(instrumented.trace));
 if(['success','sql_error','statement_timeout','connect_error','commit','rollback','rollback_error','sync_throw'].includes(scenario))assert.equal(equal,true,scenario);
 if(scenario==='fatal_async')assert.equal(equal,true);
 if(scenario==='sync_throw'){assert.equal(native.listeners[0].errorListeners,2);assert.equal(instrumented.listeners[0].errorListeners,2);}
 if(scenario==='snapshot_after_commit_error'){assert.equal(native.committed,true);assert.equal(instrumented.committed,true);assert.equal(equal,true);}
 assert.deepEqual(instrumented,native,scenario+' full trace/listeners');
 const h=observed.shift();h.detach();assert.equal(h.status().outcome,'COMPLETE');
 report.cases.push({scenario,projectedTraceEqual:equal,fullTraceEqual:true,native,instrumented,observation:h.status()});
}
report.hashes.test=hash(fs.readFileSync(new URL(import.meta.url)));
fs.writeFileSync(new URL('passive-results.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
originalLog(JSON.stringify({cases:report.cases.length,projectedEqual:report.cases.filter(x=>x.projectedTraceEqual).length,hashes:report.hashes,result:'Offline native full traces PASS; PG18 NOT_PROVEN'}));
