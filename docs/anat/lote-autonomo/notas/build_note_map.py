from lxml import html
from pathlib import Path
import re,json,hashlib
R=Path('output/anat'); O=R/'lote-autonomo/notas'; source=R/'sql-evidence/CV052_91.html'
d=html.fromstring(source.read_text(encoding='utf-8')); tree=d.getroottree(); clean=lambda n:' '.join(n.text_content().split())
data=[x for x in json.loads((R/'repo/docs/anat/anat-03-trechos.json').read_text(encoding='utf-8')) if x['ato']=='Convênio ICMS 52/91']
byxp={}
for x in data:byxp.setdefault(x['xpath'],[]).append(x)
ns=d.xpath('//p[contains(@class,"Remiss")]'); idx={tree.getpath(n):i for i,n in enumerate(ns)}
notes=[]
# Selection deliberately reviewed from literal, row number and first cell; not a last-note propagator.
block_ok=set(range(0,16))|{17,18,19,21,22,23,25}
table_ok=set(range(27,44))|{46,47,49,50,51,52,53,54,55,58,59,64,65,66,68,69,70,71,72,73,74,75,76,77,78,79,80,81,84,85,87,88}
for n in d.xpath('//p'):
 t=clean(n); cls=n.get('class',''); xp=tree.getpath(n)
 if not t:continue
 editorial=('Remiss' in cls or 'DataPublica' in cls or 'DataPublicao' in cls or (t.startswith(('Redação original','Redação anterior')) and 'efeitos' in t))
 if not editorial:continue
 i=idx.get(xp); item={'idNota':f'N52-{len(notes)+1:03d}','indiceRemissoBase0':i,'literal':t,'xpath':xp,'classes':cls,'linksFonte':[{'texto':clean(a),'hrefLiteral':a.get('href')} for a in n.xpath('.//a[@href]')],'datasLiterais':re.findall(r'\b\d{1,2}(?:[.º;]+)\d{1,2}[.;]\d{2,4}\b',t),'estado':'pendente','alvos':[]}
 if i in block_ok or i in table_ok:
  tr=n.xpath('ancestor::tr'); p=tr[0] if tr else n; nxt=p.getnext()
  while nxt is not None and not clean(nxt):nxt=nxt.getnext()
  if nxt is not None:
   targetxp=tree.getpath(nxt); rows=byxp.get(targetxp,[])
   targetliteral=clean(nxt); match=True; basis='Alvo explícito na nota + dispositivo sucessor imediato, apenas esse bloco; sem herança aos demais dispositivos.'
   if i in table_ok:
    m=re.search(r'(?:subitem|item)\s+(\d+(?:\.\d+)?(?:-[AB])?)',t,re.I)
    cells=nxt.xpath('./td|./th'); label=clean(cells[0]) if cells else ''
    match=bool(m and label==m.group(1)); basis='Número explícito da nota igual à célula ITEM na linha sucessora imediata, mesma tabela e variante; só a linha, sem propagação.'
   if match and rows and all(x['id'] not in ['ANAT03-00342','ANAT03-00961'] for x in rows):
    item.update(estado='associacao_documental_proposta',regra=basis)
    item['alvos']=[{'id':x['id'],'caminho':x['caminho'],'xpath':x['xpath'],'ncmNBMLiteral':x['ncm'],'textoLiteral':x['textoLiteral'],'limite':'Ligação documental apenas; situação jurídica e aprovação permanecem pendentes.'} for x in rows]
   else:item['motivoPendencia']='Sucessor não satisfaz igualdade estrita ITEM, ID documental ou controle excluído.'
 if item['estado']=='pendente':item.setdefault('motivoPendencia','Fora da seleção estrita deste lote: histórico geral, alvo coletivo, alcance de anexo, alvo implícito, inconsistência editorial ou dependência não conferida.')
 notes.append(item)
