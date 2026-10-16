"""ANAT R0: triagem documental offline e isolada, sem alterar a base."""
from pathlib import Path
from collections import Counter
from lxml import html
import json, hashlib

ROOT = Path(__file__).resolve().parents[7]
REPO = ROOT / 'output/anat/repo'
OUT = Path(__file__).resolve().parent
BASE = REPO / 'docs/anat'
SOURCE = ROOT / 'output/anat/sql-evidence/CV052_91.html'
FROZEN = ROOT / 'tax13-r7-final/frozen/ops/confaz/acts/CV052_91.html'
INPUT = BASE / 'lote-autonomo/notas/notas-alvos.json'
DATA = BASE / 'anat-03-trechos.json'
BOOK = BASE / 'anat-03-dossie-vigencia.xlsx'
sha = lambda b: hashlib.sha256(b).hexdigest()
protected = [INPUT, DATA, BOOK]
before = {str(p.relative_to(REPO)): sha(p.read_bytes()) for p in protected}
src = SOURCE.read_bytes()
assert src.replace(b'\r\n', b'\n') == FROZEN.read_bytes().replace(b'\r\n', b'\n')
doc = html.fromstring(src.decode('utf-8'))
tree = doc.getroottree()
clean = lambda n: ' '.join(n.text_content().split())
inventory = json.loads(INPUT.read_text(encoding='utf-8'))
rows = [x for x in json.loads(DATA.read_text(encoding='utf-8')) if x['ato'] == 'Convênio ICMS 52/91']
byxp = {}
for row in rows:
    byxp.setdefault(row['xpath'], []).append(row)
excluded = {'ANAT03-00342', 'ANAT03-00961'}

