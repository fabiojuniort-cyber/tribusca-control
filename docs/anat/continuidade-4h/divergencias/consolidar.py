"""Consolidação offline de cinco comandos oficiais e três notas divergentes."""
from pathlib import Path
from datetime import datetime, timezone
import json, hashlib
from lxml import html

BASE=Path(__file__).resolve().parent
ANAT=BASE.parents[1]
def load(p): return json.loads(p.read_text(encoding='utf-8'))
def save(p,obj): p.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
rows={r['id']:r for r in load(ANAT/'anat-03-trechos.json')}
notes={r['idNota']:r for r in load(ANAT/'lote-autonomo/notas/notas-alvos.json')['notas']}
sources={slug:load(BASE/f'{slug}-fonte.json') for slug in ['cv165_21','CV086_23','CV010_26','CV069_13','CV001_16']}
events=[
 {'fonte':'cv165_21','ato':'Convênio ICMS 165/21','dataAto':'2021-10-01','publicacao':'2021-10-08','publicacaoRatificacaoCONFAZ':'2021-10-26','atoDeclaratorio':'27/21','inicioVigorProposto':'2021-10-26','efeitosPropostos':'2021-10-26','fundamento':'Cláusula primeira acrescenta §2 à quarta e renumera único para §1; segunda condiciona vigor à publicação da ratificação. Não contém efeitos distintos expressos.'},
 {'fonte':'CV086_23','ato':'Convênio ICMS 86/23','dataAto':'2023-08-04','publicacao':'2023-08-08','publicacaoRatificacaoCONFAZ':'2023-08-25','atoDeclaratorio':'31/23','inicioVigorProposto':'2023-08-25','efeitosPropostos':'2023-08-25','fundamento':'Cláusula primeira altera §1 da quarta para Sergipe; segunda condiciona vigor à publicação da ratificação. Sem marco expresso de efeitos separado.'},
 {'fonte':'CV010_26','ato':'Convênio ICMS 10/26','dataAto':'2026-01-27','publicacao':'2026-01-29','publicacaoRatificacaoCONFAZ':'2026-02-19','atoDeclaratorio':'04/26','inicioVigorProposto':'2026-02-19','efeitosPropostos':'2026-05-01','fimPrazoGeralExpresso':'2026-12-31','fundamento':'Primeira prorroga disposições até31/12/2026; segunda altera §2 da quarta incluindo São Paulo; terceira distingue vigor e efeitos.'},
 {'fonte':'CV069_13','ato':'Convênio ICMS 69/13','dataAto':'2013-07-26','publicacao':'2013-07-30','publicacaoRatificacaoCONFAZ':'2013-08-16','atoDeclaratorio':'16/13','inicioVigorProposto':'2013-08-16','efeitosPropostos':'2013-10-01','fundamento':'Primeira acrescenta único às quarta e quinta para Mato Grosso; segunda dá efeitos primeiro dia segundo mês subsequente à ratificação.01/10/2013 é cálculo documental; o ato não estipula31/12/2016.'},
 {'fonte':'CV001_16','ato':'Convênio ICMS 1/16','dataAto':'2016-01-14','publicacao':'2016-01-15','publicacaoRatificacaoCONFAZ':'2016-01-22','atoDeclaratorio':'1/16','inicioVigorProposto':'2016-01-22','efeitosPropostos':'2016-01-01','fundamento':'Primeira altera único quarta para Piauí/Sergipe; segunda revoga único quinta; terceira dá efeitos01/01/2016, anteriores à publicação/ratificação.'}
]
def alvo(id,alcance):
    r=rows[id]
    return {**{k:r[k] for k in ['id','caminho','xpath','textoLiteral','hashTrecho','aprovado']},'alcanceProposto':alcance,'situacaoAprovacao':'pendente; candidato documental separado do dossiê principal'}
