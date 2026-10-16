from pathlib import Path
import json,hashlib,re,datetime,collections
OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[1]
source=ROOT/'anat-03-trechos.json'
deps=ROOT/'lote-autonomo/atos/dependencias-adicionais.json'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
baseline={str(p.relative_to(ROOT)):sha(p) for p in [source,deps,ROOT/'anat-03-dossie-vigencia.xlsx']}
rows=json.loads(source.read_text(encoding='utf-8-sig')); byid={r['id']:r for r in rows}
acts=json.loads(deps.read_text(encoding='utf-8-sig'))['atos']; bya={a['id']:a for a in acts}
control={'ANAT03-00342','ANAT03-00961'}
assert len(rows)==2434 and {r['id'] for r in rows if r['aprovado']}==control
key=lambda n:f'ANAT03-{n:05d}'
spec=[
 ('DEP100-104-21',[2364,2423,2424,2425],[2365,2366,2367],[], '§1º da primeira revogado e parágrafo único da terceira-A acrescido. São dispositivos diferentes; nota do 26/21 não é prova da revogação.'),
 ('DEP26-ADD-223-21',[],[],[2416], 'Alvo direto é a terceira do 26/21. ID02416 é somente âncora de contexto para a terceira-A do 100/97; BA/RS/SC/SE são conjunto histórico, condicionado à cadeia 228/21.'),
 ('DEP26-ALT-228-21',[],[],[2416], 'Alteração do 26/21, exclui RS/SC do parágrafo da transição, sem excluir esses Estados de todo 100/97. ID02416 é âncora indireta.'),
 ('DEP26-ADD-026-22',[],[],[2416], 'Alteração/renumeração da terceira do 26/21 e autorização AM. Não é o parágrafo único da terceira-A do 100/97 e não prova implementação estadual.'),
 ('DEP100-ALT-063-05',[2397,2398,2399,2400,2401,2402,2410],[2403,2404,2405,2407,2408,2409,2411],[], '§§1º/2º da terceira; variantes anteriores próximas são candidatas ao encerramento, sem corrigir 21.07.15 literal. ID02406 é redação ainda mais antiga, substituída por 16/05, excluída do vínculo de predecessor imediato.'),
 ('DEP52-ALT-146-20',[1413,1417,1449,1450],[1415,1419,1452],[], 'Somente tabela 3 Anexo II 10.1,10.2,13.5. Nota literal 13.4/28.12.20 permanece; ato registrado aponta 13.5/ratificação 29.12.20. Não alterar 13.4.'),
 ('DEP52-ALT-199-23',[1478,1479,1491],[1481,1493],[], 'Somente tabela 3 Anexo II 14.19 e17. Nota 14.9 não desloca o alvo; vigência registrada 29.12.2023 difere de efeitos 01.07.2024. Código 8467.89.00 igual em 14.18 não autoriza vínculo.'),
 ('DEP52-ALT-129-19',[161,1421,1440,1441,1498,1499,1500,1501,1502],[163,1423,1443,1504],[], 'Anexo I  tabela 1 item20.2 e Anexo II  tabela 3 itens10.3,13.3,19.2; alvos separados apesar da nota13.3 junto 19.2. Efeitos registrados de 20.2 são01.10.2019; demais29.07.2019. Não atribuir autoria da redação anterior ao ato substituidor.')]
entries=[]
for aid,new,old,indirect,why in spec:
 a=bya[aid]; candidates=[]
 for category,ids in [('redacao_alvo_no_snapshot',new),('redacao_anterior_candidata_a_encerramento',old),('ancora_indireta_sem_alteracao_direta',indirect)]:
  for n in ids:
   r=byid[key(n)]; assert not r['aprovado'] and r['id'] not in control
   item={k:r.get(k) for k in ['id','ato','caminho','ncm','dominioCodigo','textoLiteral','notaConfaz','notaLocalProxima','classesOriginais','xpath','hashTrecho','sha256Fonte']}
   item.update(papel=category,status='candidato documental; aprovação humana pendente',criterio='ato+dispositivo+tabela/variante; nunca apenas código ou proximidade',elegibilidadeCorrente='não determinada')
   if new or old:
    if r['ato'].endswith('52/91'):
     assert r.get('dominioCodigo')=='NCM/SH' and re.search(r'/tabela [13]/',r['caminho'])
     if category=='redacao_alvo_no_snapshot':
      suffix=re.search(r'/item (.+)$',r['caminho']).group(1)
      depkey=('I' if r['caminho'].startswith('ANEXO I/') else 'II')+suffix if aid.endswith('129-19') else suffix
      assert r['ncm'] in a['ncms'][depkey], (aid,r['id'],depkey)
     item['varianteDocumental']='anterior' if category.startswith('redacao_anterior') else 'redação apresentada como nova no snapshot; corrente em2026 não determinada'
    else:
     item['varianteDocumental']='anterior' if category.startswith('redacao_anterior') else 'dispositivo/estado apresentado no snapshot; aplicação individual não determinada'
   candidates.append(item)
 entries.append(dict(idDependencia=aid,ato=a['ato'],atoAlvoDireto=a['atoAlvo'],linkOficial=a['linkOficial'],criterioEspecifico=why,pendenciaFonte=a['pendencia'],datasRegistradasSemRevalidacao={k:v for k,v in a.items() if k.startswith('data') or k.startswith('inicio') or k.startswith('fim')},alvos=candidates))
