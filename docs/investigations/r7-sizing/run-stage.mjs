import {authorizeGrant} from './grant-gate.mjs';
import {buildDiagnostic,expectations,sha256} from './diagnostic.mjs';
import {finalizeEvidence,PINNED} from './candidate-support.mjs';
import {productResult} from './execution-state.mjs';
import {fileURLToPath} from 'node:url';
import {parseMetrics,stagePass,treePass,normalizeProductLog} from './stage-policy.mjs';
const grant=await authorizeGrant(); // Each grant validated by its own gate; requires explicit final-HEAD PASS.
const volume=Number(process.env.F2_VOLUME);expectations(volume);
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import os from 'node:os';
import {spawn} from 'node:child_process';
import {performance} from 'node:perf_hooks';

const image='postgres:18-bookworm@sha256:5c4783a8cc3f0074912164f94dfa1be4e043438f0f707cf968d7af9a0d31a2c8';
const cases=[['control','b2150ab5ef34e9f9646e219d522e47738d9c04f5'],['integration','2c41fbab8169b7efca6bd2e80c963d57a50585b6']];
const root=process.cwd(),tmp=process.env.RUNNER_TEMP,output=path.join(root,'f2-r7-sizing-'+volume);
if(process.env.CI!=='true'||process.env.GITHUB_ACTIONS!=='true'||process.env.GITHUB_RUN_ATTEMPT!=='1'||!tmp||process.platform!=='linux')throw Error('ci_lab_guard');
if(process.version!=='v24.22.2')throw Error('node_version_guard');
fs.mkdirSync(output,{recursive:false}); // Existing evidence refuses a second attempt.
const nonce=crypto.randomBytes(12).toString('hex');
const env={...process.env,CI:'true',NODE_ENV:'test',DATABASE_ADMIN_URL:'postgresql://postgres:postgres@localhost:5432/radar_fiscal_test',DATABASE_URL:'postgresql://radar_app_runtime:ci-runtime-password-with-at-least-32-chars@localhost:5432/radar_fiscal_test',DB_RUNTIME_PASSWORD:'ci-runtime-password-with-at-least-32-chars',DB_CURATOR_RUNTIME_PASSWORD:'ci-curator-password-with-at-least-32-chars',JWT_ACCESS_SECRET:'ci-jwt-secret-with-at-least-32-characters',AUTH_REFRESH_COOKIE_NAME:'radar_refresh_token',PUBLIC_API_ALLOWED_ORIGINS:'https://public.example',DB_POOL_MAX:'1',F2_R7_LAB_NONCE:nonce};
// Never inherit a production connection or arbitrary PG client override.
for(const k of ['GH_TOKEN','PGHOST','PGPORT','PGDATABASE','PGUSER','PGPASSWORD','PGSERVICE','PGSERVICEFILE','PGOPTIONS','NODE_OPTIONS'])delete env[k];
const secrets=[env.DB_RUNTIME_PASSWORD,env.DB_CURATOR_RUNTIME_PASSWORD,env.JWT_ACCESS_SECRET];
function clean(s){s=s.replace(/postgres(?:ql)?:\/\/[^\s"'<>]+/g,'[LAB_DSN_REDACTED]');for(const v of secrets)s=s.split(v).join('[LAB_VALUE_REDACTED]');return s;}
function sanitizeDiagnostic(value){return clean(String(value??'')
    .replace(/\b(?:POSTGRES_PASSWORD|PGPASSWORD)\s*=\s*(?:(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*')(?=\s|$)|[\s\S]*)/gi,'[LAB_VALUE_REDACTED]')
    .replace(/postgres(?:ql)?:\/\/[^\r\n]*/gi,'[LAB_DSN_REDACTED]'));}
function execute(command,args,{cwd=root,file,environment=env,allowFailure=false,onFailure,timeoutMs}={}){
 return new Promise((resolve,reject)=>{
  let text='',stderr='',spawnError=null,child,watchdog,settled=false;
  const started=performance.now();
  function finish(code,signal,terminationConfirmed=true){
   if(settled)return;
   settled=true;
   clearTimeout(watchdog);
   const timedOut=timeoutMs!==undefined&&signal==='SIGKILL'&&performance.now()-started>=timeoutMs;
   const result={code,signal,spawnError,text:clean(text),stderr:clean(stderr),timedOut,terminationConfirmed,
    error_kind:spawnError?'SPAWN_ERROR':timedOut?'TIMEOUT':signal?'SIGNAL':code!==0?'EXIT_ERROR':null};
   if(file)fs.writeFileSync(file,result.text);
   if((code!==0||spawnError)&&!allowFailure){
    if(onFailure)onFailure(code,stderr,result);
    reject(spawnError??Error('command_failed:'+command+':'+code));
   }else resolve(result);
  }
  try{
   child=spawn(command,args,{cwd,env:environment,stdio:['ignore','pipe','pipe'],
    ...(timeoutMs===undefined?{}:{timeout:timeoutMs,killSignal:'SIGKILL'})});
  }catch(error){spawnError=error;finish(null,null);return;}
  child.stdout.on('data',b=>{text+=b.toString();});
  child.stderr.on('data',b=>{stderr+=b.toString();text+=b.toString();});
  child.once('error',error=>{spawnError=error;});
  child.once('close',(code,signal)=>finish(code,signal));
  // Failure to confirm termination stops the tree. It never permits another probe.
  if(timeoutMs!==undefined)watchdog=setTimeout(()=>finish(null,child.signalCode??null,false),timeoutMs+1000);
 });
}
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const assets=fileURLToPath(new URL('.',import.meta.url));
function patchR7(dir){
 const f=path.join(dir,'test/onb02-r7-audit.integration.test.ts'),before=fs.readFileSync(f,'utf8');
 const hashes={originalTest:sha256(before)};
 for(const name of ['passive-pool.mjs','prepare-passive.mjs','external-observer.mjs'])hashes[name]=sha256(fs.readFileSync(path.join(assets,name)));
 for(const [name,h]of Object.entries(PINNED))if(hashes[name]!==h)throw Error('candidate_hash_changed:'+name);
 const prepared=buildDiagnostic(before,volume);
 fs.writeFileSync(path.join(dir,'test/onb02-r7-sizing-diagnostic.integration.test.ts'),prepared.source,{flag:'wx'});
 fs.copyFileSync(path.join(assets,'passive-pool.mjs'),path.join(dir,'test/support/f2-r7-passive.mjs'));
 fs.copyFileSync(path.join(assets,'external-observer.mjs'),path.join(dir,'test/support/f2-r7-external.mjs'));
 if(sha256(fs.readFileSync(f))!==prepared.originalHash)throw Error('original_test_modified');
 return {hashes,diagnostic:prepared.diagnosticHash,instrumented_test_sha256:prepared.instrumentedHash,expectations:prepared.expectations,reversible_patch_verified:true};
}
// Only structural plan fields leave the lab log; no query text, constants, Output,
// conditions or parameter values are exported.
const planKeys=new Set(['Node Type','Parent Relationship','Subplan Name','Relation Name','Schema','Alias','Index Name','Scan Direction','Join Type','Strategy','Partial Mode','Startup Cost','Total Cost','Plan Rows','Plan Width','Actual Startup Time','Actual Total Time','Actual Rows','Actual Loops','Rows Removed by Filter','Rows Removed by Join Filter','Inner Unique','Shared Hit Blocks','Shared Read Blocks','Shared Dirtied Blocks','Shared Written Blocks','Local Hit Blocks','Local Read Blocks','Temp Read Blocks','Temp Written Blocks','I/O Read Time','I/O Write Time','WAL Records','WAL FPI','WAL Bytes','Planning Time','Execution Time','Duration','Plans','Plan','Triggers','Trigger Name','Calls','Time','Hash Batches','Hash Buckets','Peak Memory Usage','Sort Method','Sort Space Used','Sort Space Type']);
function safePlan(x){if(Array.isArray(x))return x.map(safePlan);if(x&&typeof x==='object')return Object.fromEntries(Object.entries(x).filter(([k])=>planKeys.has(k)).map(([k,v])=>[k,safePlan(v)]));return x;}
function plansFromLog(text){
 const out=[];let pos=0;
 while(out.length<2000){const marker=text.indexOf('plan:',pos);if(marker<0)break;let start=text.indexOf('{',marker);if(start<0)break;let depth=0,quoted=false,escaped=false,end=-1;
  for(let i=start;i<text.length;i++){const c=text[i];if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;}else if(c==='"')quoted=true;else if(c==='{')depth++;else if(c==='}'&&--depth===0){end=i+1;break;}}
  if(end<0)break;try{out.push(safePlan(JSON.parse(text.slice(start,end))));}catch{}pos=end;
 }
 return {plans:out,capped:out.length===2000,note:'Cancelled statement may have no completed plan. No historical plan inferred.'};
}
const commands=[
 ['npm',['ci']],['npm',['run','build']],['npm',['run','db:prepare']],['node',['ops/onb02/audit-backfill.mjs','--apply','--ack-irreversible-r7']],
 ...['public-signup','onboarding-integrity','onb02-company-purge-graph','onb02-r6-purge','onb02-r71-backfill','onb02-r74-historical-events','onb02-r73-tax10-cli','onb02-r72-backfill'].map(n=>['npx',['tsx','--test','test/'+n+'.integration.test.ts']])
];
let finalCode=0;const summary=[];let activeContainer=null,observer=null,observerTerminal=productResult();
async function stopObserver(){if(observer){const p=observer;observer=null;if(p.exitCode===null&&p.signalCode===null){const closed=new Promise(r=>p.once('close',r));p.kill('SIGTERM');const kill=setTimeout(()=>p.kill('SIGKILL'),5000);await closed;clearTimeout(kill);}}}
async function teardown(){await stopObserver();if(activeContainer){await execute('docker',['rm','-f',activeContainer],{allowFailure:true});activeContainer=null;}}
process.on('SIGTERM',()=>{void teardown().finally(()=>process.exit(143));});
try{
 await execute('docker',['pull',image],{file:path.join(output,'image-pull.txt')});
 fs.writeFileSync(path.join(output,'host.json'),JSON.stringify({node:process.version,platform:os.platform(),release:os.release(),cpus:os.cpus().map(x=>({model:x.model,speed:x.speed})),memory:os.totalmem(),image,order:cases,attempt:1,harness:process.env.GITHUB_SHA,overhead:'Native pool events (2048/pool, 16 pools), unchanged bounded external observer and auto_explain. Accepted coverage losses apply; no timing equivalence claimed.'},null,2));
 for(const [label,sha] of cases){
  const dir=path.join(root,'backend-'+label),out=path.join(output,label);fs.mkdirSync(out);
  const result={label,source:sha,attempt:1,status:'NOT_RUN',product_outcome:productResult(),observer_ended_before_product:false,steps:[]};const t0=performance.now();
  const preparationFailure=step=>(exitCode,stderr,details={})=>{
   // Preserve only the prefix when a password value has no reliable end delimiter.
   const sanitized=sanitizeDiagnostic(stderr);
   result.preparation_failure={step,exit_code:exitCode,stderr:sanitized.slice(0,2048),stderr_truncated:sanitized.length>2048,
    error_kind:details.error_kind??'EXIT_ERROR',signal:details.signal??null,
    spawn_error_code:details.spawnError?.code??null,
    spawn_error:details.spawnError?sanitizeDiagnostic(details.spawnError.message).slice(0,2048):null,
    termination_confirmed:details.terminationConfirmed!==false};
  };
  try{
   if(!path.resolve(dir).startsWith(path.resolve(root)+path.sep)||!fs.existsSync(dir))throw Error('workspace_guard');
   const head=await execute('git',['rev-parse','HEAD'],{cwd:dir});if(head.text.trim()!==sha)throw Error('source_head_changed');
   const tree=await execute('git',['rev-parse','HEAD^{tree}'],{cwd:dir});result.tree=tree.text.trim();
   activeContainer='f2-r7-'+nonce+'-'+label;
   await execute('docker',['run','--rm','-d','--name',activeContainer,'--label','f2-r7-lab='+nonce,'-e','POSTGRES_DB=radar_fiscal_test','-e','POSTGRES_USER=postgres','-e','POSTGRES_PASSWORD=postgres','-p','127.0.0.1:5432:5432',image],{onFailure:preparationFailure('docker_run')});
   // The entrypoint temporary server has no TCP listener. Require the final server and target database.
   let ready=false;
   const readinessDeadline=performance.now()+30000;
   for(let i=0;i<30;i++){
    const timeoutMs=Math.floor(readinessDeadline-performance.now());
    if(timeoutMs<1)break;
    const r=await execute('docker',['exec','-e','PGCONNECT_TIMEOUT=1','-e','PGPASSWORD=postgres',activeContainer,
     'psql','-h','127.0.0.1','-p','5432','-U','postgres','-d','radar_fiscal_test','-v','ON_ERROR_STOP=1','-Atc',
     "SELECT current_database()||'|'||current_setting('server_version')"],
     {allowFailure:true,onFailure:preparationFailure('docker_exec_psql_initial'),timeoutMs});
    if(r.code===0){
     if(!r.text.trim().startsWith('radar_fiscal_test|18.6'))throw Error('postgres_version_guard');
     ready=true;
     delete result.preparation_failure;
     break;
    }
    preparationFailure('docker_exec_psql_initial')(r.code,r.stderr,r);
    if(!r.terminationConfirmed)throw Error('readiness_termination_unconfirmed');
    const remaining=readinessDeadline-performance.now();
    if(remaining>0)await new Promise(r=>setTimeout(r,Math.min(1000,remaining)));
   }
   if(!ready)throw Error('database_not_ready');
   for(let i=0;i<commands.length;i++){
    const [cmd,args]=commands[i],t=performance.now();
    const r=await execute(cmd,args,{cwd:dir,file:path.join(out,'step-'+String(i).padStart(2,'0')+'.txt'),allowFailure:true});result.steps.push({cmd:[cmd,...args],code:r.code,elapsed_ms:performance.now()-t});
    if(r.code!==0)throw Error('predecessor_failed:'+i);
    if(i===3){const sql="SELECT CASE WHEN EXISTS(SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='tenant_onboarding_profiles' AND column_name='company_name' AND is_nullable='YES') AND EXISTS(SELECT 1 FROM pg_trigger WHERE tgname='trg_establishment_company_root') THEN 'PASS' ELSE 'BLOCK' END";const v=await execute('docker',['exec',activeContainer,'psql','-U','postgres','-d','radar_fiscal_test','-Atc',sql]);if(v.text.trim()!=='PASS')throw Error('migration_verification_failed');}
   }
   result.instrumentation=patchR7(dir);
   env.F2_R7_POOL_EVENTS=path.join(out,'pool-events.json');observerTerminal=productResult();
   const obs=fs.openSync(path.join(out,'observer.jsonl'),'w');observer=spawn('node',['test/support/f2-r7-external.mjs','--observer'],{cwd:dir,env,stdio:['ignore',obs,obs]});observer.once('error',e=>{observerTerminal=productResult({spawnError:e});});observer.once('close',(code,signal)=>{result.observer_ended_before_product=result.product_outcome.status==='NOT_RUN';if(observerTerminal.status!=='SPAWN_ERROR')observerTerminal=productResult({code,signal});});fs.closeSync(obs);
   const t=performance.now();const r=await execute('timeout',['--signal=TERM','--kill-after=10s','300s','npx','tsx','--test','test/onb02-r7-sizing-diagnostic.integration.test.ts'],{cwd:dir,file:path.join(out,'r7.txt'),allowFailure:true});result.product_outcome=productResult({code:r.code,signal:r.signal,spawnError:r.spawnError,boundary:'GNU_TIMEOUT'});result.r7={code:r.code,signal:r.signal,elapsed_ms:performance.now()-t};
   result.status=r.code===0?'PRODUCT_EXITED_0':'PRODUCT_FAILED';if(r.code!==0)finalCode=1;
   if(r.code===0){try{result.metrics=parseMetrics(r.text,volume);}catch{result.metrics_invalid=true;}}
   // Preserve the succeeding semantic gate too; a failed R7 does not run it.
   if(r.code===0&&(!['F2-R7-SIZING-03','F2-R7-SIZING-04','F2-R7-SIZING-05'].includes(grant)||!result.metrics_invalid)){const v=await execute('bash',['ops/onb02/ci-evidence-pg18.sh'],{cwd:dir,file:path.join(out,'semantic.txt'),allowFailure:true});result.semantic_code=v.code;if(v.code!==0){result.status='FAIL_SEMANTIC';finalCode=1;}}
  }catch(e){result.status=result.status==='NOT_RUN'?'BLOCKED_PREPARATION':result.status;result.error=sanitizeDiagnostic(e.message);finalCode=1;}
  finally{
   await stopObserver();
   if(activeContainer){const l=await execute('docker',['logs',activeContainer],{allowFailure:true});fs.writeFileSync(path.join(out,'plans.json'),JSON.stringify(plansFromLog(l.text),null,2));fs.writeFileSync(path.join(out,'postgres-errors.txt'),l.text.split('\n').filter(x=>/ERROR:  (synthetic_batch_interruption|canceling statement due to (statement|lock) timeout)/.test(x)).join('\n'));}
   await teardown();
   const readEvidence=name=>{try{return fs.readFileSync(path.join(out,name),'utf8');}catch{return undefined;}};
   try{if(sha256(fs.readFileSync(path.join(dir,'test/onb02-r7-audit.integration.test.ts')))!==PINNED.originalTest)result.original_test_changed=true;}catch{result.original_test_changed=true;}
   const evidence=finalizeEvidence({product:result.product_outcome,poolText:readEvidence('pool-events.json'),observerText:readEvidence('observer.jsonl'),observerExit:observerTerminal,observerEndedBeforeProduct:result.observer_ended_before_product,flushText:normalizeProductLog(readEvidence('r7.txt')||''),hashes:result.instrumentation?.hashes});
   Object.assign(result,evidence);for(const [bad,reason]of [[result.original_test_changed,'ORIGINAL_TEST_CHANGED'],[result.metrics_invalid,'METRICS_INVALID']])if(bad){result.observation_outcome.status='INVALID';result.observation_outcome.reasons.push(reason);}if(evidence.observation_outcome.status!=='COMPLETE')finalCode=1;
   result.elapsed_ms=performance.now()-t0;summary.push(result);fs.writeFileSync(path.join(output,'summary.json'),JSON.stringify(summary,null,2));
   // No retry of this source invocation.
  }
  if(!treePass(result,volume,summary.length-1))break;
 }
}finally{await teardown();}
if(!stagePass(summary,volume))finalCode=1;
console.log(JSON.stringify(summary));process.exitCode=finalCode;
