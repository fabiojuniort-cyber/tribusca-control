import pg from 'pg';
import fs from 'node:fs';
import {performance} from 'node:perf_hooks';
export function guard(env=process.env){
  if(env.CI!=='true'||env.GITHUB_ACTIONS!=='true'||!/^[a-f0-9]{24}$/.test(env.F2_R7_LAB_NONCE||''))throw Error('lab_guard');
  const u=new URL(env.DATABASE_ADMIN_URL);
  if(!['localhost','127.0.0.1'].includes(u.hostname)||u.port!=='5432'||u.pathname!=='/radar_fiscal_test'||u.username!=='postgres'||u.search||u.hash)throw Error('database_guard');
}
const emit=(kind,data)=>console.log('F2_R7_DIAG '+JSON.stringify({kind,at:new Date().toISOString(),...data}));
async function observe(){
 guard();
 const pool=new pg.Pool({connectionString:process.env.DATABASE_ADMIN_URL,max:1,options:'-c default_transaction_read_only=on -c statement_timeout=900 -c lock_timeout=500'});
 let stopped=false;process.on('SIGTERM',()=>{stopped=true;});process.on('SIGINT',()=>{stopped=true;});
 const start=performance.now();let count=0;
 try{
  while(!stopped&&count<300&&performance.now()-start<300000){
   const t=performance.now();
   try{
    const sessions=(await pool.query(`SELECT pid,backend_type,state,wait_event_type,wait_event,pg_blocking_pids(pid) AS blockers FROM pg_stat_activity WHERE datname=current_database() AND pid<>pg_backend_pid()`)).rows;
    const locks=(await pool.query(`SELECT pid,locktype,mode,granted,count(*)::int AS count FROM pg_locks WHERE database=(SELECT oid FROM pg_database WHERE datname=current_database()) GROUP BY pid,locktype,mode,granted`)).rows;
    const tables=(await pool.query(`SELECT n_live_tup,n_dead_tup,n_mod_since_analyze,last_analyze,last_autoanalyze,last_autovacuum FROM pg_stat_user_tables WHERE relname='audit_log'`)).rows;
    const io=(await pool.query(`SELECT backend_type,object,context,sum(reads) AS reads,sum(writes) AS writes,sum(read_time) AS read_time,sum(write_time) AS write_time FROM pg_stat_io GROUP BY backend_type,object,context`)).rows;
    const db=(await pool.query(`SELECT blks_read,blks_hit,temp_files,temp_bytes,deadlocks,blk_read_time,blk_write_time FROM pg_stat_database WHERE datname=current_database()`)).rows;
    const checkpoint=(await pool.query('SELECT * FROM pg_stat_checkpointer')).rows;
    const cpu=fs.readFileSync('/proc/stat','utf8').split('\n')[0];
    let cgroup={};for(const name of ['cpu.stat','memory.current','memory.events']){try{cgroup[name]=fs.readFileSync('/sys/fs/cgroup/'+name,'utf8');}catch{cgroup[name]='UNAVAILABLE';}}
    emit('sample',{ordinal:++count,elapsed_ms:performance.now()-start,sessions,locks,tables,io,db,checkpoint,cpu,cgroup,overhead_ms:performance.now()-t});
   }catch(e){emit('observer_error',{ordinal:++count,sqlstate:e.code||null});}
   await new Promise(r=>setTimeout(r,Math.max(0,1000-(performance.now()-t))));
  }
 }finally{await pool.end();emit('observer_end',{samples:count,elapsed_ms:performance.now()-start});}
}
if(process.argv.includes('--observer'))await observe();