# Seleção humana deste lote. Não se trata de herança automática de última nota.
next_rules = {
48: ('II', 'Variante original do inciso II; nota anterior N52-047 explicita inciso II e o sucessor começa II -.'),
75: ('20.2', 'Número explícito 20.2 igual ao ITEM sucessor; a atribuição do modificador e efeitos continuam pendentes.'),
94: ('40.2', 'Número 40.2 expresso, apesar da grafia literal subite, igual à célula ITEM sucessora.'),
111: ('2.1', 'Variante original imediatamente após N52-110/linha 2.1; sucessor 2.1, sem nota intermediária.'),
127: ('13.5', 'Número 13.5 explícito igual ao ITEM sucessor; a nota conflitante N52-126 não é herdada.'),
133: ('17', 'Variante original entre a redação de 17/N52-132 e o próximo item 18; apenas a linha 17.'),
138: (None, 'Expressão item abaixo e linha sucessora Válvula; sem alcance para a nota N52-139.'),
140: (None, 'Expressão item abaixo e linha sucessora Brocas, na mesma tabela histórica.'),
141: (None, 'Expressão item abaixo e linha sucessora Ferramentas de embutir, de estampar ou de puncionar.'),
142: (None, 'Expressão item abaixo e linha sucessora Outras bombas centrífugas.'),
143: (None, 'Expressão item abaixo e linha sucessora Aparelhos para filtrar ou depurar gases.'),
144: ('15.8', 'Número 15.8 explícito igual ao ITEM sucessor; não inclui a linha com duas variantes históricas.'),
147: ('33.03', 'Caput 33.03 explícito igual ao ITEM sucessor; não inclui alíneas e códigos subsequentes.'),
149: (None, 'Expressão item abaixo e linha sucessora Packer (obturador).'),
150: ('40.07', 'Número 40.07 explícito igual ao ITEM sucessor; a variante original fica separada.'),
152: (None, 'Nota de acréscimo de item seguida exclusivamente de Árvore de natal antes da próxima nota.'),
153: (None, 'Nota de acréscimo de item seguida exclusivamente de Manifold e válvula tipo gaveta antes da próxima nota.'),
154: (None, 'Nota de acréscimo de item seguida exclusivamente de Válvula tipo esfera antes da próxima nota.'),
155: (None, 'Nota de acréscimo de item seguida exclusivamente de Válvula tipo borboleta antes da próxima nota.'),
156: ('41-A.', 'Nota explicita item 41-A; apenas seu cabeçalho sucessor, sem propagação ao 41-A-01.'),
157: ('41-B.', 'Nota explicita item 41-B; apenas seu cabeçalho sucessor, sem propagação ao 41-B-01.'),
158: ('43.05', 'Número 43.05 explícito igual ao ITEM sucessor.'),
159: (None, 'Expressão item abaixo e linha sucessora Mancal de bronze para locomotiva, variante 8607.19.0400.'),
162: (None, 'Nota singular de acréscimo imediatamente seguida de Arado de disco, antes do item 10.'),
164: (None, 'Nome microtrator explícito na nota e sucessor Microtrator; sem estender ao item 21.'),
165: ('22', 'Número 22 explícito igual ao ITEM sucessor; variante 8701.90.90.'),
166: ('22', 'Número 22 explícito igual ao ITEM sucessor; variante 8701.90.00.'),
168: (None, 'Nome bombas explícito na nota e sucessor Bombas; não alcança o item 23.'),
172: (None, 'Nota singular de acréscimo imediatamente seguida de Ovascan, antes da nota do item 31.'),
173: ('31', 'Número 31 explícito; ITEM sucessor 31; hífen separador mantido fora do número.'),
174: ('32', 'Número 32 explícito; ITEM sucessor 32; hífen separador mantido fora do número.'),
175: ('33', 'Número 33 explícito; ITEM sucessor 33; hífen separador mantido fora do número.'),
176: ('34', 'Número 34 explícito; ITEM sucessor 34 com dois códigos NCM, preservados separadamente.'),
}
same_rules = {
148: 'Nota e único caput histórico 33.03 na mesma linha; vínculo à linha, sem propagar às alíneas.',
151: 'Nota e única variante original 40.07 na mesma linha; não confundir com a redação da linha anterior.',
160: 'Expressão item abaixo e única variante histórica do Mancal na mesma linha; NCM 8607.19.9900.',
167: 'Nota original do item 22 e único texto 22 na mesma linha; NBM literal 8701.90.0200.',
}
groups = {
89: (['39.1', '39.2', '39.3'], 1, 'Revogação coletiva explícita; pula exatamente a nota histórica N52-090, exige sequência 39.1/39.2/39.3. Controle aprovado 00342 excluído.'),
90: (['39.1', '39.2', '39.3'], 0, 'Histórico coletivo explícito e sequência 39.1/39.2/39.3. Controle aprovado 00342 excluído.'),
93: (['40.2'], 1, 'Revogação 40.2 explícita; pula exatamente nota histórica N52-094 e limita-se a 40.2.'),
101: (['55'] + [f'55.{i}' for i in range(1, 15)], 0, 'Escopo expresso item 55 e subitens 55.1 a 55.14; sequência completa até a próxima nota N52-102.'),
102: (['55'] + [f'55.{i}' for i in range(1, 15)], 0, 'Escopo expresso item 55 e subitens 55.1 a 55.14, variante histórica separada; data literal 31;08;10 preservada.'),
105: (['72', '72.1', '72.2'], 0, 'Escopo expresso 72, 72.1 e 72.2; são as três últimas linhas da tabela desta variante.'),
161: (['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI'], 0, 'Escopo expresso I a XVI; sequência romana completa nas últimas 16 linhas da tabela histórica do Anexo I.'),
}
pending_reasons = {
60: 'Nota diz cláusula segunda; contexto DOM pertence à quarta. Exige confronto do modificador; nenhuma correção literal inferida.',
64: 'Nota literal quarta-feira é anômala; vínculo aguarda confronto do modificador 10/26.',
68: 'Conflito entre efeitos até 31.12.16 e revogação indicada por N52-067 a partir de 01.01.16. Não harmonizar datas.',
126: 'Nota declara 13.4 e 28.12.20; linha sucessora é 13.5. Não vincular por proximidade.',
130: 'Nota declara 14.9; linha sucessora é 14.19. Não trocar número silenciosamente.',
134: 'Nota declara 13.3; linha sucessora é 19.2. Não usar o alvo 13.3 de outra posição.',
135: 'Nota original declara 13.3; linha sucessora é 19.2. Exige confronto de modificador e variante.',
139: 'Código 7307.19.0300 na própria linha da nota e sucessor Válvula sem código; geometria das células requer revisão visual antes de apontar ID.',
145: 'Duas variantes 15.08 e dois códigos iguais na mesma linha; XPath de linha não separa os efeitos desta nota.',
146: 'Mesma linha contém a variante de N52-145 e a original; não atribuir a nota aos dois registros NCM.',
163: 'Nota contém dois NBM explícitos; associação com linhas/variantes e alcance da alteração de carga requer confirmação, sem expandir posições.',
169: 'Nota na linha com redação histórica b, enquanto b) Excluída está na linha anterior; relação temporal/revogação exige dupla anotação conferida.',
170: 'Códigos de oito dígitos de exclusão versus faixa NBM de dez dígitos na linha posterior; não equiparar ou expandir faixa.',
171: 'Posições NBM específicas versus faixa ampla em outra linha; não atribuir a todos os códigos da faixa.',
}
annexes = {70,106,107,136,137}
results = []
for note in inventory['notas']:
    if note['alvos']:
        continue
    i = int(note['idNota'].split('-')[-1])
    nodes = tree.xpath(note['xpath'])
    assert len(nodes) == 1 and clean(nodes[0]) == note['literal']
    node = nodes[0]
    ancestors = node.xpath('ancestor::tr')
    holder = ancestors[0] if ancestors else node
    item = {k: note[k] for k in ['idNota','literal','xpath','classes','linksFonte']}
    item.update(categoria='', estado='pendente_sem_vinculo', fundamento='', alvos=[], controlesExcluidos=[])
    selected = []
    if i <= 42:
        item['categoria'] = 'metadado_global' if i <= 3 else ('prorrogacao_geral' if note['literal'].startswith('Prorrogad') else 'remissao_geral')
        item['fundamento'] = 'Escopo do ato/remissão, não de uma única linha NCM. Mantida como dependência global; nenhuma propagação aos 2.323 trechos do Convênio 52/91.'
    elif i in annexes:
        item['categoria'] = 'escopo_anexo_inteiro'
        item['fundamento'] = 'Nota de anexo inteiro/variante histórica. Pode ancorar a variante, mas a identificação da tabela não homologa cada linha nem substitui as notas locais. Sem vínculo individual em massa.'
    elif i in pending_reasons:
        item['categoria'] = 'inconsistencia_editorial' if i in {60,64,68,126,130,134,135} else 'ambiguidade_celula_variante_codigo'
        item['fundamento'] = pending_reasons[i]
    elif i in next_rules:
        expected, reason = next_rules[i]
        nxt = holder.getnext()
        assert nxt is not None
        selected = [nxt]
        if expected:
            cells = nxt.xpath('./td|./th')
            got = clean(cells[0]) if cells else clean(nxt).split(' ')[0]
            got = got.split(' ')[0]
            assert got == expected, (i, expected, got)
        item.update(categoria='candidato_sucessor_delimitado', fundamento=reason)
    elif i in same_rules:
        selected = [holder]
        item.update(categoria='candidato_mesma_linha', fundamento=same_rules[i])
    elif i in groups:
        labels, skip, reason = groups[i]
        nxt = holder.getnext()
        for _ in range(skip):
            assert nxt is not None and ('Redação anterior' in clean(nxt)), i
            nxt = nxt.getnext()
        for expected in labels:
            assert nxt is not None
            cells = nxt.xpath('./td|./th')
            assert clean(cells[0]) == expected, (i, expected, clean(nxt))
            selected.append(nxt)
            nxt = nxt.getnext()
        item.update(categoria='candidato_coletivo_explicito', fundamento=reason)
        item['limiteDOMAposSelecao'] = tree.getpath(nxt) if nxt is not None else 'fim da tabela'
    else:
        raise AssertionError(('Nota sem classificação', i))
    for target in selected:
        xp = tree.getpath(target)
        assert xp in byxp, (i, xp)
        for row in byxp[xp]:
            if row['id'] in excluded:
                item['controlesExcluidos'].append(row['id'])
                continue
            assert not row['aprovado']
            item['alvos'].append({k: row[k] for k in ['id','caminho','xpath','ncm','textoLiteral','hashTrecho','situacaoProposta']})
    if item['alvos']:
        item['estado'] = 'associacao_documental_candidata_nao_integrada'
    results.append(item)

