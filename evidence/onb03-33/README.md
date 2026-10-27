# ONB-03.2 / ONB-03.3 — provas visuais

Web: 84caeae7deccb733f314b4c358a6f387041f17d3
Backend: c7b54b2b36dd9d32360fdd8071f5e5a750414282
CI web: https://github.com/fabiojuniort-cyber/radar-fiscal-web/actions/runs/40452715799

Capturas do bundle real no Chromium/Vite preview em CI, nos quatro viewports. Fixture AGREX sintética: CNPJ 11.222.333/0001-81, nove segmentos, doze passos. Não é cadastro real da Agrex, consulta real à RFB/SEFAZ ou readback de produção. APIs do browser são controladas; o backend tem testes HTTP/PG18 separados para publicação, leitura do onboarding e reversão, preservando o hash dos perfis.

Sequência: 01 CNPJ; 02 animação com amostra das frases CSV; 03 Empresa; 04 Estabelecimentos/IE inline; 05a sugestão Arroz/NCM 1006 desmarcada e CNAE 0111301; 05 seleção explícita; segmento-* outros cards; 06 Resumo com segmentos pulados; 07 filial nova vazia; 08 aviso de versão nova com rascunho.

Nenhum merge, deploy, alteração de perfil produtivo ou exclusão de dados. O pacote para no gate de revisão independente.

Pacote completo: 68 PNGs nos quatro viewports e vídeo desktop. CI web: 272 unitários PASS; 196 browser PASS, 16 skips preexistentes; FULL_REGRESSION.