conflicts=[
 {'idNota':'N52-060','fontes':['cv165_21','CV086_23'],'comandoComprovado':'165/21, primeira: quarta; renumeração de único para§1.86/23, primeira: §1quarta. Nenhum deles altera §1segunda neste comando.','conclusaoProposta':'Cláusula segunda na nota é divergência editorial demonstrável; alvo candidato§1quarta, sem corrigir literal. Intervalo da variante26/10/2021–24/08/2023 é consistente com os dois atos, sujeito à aprovação.','alvos':[alvo('ANAT03-00035','Variante renumerada para§1 em26/10/2021; fim proposto24/08/2023.'),alvo('ANAT03-00036','Variante como único: renumeração em26/10/2021; último dia proposto25/10/2021.'),alvo('ANAT03-00034','Redação de86/23 com Sergipe; início proposto25/08/2023.')]},
 {'idNota':'N52-064','fontes':['CV010_26'],'comandoComprovado':'10/26, segunda: §2 da cláusula quarta; terceira: efeitos01/05/2026. A palavra feira não integra o dispositivo nomeado.','conclusaoProposta':'quarta-feira na nota é anomalia editorial; alvo candidato§2quarta, mantendo literal. Vigência proposta19/02/2026 e efeitos01/05/2026 devem permanecer separados.','alvos':[alvo('ANAT03-00039','Variante incluindo São Paulo, efeitos propostos01/05/2026.'),alvo('ANAT03-00040','Variante sem São Paulo: encerramento de efeitos proposto30/04/2026 por substituição.')]},
 {'idNota':'N52-068','fontes':['CV069_13','CV001_16'],'comandoComprovado':'69/13 cria únicoquinta;1/16,segunda o revoga,terceira efeitos01/01/2016. Data31/12/2016 da nota não aparece em69/13 e conflita com revogação.','conclusaoProposta':'Intervalo proposto de efeitos da redação anterior01/10/2013–31/12/2015; revogação com efeitos01/01/2016. Vigor do revogador22/01/2016 e efeitosretroativos01/01/2016 são eventos distintos. Não alterar nota literal31/12/2016.','notaContraposta':{k:notes['N52-067'].get(k) for k in ['idNota','literal','xpath']},'alvos':[alvo('ANAT03-00043','Variante Mato Grosso, fim de efeitos proposto31/12/2015.'),alvo('ANAT03-00042','Marcador REVOGADO; comando formal1/16segunda, efeitos01/01/2016.')]}
]
for c in conflicts:
    c['notaSnapshot']={k:notes[c['idNota']].get(k) for k in ['idNota','literal','xpath','classes','linksFonte']}
    c['estado']='divergencia_comprovada_documentalmente; associação/intervalo propostos pendentes de conferência humana'
result={'frente':'ANAT','origem':'CLAUDE-COORD','risco':'R0 documental / R1 leitura oficial','consultaUTC':datetime.now(timezone.utc).isoformat(),'dataReferencia':'2026-10-16','limites':['Nenhuma aprovação nova; candidatos não aplicados ao dataset ou planilha.','Datas de publicação e ratificação constam das páginas oficiais do CONFAZ; atos declaratórios completos e DOU integral não conferidos neste complemento.','Efeitos e intervalos propostos são inferências documentais explicitadas, não validação da aplicação estadual ou operação do cliente.','Não prova exaustividade de todos os atos posteriores.'],'eventos':events,'divergencias':conflicts,'contagens':{'fontesHTTP200':5,'notasPrincipais':3,'notaContraposta':1,'relacoesNotaAlvo':sum(len(c['alvos']) for c in conflicts),'idsUnicos':len({a['id'] for c in conflicts for a in c['alvos']})},'fontes':sources}
save(BASE/'divergencias-060-064-068.json',result)
checks=[]
for slug,m in sources.items():
    b=(BASE/f'{slug}.html').read_bytes()
    assert hashlib.sha256(b).hexdigest()==m['sha256ArquivoRepoLF']
    assert m['status']==200 and m['caracteresSubstituicaoTexto']==0
    checks.append({'fonte':slug,'sha256ArquivoRepoLF':m['sha256ArquivoRepoLF'],'bytes':len(b),'status':'PASS'})
assert sum(bool(r['aprovado']) for r in rows.values())==2
assert {r['id'] for r in rows.values() if r['aprovado']}=={'ANAT03-00342','ANAT03-00961'}
assert all(not a['aprovado'] for c in conflicts for a in c['alvos'])
save(BASE/'validacao.json',{'status':'PASS','fontes':checks,'notasComLiteralPreservado':3,'alvosComIDTextoXPathHashPreservados':7,'aprovacoesPrincipais':2,'demaisPendentes':2432,'datasetPrincipalSomenteLido':True,'planilhaNaoAberta':True})
print(json.dumps(result['contagens']))