excluded=[
 (1445,'146/20 não altera13.4; nota conflita com dispositivo formal13.5.'),
 (1447,'Variante anterior13.4 também não corresponde a13.5.'),
 (1466,'199/23 aponta14.19;14.9 é falso amigo literal.'),
 (1476,'Mesmo NCM8467.89.00 que 14.19, mas item 14.18 distinto.'),
 (146,'Contexto agregado129/19 em item 19 do Anexo I não prova alvo 20.2.'),
 (1425,'Outra redação mais antiga 10.3, não predecessor imediato da 129/19 identificado neste mapa.'),
 (2406,'Versão99/04 do incisoII substituída antes por 16/05; não predecessor imediato para 63/05.'),
 (1591,'NBM/SH8481.80.9910 literal de10dígitos; sem conversão automática para NCM/SH.')]
unique={c['id'] for a in entries for c in a['alvos']}; allpairs=[(a['idDependencia'],c['id']) for a in entries for c in a['alvos']]
assert len(allpairs)==len(set(allpairs)) and unique.isdisjoint(control)
counts=dict(atos=len(entries),atosComAlvosDiretos=sum(any(c['papel']!='ancora_indireta_sem_alteracao_direta' for c in a['alvos']) for a in entries),atosSomenteCadeiaIndireta=3,paresAtoID=len(allpairs),idsUnicos=len(unique),paresDiretos=sum(c['papel']!='ancora_indireta_sem_alteracao_direta' for a in entries for c in a['alvos']),paresIndiretos=3,aprovacoesNovas=0,pendentesAprovacaoDossie=2432)
counts['papeis']=dict(collections.Counter(c['papel'] for a in entries for c in a['alvos']))
counts['porAto']={a['ato']:len(a['alvos']) for a in entries}
nbm=[r for r in rows if r.get('dominioCodigo')=='NBM/SH']; counts['controleNBMlinhasDossie']=len(nbm); counts['controleNBMcomCodigo']=sum(bool(r['ncm']) for r in nbm); counts['NBMnoMapa']=sum(byid[i].get('dominioCodigo')=='NBM/SH' for i in unique)
result=dict(frente='ANAT',origem='CLAUDE-COORD',executor='GPT-EXEC / controle_cadeias',risco='R0 documental offline',registradoUTC=datetime.datetime.now(datetime.timezone.utc).isoformat(),metodo='Cruzamento local de dependências já documentadas e posições/literais do dossiê; nenhuma fonte externa relida nesta subetapa. Datas das oito dependências são herdadas; a atualização paralela104/21 tem evidência oficial local separada.',baselineSHA256=baseline,contagens=counts,controlesAprovadosExcluidos=sorted(control),criterios=['Não inferir vigência, elegibilidade, aplicação estadual ou aprovação de candidato.','Citação no contexto editorial não basta; exigir ato/dispositivo e posição/variante.','Não vincular códigos iguais de itens, anexos ou nomenclaturas diferentes.','Predecessor é variante específica próxima; redações mais antigas demandam cadeia própria.','Três atos da transição 26/21 usam apenas âncora indireta 02416, sem promover a alvos diretos do 100/97.'],dependencias=entries,exclusoesJustificadas=[dict(id=key(n),caminho=byid[key(n)]['caminho'],ncm=byid[key(n)]['ncm'],motivo=m) for n,m in excluded],limites=['Sem alteração nos dados principais ou planilha.','A base herdada mantém ratificação 104/21 nula; a atualização paralela está em continuidade-4h/atos, sem reescrever os oito atos originais.','Mapa não cobre integralmente outras cadeias ou todos os 2.434 trechos.'])
result['atualizacaoParalela104_21']={'dataPublicacaoRatificacao':'2021-07-27','atoDeclaratorio':'16/21','dataAtoDeclaratorio':'2021-07-26','linkOficial':'https://www.confaz.fazenda.gov.br/legislacao/atos-declaratorios/2021/ato_decl_16_21-1','evidenciaLocal':'../atos/AD016_21-texto.txt','relatorioAtualizacao':'../atos/relatorio.md','limite':'DatasRegistradasSemRevalidacao e pendenciaFonte de 104/21 descrevem a base herdada; atualização paralela supera a pendência de ratificação, sem conceder aprovação humana.'}
(OUT/'mapa-atos-ids.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
lines=['# ANAT — controle documental de atos e IDs','', 'Origem: CLAUDE-COORD. Executor: GPT-EXEC / controle_cadeias. R0 offline.','', '**Nenhuma aprovação nova ou alteração de vigência.** Base principal e planilha permanecem intactas. Cruzamento usa o registro anterior dos oito atos, sem nova pesquisa oficial. Datas herdadas devem ser conferidas antes de qualquer uso jurídico.','', f"Foram organizados {counts['paresDiretos']} pares diretos ato/ID (incluindo variantes históricas) e três âncoras indiretas, totalizando {counts['paresAtoID']} pares e {counts['idsUnicos']} IDs únicos. Os 2.432 trechos continuam pendentes; ANAT03-00342 e ANAT03-00961 ficaram excluídos.",'','| Ato | IDs/âncoras | Limite |','| --- | --- | --- |']
for a in entries:
 lines.append('| '+a['ato']+' | '+', '.join(c['id'] for c in a['alvos'])+' | '+a['criterioEspecifico']+' |')
lines+=['','## Critérios de conferência','', 'O JSON separa a redação apresentada como nova no snapshot, a variante anterior candidata a encerramento e a âncora indireta. O rótulo “nova” descreve o documento e não prova vigência atual. Cópias de literais, XPath, código, domínio e hash permitem verificar cada decisão.','', '13.4/13.5 e 14.9/14.19 são alvos diferentes. A 129/19 trata 13.3 e 19.2 separadamente, com datas de efeitos diferentes para 20.2. Mesmo NCM não basta:8467.89.00 aparece em 14.18 e 14.19, assim como variantes históricas compartilham códigos.','', f"O dossiê tem {counts['controleNBMlinhasDossie']} linhas no domínio NBM/SH, {counts['controleNBMcomCodigo']} com código. Nenhuma entrou no mapa. O exemplo ANAT03-01591 preserva 8481.80.9910 (10 dígitos), sem converter para NCM. Campos vazios não são códigos. Não se faz equivalência histórica automática.",'', 'A cadeia 223/21→228/21→26/22 altera dispositivos do 26/21. Usou-se apenas ANAT03-02416 como âncora da terceira-A do 100/97; isso não atribui nova redação direta ao 100/97 nem comprova implantação estadual. O parágrafo único da terceira-A do 100/97 pertence à 104/21.','', 'A data 21.07.15 do trecho ANAT03-02405 permanece literal; a proposta documental herdada 63/05 é 21.07.2005, ainda pendente. A ratificação 104/21 era nula na base herdada; a atualização paralela oficial confirma publicação em 27/07/2021 (AD 16/21, datado 26/07/2021). Ver [relatório de fontes](../atos/relatorio.md) e [texto do AD 16/21](../atos/AD016_21-texto.txt). O mapa conserva datas herdadas para rastreabilidade, sem manter essa pendência como estado atual do pacote.','', '## Exclusões verificáveis','']
for e in result['exclusoesJustificadas']: lines.append('- '+e['id']+': '+e['motivo'])
lines+=['','## Validação','', 'Todos os IDs existem, são únicos por ato e estão pendentes. Não houve alteração no JSON principal, planilha ou registro de atos; hashes antes/depois conferidos. Nenhum commit/push, acesso produtivo, coleta operacional ou escrita em banco foi executado por esta subtarefa.','']
(OUT/'relatorio.md').write_text('\n'.join(lines),encoding='utf-8')
assert baseline=={str(p.relative_to(ROOT)):sha(p) for p in [source,deps,ROOT/'anat-03-dossie-vigencia.xlsx']}
(OUT/'validacao.json').write_text(json.dumps(dict(status='PASS',idsExistem=True,paresUnicos=True,aprovacoesRestritasExcluidas=True,fontesPrincipaisIntactas=True,baselineSHA256=baseline,contagens=counts),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(counts,ensure_ascii=True))
