const fs=require('fs'),crypto=require('crypto');
const root=(process.argv[2]||'f2-r7-grant03/lleg-design/').replace(/\/?$/,'/');
const ids=['lei-10637-2002-original','lei-10637-2002-atualizada','lei-10833-2003-original','lei-10833-2003-atualizada'];
const report=[];
for(const id of ids){
 const meta=JSON.parse(fs.readFileSync(root+id+'.meta.json','utf8'));
 const raw=fs.readFileSync(root+id+'.html');
 const hash=crypto.createHash('sha256').update(raw).digest('hex');
 if(hash!==meta.sha256||raw.length!==meta.bytes)throw Error('bytes mismatch '+id);
 const html=new TextDecoder('utf-8',{fatal:true}).decode(raw);
 const examples=[];
 const counts={};
 for(const [kind,pattern]of [['redaction_note',/Reda[çc][ãa]o dada/giu],['revocation_note',/Revogad[oa]/giu],['vide_reference',/\bVide\b/giu]]){
  const matches=[...html.matchAll(pattern)];counts[kind.replace('_note','_lexeme').replace('_reference','_lexeme')]=matches.length;
  for(const m of matches.slice(0,2)){
   const bomOffset=raw[0]===0xef&&raw[1]===0xbb&&raw[2]===0xbf?3:0; const byteStart=bomOffset+Buffer.byteLength(html.slice(0,m.index),'utf8'),byteEnd=byteStart+Buffer.byteLength(m[0],'utf8');
   if(raw.subarray(byteStart,byteEnd).toString('utf8')!==m[0])throw Error('offset mismatch');
   examples.push({kind:kind.replace('_note','_lexeme').replace('_reference','_lexeme'),rawUtf16:{start:m.index,end:m.index+m[0].length},sourceBytes:{start:byteStart,end:byteEnd},matched:m[0],context:html.slice(Math.max(0,m.index-100),m.index+200),classification:null,scope:'lexical_diagnostic_only_not_structural_or_legal_proof'});
  }
 }
 report.push({id,sha256:hash,bytes:raw.length,url:meta.url,representationVersion:meta.version,counts,examples,engineChanged:false,promoted:false});
}
fs.writeFileSync(root+'diagnostic.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report.map(({id,sha256,bytes,counts})=>({id,sha256,bytes,counts})),null,2));
