"""Consulta documental manual delimitada: cinco páginas oficiais; sem produto/banco."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib, json, re
from urllib.request import urlopen, Request
from lxml import html

BASE = Path(__file__).resolve().parent
RAW = BASE.parents[6] / 'output' / 'anat' / 'divergencias-http'
RAW.mkdir(parents=True, exist_ok=True)
def consultar(par):
    ano, slug = par
    url = f'https://www.confaz.fazenda.gov.br/legislacao/convenios/{ano}/{slug}'
    old=BASE/f'{slug}-fonte.json'
    prior=json.loads(old.read_text(encoding='utf-8')) if old.exists() else None
    meta = {'url':url, 'consultaUTC':datetime.now(timezone.utc).isoformat(), 'tentativasHTTP':1+(prior or {}).get('tentativasHTTP',0)}
    if prior: meta['tentativaAnterior']={k:v for k,v in prior.items() if k in ('consultaUTC','status','erro')}
    try:
        with urlopen(Request(url, headers={'User-Agent':'Mozilla/5.0'}), timeout=40) as resp:
            raw=resp.read(); meta.update(status=resp.status, encoding=resp.headers.get_content_charset() or 'utf-8')
        (RAW/f'{slug}.html').write_bytes(raw)
        decoded=raw.decode(meta['encoding']); lf=decoded.replace('\r\n','\n').replace('\r','\n').encode('utf-8')
        (BASE/f'{slug}.html').write_bytes(lf)
        root=html.fromstring(decoded)
        nodes=root.xpath('//*[@id="parent-fieldname-text"]')
        assert nodes, 'corpo oficial não localizado'
        body=nodes[0]
        text=' '.join(body.text_content().split())
        (BASE/f'{slug}-texto.txt').write_text(text+'\n', encoding='utf-8',newline='\n')
        meta.update(sha256RespostaHTTP=hashlib.sha256(raw).hexdigest(),bytesRespostaHTTP=len(raw),
          sha256ArquivoRepoLF=hashlib.sha256(lf).hexdigest(),bytesArquivoRepoLF=len(lf),
          normalizacaoArquivoRepo='CRLF/CR→LF; codificação UTF-8, sem alteração textual.',
          arquivoRespostaHTTPAbsoluto=str(RAW/f'{slug}.html'),
          textoDerivadoMetodo='text_content no elemento parent-fieldname-text; colapso de espaços.',
          caracteresSubstituicaoTexto=text.count('\ufffd'),
          links=[{'texto':' '.join(a.text_content().split()),'href':a.get('href')} for a in body.xpath('.//a[@href]')])
    except Exception as exc: meta.update(erro=str(exc),status=meta.get('status','NOT_PROVEN'))
    (BASE/f'{slug}-fonte.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
    return {k:v for k,v in meta.items() if k in ('url','status','erro','sha256ArquivoRepoLF')}

if __name__=='__main__':
    with ThreadPoolExecutor(max_workers=5) as pool:
        print(json.dumps(list(pool.map(consultar,[(2021,'CV165_21'),(2023,'CV086_23'),(2026,'CV010_26'),(2013,'CV069_13'),(2016,'CV001_16')])),ensure_ascii=False,indent=2))
