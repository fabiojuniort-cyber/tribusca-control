const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const path=require('node:path');
const proof=JSON.parse(fs.readFileSync(path.join(__dirname,'lleg-lexical-proof.json'),'utf8'));
const input=process.env.LLEG_INPUT_DIR||'f2-r7-grant03/lleg-design';
for(const sample of proof){
 test(sample.id+' identity, lexical ranges and conservative stage',()=>{
  const bytes=fs.readFileSync(path.join(input,sample.id+'.html'));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),sample.sha256);
  assert.equal(bytes.length,sample.bytes);
  const html=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
  const bom=bytes.subarray(0,3).equals(Buffer.from([239,187,191]))?3:0;
  for(const e of sample.examples){
   assert.equal(bytes.subarray(e.sourceBytes.start,e.sourceBytes.end).toString('utf8'),e.matched);
   assert.equal(html.slice(e.rawUtf16.start,e.rawUtf16.end),e.matched);
   assert.equal(bom+Buffer.byteLength(html.slice(0,e.rawUtf16.start),'utf8'),e.sourceBytes.start);
   assert.equal(e.classification,null);
   assert.equal(e.scope,'lexical_diagnostic_only_not_structural_or_legal_proof');
  }
  assert.equal(sample.engineChanged,false);assert.equal(sample.promoted,false);
 });
}