linked=[n for n in notes if n['alvos']];ids={a['id'] for n in linked for a in n['alvos']}; contextual={x['id'] for x in data if x.get('associacaoNota')=='Contexto agregado do HTML; associação individual não conferida'}
obj={'origem':'CLAUDE-COORD → GPT-EXEC; lote autônomo autorizado por Fábio','dataReferencia':'2026-10-16','tipo':'Mapa documental offline; sem homologação jurídica','fonteOficial':'https://www.confaz.fazenda.gov.br/legislacao/convenios/1991/CV052_91','snapshotGitHub':data[0]['snapshotGitHub'],'sha256Local':hashlib.sha256(source.read_bytes()).hexdigest(),'sha256NormalizadoLF':hashlib.sha256(source.read_bytes().replace(b'\r\n',b'\n')).hexdigest(),'contagens':{'notasInventariadas':len(notes),'notasRemissoNaoVazias':sum(n['indiceRemissoBase0'] is not None for n in notes),'associacoesPropostas':len(linked),'idsAlvoUnicos':len(ids),'idsContextuaisNaBase':len(contextual),'idsContextuaisComProposta':len(ids&contextual),'notasPendentes':len(notes)-len(linked)},'controlesExcluidos':['ANAT03-00342','ANAT03-00961'],'notas':notes}
(O/'notas-alvos.json').write_text(json.dumps(obj,ensure_ascii=False,indent=2),encoding='utf-8')
lines=['# ANAT — mapa documental de notas 52/91','', 'Origem: CLAUDE-COORD → GPT-EXEC. Lote autônomo autorizado pelo Fábio. Referência: 16/10/2026. R0, extração offline.','', '## Cobertura','',json.dumps(obj['contagens'],ensure_ascii=False,indent=2),'','As 2.273 linhas marcadas anteriormente são registros do dossiê com contexto pendente, não 2.273 notas editoriais independentes. Este lote inventaria nós editoriais não vazios e propõe ligações em subsetores estritos. A base principal e a planilha não foram modificadas.','', '## Critério e limites','', '- Inventário: todos os parágrafos de classe Remiss*, DataPublica*/DataPublicao e parágrafos iniciados por Redação original/anterior com efeitos. Dois nós Remiss* vazios ficam fora do inventário textual; não há conteúdo para vincular.','- Literais têm somente espaços em branco normalizados. XPath é da fonte original; classes não são prova de vigência.','- Propostas selecionadas após conferir literal, alvo e sucessor DOM. Nos itens, o número explícito deve igualar a célula ITEM da linha sucessora; não se copia a última nota para linhas futuras.','- O vínculo é ao bloco/linha específico. Não propaga uma alteração do caput a incisos; nem nota de item a todos subitens; nem notas novas às variantes antigas.','- Datas são transcrições, sem cálculo de vigência ou resolução de conflito. Hrefs são literais, podem ser relativos ou legados e não foram acessados; atos posteriores não foram conferidos neste lote.','- Fonte temporal: snapshot informado no JSON. Não houve coleta nova nem prova de atualização do CONFAZ em 16/10/2026.','- Demais registros continuam pendentes. Situação jurídica, aplicação estadual e elegibilidade não são aprovadas.','- ANAT03-00342 e ANAT03-00961 são controles aprovados pelo Fábio em separado; não são alvo de alteração deste lote.','', '## Associações documentais propostas','', '| Nota | ID(s) alvo | Nota literal |','|---|---|---|']
for n in linked:lines.append('| '+n['idNota']+' | '+', '.join(a['id'] for a in n['alvos'])+' | '+n['literal'].replace('|',' / ')+' |')
lines+=['','## Pendências prioritárias','', '- §1 da quarta: nota diz cláusula segunda; §2 menciona quarta-feira. Preservar literal e conferir modificador.','- Nota do 13.5 do Anexo II declara 13.4; nota do 14.19 declara 14.9; nota do 19.2 declara 13.3. Não atribuir por proximidade.','- Revogações coletivas 39.1–39.3 e 40.2: linha sucessora pode ser outra nota. Nenhuma propagação automática.','- Anexos históricos inteiros precisam delimitação entre títulos/tabelas; este lote não infere homologação em massa.','- A ordem de datas do parágrafo único da quinta apresenta conflito (revogação 01.01.16 versus texto histórico até 31.12.16). Não harmonizar silenciosamente.','', '## Validação','', 'IDs e XPath das propostas conferidos contra o JSON principal restrito ao Convênio 52/91; cada XPath resolve exatamente um nó na fonte. Controles excluídos verificados. Nenhum aprovado=true criado. Todos os arquivos de entrada foram apenas lidos.']
(O/'relatorio.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
assert not ids&{'ANAT03-00342','ANAT03-00961'}
for n in linked:
 for a in n['alvos']:assert len(tree.xpath(a['xpath']))==1
print(json.dumps(obj['contagens'],ensure_ascii=False)); print('OK: IDs, XPath e controles')