assert len(results) == 105
assert len({x['idNota'] for x in results}) == 105
assert {x['idNota'] for x in results} == {x['idNota'] for x in inventory['notas'] if not x['alvos']}
assert not {a['id'] for x in results for a in x['alvos']} & excluded
new_ids = {a['id'] for x in results for a in x['alvos']}
old_ids = {a['id'] for x in inventory['notas'] for a in x['alvos']}
assert not old_ids & new_ids
for result in results:
    for target in result['alvos']:
        matches = [row for row in byxp[target['xpath']] if row['id'] == target['id']]
        assert len(matches) == 1 and all(matches[0][k] == value for k, value in target.items())
        assert len(tree.xpath(target['xpath'])) == 1
after = {str(p.relative_to(REPO)): sha(p.read_bytes()) for p in protected}
assert before == after
counts = {'notasTriadas':len(results), 'notasComCandidatoAdicional':sum(bool(x['alvos']) for x in results), 'notasSemCandidatoIndividual':sum(not x['alvos'] for x in results), 'relacoesNotaId':sum(len(x['alvos']) for x in results), 'idsCandidatosUnicos':len({a['id'] for x in results for a in x['alvos']}), 'porCategoria':dict(Counter(x['categoria'] for x in results))}
counts['reconciliacaoComMapaAnterior'] = {'notasComCandidatoAnterior':71, 'notasComCandidatoSomandoComplemento':71+counts['notasComCandidatoAdicional'], 'idsAlvoUnicosAnteriores':len(old_ids), 'idsComunsEntreMapas':len(old_ids&new_ids), 'idsUnicosSomandoComplemento':len(old_ids|new_ids), 'notasInventariadas':len(inventory['notas']), 'verificacao176':71+counts['notasComCandidatoAdicional']+counts['notasSemCandidatoIndividual']}
output = {'origem':'CLAUDE-COORD → GPT-EXEC; continuidade de 4h autorizada por Fábio', 'dataReferencia':'2026-10-16', 'risco':'R0; análise documental offline', 'limite':'Candidato documental não comprova vigência, adoção estadual ou elegibilidade; nenhuma aprovação humana criada.', 'fonte': {'copiaLocal':str(SOURCE.relative_to(ROOT)), 'copiaFrozenConferida':str(FROZEN.relative_to(ROOT)), 'sha256Local':sha(src), 'sha256NormalizadoLF':sha(src.replace(b'\r\n',b'\n')), 'snapshotGitHub':inventory['snapshotGitHub']}, 'contagens':counts, 'entradasPreservadasSha256':before, 'controlesExcluidos':sorted(excluded), 'triagem':results}
(OUT / 'triagem-105.json').write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
lines = ['# ANAT — triagem das 105 notas remanescentes', '', 'Origem CLAUDE-COORD → GPT-EXEC. Continuidade de quatro horas autorizada por Fábio; 16/10/2026. R0, análise offline.', '', 'As 105 notas foram classificadas individualmente. Novas ligações são candidatas e ficam neste complemento: inventário anterior, dossiê e planilha permanecem intactos. Nenhuma conclusão de vigência ou aprovação foi acrescentada.', '', '## Contagens', '', '```json', json.dumps(counts,ensure_ascii=False,indent=2), '```', '', '## Critério', '', 'Cada literal e XPath foi resolvido contra o HTML local, idêntico em LF ao snapshot frozen. Nos grupos coletivos, cada número da sequência expressa foi conferido célula por célula; nenhuma nota é herdada por linhas fora do grupo. Notas em uma linha com duas variantes permanecem sem ligação. Caput não se estende a subitens. Códigos NBM de dez dígitos e NCM de oito dígitos permanecem literais, sem conversão.', '', 'As notas globais e de anexos foram triadas, mas não receberam IDs individuais: sua aplicação por trecho depende de regras e revisão específicas. Os dois IDs aprovados foram excluídos de todos os candidatos. As notas N52-089/090 apontam apenas aos outros dois subitens de seu grupo; 00342 conserva a aprovação previamente registrada.', '', 'O critério é ligação editorial documental. N52-075 contém atribuição histórica ao 129/19 e N52-102 contém a data 31;08;10: a ligação não valida esses conteúdos. N52-126/130/134/135 ficam sem candidato por divergência de número; N52-060/064/068 também aguardam confronto dos atos ou solução do conflito. A correção jurídica pode usar o relatório de atos em separado, nunca a proximidade DOM.', '', '## Inventário completo da triagem', '', '| Nota | Categoria | IDs candidatos (pendentes) | Fundamento / limite |', '|---|---|---|---|']
for x in results:
    ids = ', '.join(a['id'] for a in x['alvos']) or '—'
    lines.append('| '+x['idNota']+' | '+x['categoria']+' | '+ids+' | '+x['fundamento'].replace('|',' / ')+' |')
lines += ['', '## Controle verificável', '', '- 105/105 notas remanescentes cobertas, sem duplicidade ou alteração de literal.', '- XPath dos candidatos corresponde ao registro do dossiê e resolve uma única linha/bloco na fonte.', '- Hashes SHA-256 do inventário anterior, JSON principal e XLSX antes/depois iguais (ver JSON).', '- Nenhum candidato aponta para ANAT03-00342 ou ANAT03-00961; nenhum aprovado=true foi criado.', '- Resultado não integrado automaticamente ao inventário anterior, JSON principal ou XLSX. Conferência humana dos 2.432 trechos pendentes continua necessária.', '- A leitura é do snapshot histórico informado; não é prova de que a página oficial continua igual nesta data.', '']
(OUT / 'relatorio.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps(counts,ensure_ascii=False))
