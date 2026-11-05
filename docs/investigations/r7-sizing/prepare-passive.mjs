// Pure preparation only: no filesystem, spawn, database or workflow dispatch.
export function preparePassiveR7(before){
 const anchor="return new Pool({connectionString:url,max:2,options:'-c jit=off -c statement_timeout=45000 -c lock_timeout=5000'});";
 if(before.split(anchor).length!==2)throw Error('instrumentation_anchor_changed');
 const replacement="return f2Session.attach(new Pool({connectionString:url,max:2,options:'-c jit=off -c statement_timeout=45000 -c lock_timeout=5000 -c session_preload_libraries=auto_explain -c auto_explain.log_min_duration=250 -c auto_explain.log_parameter_max_length=0 -c auto_explain.log_analyze=on -c auto_explain.log_timing=off -c auto_explain.log_nested_statements=on -c auto_explain.log_buffers=on -c auto_explain.log_format=json -c track_io_timing=on'}));";
 const prefix="import {after as f2After} from 'node:test';\nimport {writeFileSync as f2Write} from 'node:fs';\nimport {createObservationSession} from './support/f2-r7-passive.mjs';\nconst f2Session=createObservationSession();\nf2After(()=>{const observation=f2Session.finish(data=>{if(!process.env.F2_R7_POOL_EVENTS)throw Error('missing_observation_path');f2Write(process.env.F2_R7_POOL_EVENTS,JSON.stringify(data));});try{console.log('F2_R7_OBSERVATION '+JSON.stringify(observation));}catch{} });\n";
 const after=prefix+before.replace(anchor,replacement);
 if(after.slice(prefix.length).replace(replacement,anchor)!==before)throw Error('assertions_changed');
 return {source:after,reversible:true};
}
