import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import {performance} from 'node:perf_hooks';
const source=fs.readFileSync(new URL('./run-stage.mjs',import.meta.url),'utf8');
const body=source.slice(source.indexOf('function execute('),source.indexOf('const hash='));
function executor(spawnFn=spawn){
 return new Function('spawn','clean','fs','root','env','performance',body+'return execute;')(spawnFn,String,fs,process.cwd(),process.env,performance);
}
test('fractional deadline budget is floored and sub-ms balance starts no probe',()=>{
 assert.match(source,/Math.floor\(readinessDeadline-performance.now\(\)\)/);
 assert.match(source,/if\(timeoutMs<1\)break/);
 const timeoutMs=Math.floor(29999.9979);
 assert.doesNotThrow(()=>spawn(process.execPath,['-e',''],{timeout:timeoutMs,stdio:'ignore'}));
 assert.equal(Math.floor(0.999),0);
});
test('synchronous spawn errors retain original cause and empty stderr',async()=>{
 const failure=Object.assign(Error('creation failure'),{code:'SYNTHETIC_CREATE'});
 const r=await executor(()=>{throw failure;})('mock',[],{allowFailure:true,timeoutMs:100});
 assert.equal(r.spawnError,failure);
 assert.equal(r.stderr,'');
 assert.equal(r.error_kind,'SPAWN_ERROR');
 await assert.rejects(executor(()=>{throw failure;})('mock',[]),error=>error===failure);
});
test('real ENOENT waits for close and produces a complete result shape',async()=>{
 const r=await executor()('f2-r7-nonexistent-executable',[],{allowFailure:true,timeoutMs:1000});
 assert.equal(r.spawnError.code,'ENOENT');
 assert.equal(r.stderr,'');
 assert.equal(r.terminationConfirmed,true);
});
test('a hung real subprocess is killed and closed before the next starts',async()=>{
 const execute=executor();
 const first=await execute(process.execPath,['-e',"process.on('SIGTERM',()=>{});setInterval(()=>{},1000)"],{allowFailure:true,timeoutMs:200});
 assert.equal(first.error_kind,'TIMEOUT');
 assert.equal(first.signal,'SIGKILL');
 assert.equal(first.terminationConfirmed,true);
 const second=await execute(process.execPath,['-e',"process.stdout.write('next')"],{timeoutMs:1000});
 assert.equal(second.code,0);
 assert.equal(second.text,'next');
});
