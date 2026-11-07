import fs from 'node:fs'
import path from 'node:path'
export async function installOfflineMirror(page:any){
 const root=path.join(process.cwd(),'mirror')
 const ledger=JSON.parse(fs.readFileSync(path.join(root,'ledger.json'),'utf8'))
 const assets=new Map(ledger.map((r:any)=>[r.path,r]))
 await page.route('**/*',async(route:any)=>{
  const r=route.request(),u=new URL(r.url())
  if(r.method()==='GET'&&u.origin==='https://www.trifaros.com.br'){
   if(r.resourceType()==='document')return route.fulfill({status:200,contentType:'text/html',body:fs.readFileSync(path.join(root,'index.html'))})
   const asset:any=assets.get(u.pathname)
   if(asset)return route.fulfill({status:200,contentType:asset.contentType||'application/octet-stream',body:fs.readFileSync(path.join(root,u.pathname))})
  }
  return route.fulfill({status:501,json:{error:'F2_SYNTHETIC_UNHANDLED'}})
 })
}
