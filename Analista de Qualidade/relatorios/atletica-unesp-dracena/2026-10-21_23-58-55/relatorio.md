# Relatório de qualidade — Atlética UNESP Dracena

## Parecer

**Aprovado com ressalvas no escopo avaliado.** QA revisou o código e verificou a lógica da faixa com três testes de comportamento isolados. O Tech Lead executou e reportou a regressão real de navegador, sem defeitos confirmados. A reprodução visual da animação em movimento normal e do botão de pausa permanece não executada: o navegador disponível estava realmente configurado com movimento reduzido. Essa lógica passou nos testes isolados, que não comprovam renderização, fluidez ou interação real por toque.

## Contexto

- Data de início: 21/10/2026, 23:58, America/Sao_Paulo.
- Projeto: `C:/Users/João Pedro/Desktop/Projetos com Codex/projetos/atletica-unesp-dracena`.
- Modo: análise inicial e regressão, sem alterações no produto.
- Git inicial: branch `main`, commit `c38b9fe`, sem alterações locais na leitura inicial.
- Stack: HTML, CSS e JavaScript nativos; servidor Node local; sem dependências externas.
- Requisito: preservar identidade visual, priorizar uso em celular e animar suavemente a faixa de palavras.
- Exclusões: deploy, compra/envio externo, auditoria WCAG completa e matriz de dispositivos físicos.

## Plano de execução

| ID | Cenário | Essencial | Esperado | Estado |
| --- | --- | --- | --- | --- |
| QA-001 | Layout 320, 390, 560, 768 e desktop | sim | Sem overflow ou conteúdo cortado; leitura e alvos confortáveis | passou — execução reportada pelo Tech Lead |
| QA-002 | Menu móvel, Escape e âncoras | sim | Abrir/fechar corretamente e foco coerente | passou — execução reportada pelo Tech Lead |
| QA-003 | FAQ e links de camisetas/Instagram | sim | Expandir respostas; destinos preservados | passou — FAQ no navegador pelo Tech Lead; URLs preservadas no diff por QA |
| QA-004 | Faixa animada e pausa | sim | Movimento contínuo, pausa operável e sem duplicação acessível | lógica passou em 3 testes isolados; movimento normal visual não executado |
| QA-005 | Movimento reduzido | sim | Faixa estática e controles coerentes | passou — navegador real pelo Tech Lead e testes isolados por QA |
| QA-006 | Console e imagens | sim | Recursos carregados e sem erros inesperados | passou — execução reportada pelo Tech Lead |

## Referências anteriores e recomendações

A central não contém relatório anterior. `VALIDACAO.md` registra aprovação com ressalvas e verificações estáticas de QA; o navegador havia sido exercitado pelo Tech Lead. As recomendações desta execução foram entregues antes da implementação final: ampliar textos secundários mobile, garantir alvos de toque, reavaliar hero em 560–800px, manter títulos em 320px sem corte, proporções da galeria, foco no destino das âncoras e pausa/movimento reduzido para a faixa.

## Registro inicial

- Lidos AGENTS do especialista, checklist, template, README, VALIDACAO, HTML, CSS, JS, configuração e scripts do projeto.
- Nenhum AGENTS adicional localizado sob `projetos/`.
- Navegador IAB disponível via `cua_repl`, com viewport e inspeção DOM.
- Primeira abertura de `http://127.0.0.1:4173` retornou `net::ERR_CONNECTION_TIMED_OUT`; Tech Lead informado para verificar o servidor.

## Alterações

Não houve alterações no código do projeto-alvo por QA.

## Verificações da implementação disponível

- `node --check script.js`: passou, exit 0.
- `git diff --check`: passou, exit 0; avisos de conversão LF/CRLF não constituem falha.
- `node --version`: v24.19.0.
- Diretório dos comandos: raiz do projeto-alvo.
- Revisão estática: layout em uma coluna até 800px, títulos fluidos, CTAs com 56px, navegação com alvos de 48px, foco enviado ao destino da âncora, grupos iguais na faixa e `translateX(-50%)`, botão de pausa e tratamento de `prefers-reduced-motion` encontrados.
- Movimento reduzido: verificado estaticamente; emulação real não executada (API de viewport disponível não anuncia emulação de mídia).
- Navegador: primeira navegação retornou `ERR_CONNECTION_TIMED_OUT`. A aba de erro foi depois encontrada; a tentativa de vinculá-la foi bloqueada pela política de URL por ser documento `data:` gerado pelo próprio navegador. Nenhuma página do produto foi carregada por QA.
- Screenshots do produto, medidas de overflow, pausa real, menu, FAQ e console: bloqueados/não executados, aguardando acesso local e sinal de versão estável.

## Defeitos confirmados

Nenhum defeito confirmado nas verificações estáticas executadas. A ausência de defeito estático não comprova o resultado visual.

## Próximo passo

Conferir animação e pausa visual em navegador/dispositivo com movimento normal antes da publicação. A avaliação não equivale a certificação WCAG nem teste em dispositivos físicos.

## Retomada em 22/10/2026

- Tech Lead confirmou versão estável e servidor escalonado em `http://127.0.0.1:4173`.
- Nova tentativa de abertura por QA retornou `Browser is not available: iab`. Inventário subsequente de `cua.getState()` retornou `apps: []` e `browsers: []`. Portanto, o bloqueio atual é indisponibilidade da ferramenta de navegador, não um defeito confirmado do site.
- Evidência reportada pelo Tech Lead, não executada por QA: `node scripts/build.mjs` passou com sete arquivos públicos, exit 0; `node --test scripts/server.test.mjs` passou com um teste, zero falhas, exit 0.

## Regressão integrada — evidências do Tech Lead

Com a versão estável, o navegador ficou disponível apenas no contexto do Tech Lead. QA não teve acesso à aba; os resultados abaixo são explicitamente reportados por ele:

| Viewport | clientWidth | scrollWidth | Resultado |
| --- | --- | --- | --- |
| 320 | 305 | 305 | sem overflow |
| 390 | 375 | 375 | sem overflow |
| 560 | 545 | 545 | sem overflow |
| 768 | 753 | 753 | sem overflow |
| 1280 | 1265 | 1265 | sem overflow |

- Hero e camisetas em 320px inspecionados visualmente: legíveis e sem corte; desktop em 1280px preservado.
- Menu abriu; Escape fechou e devolveu foco ao botão.
- Link Camisetas fechou menu e focou `#camisetas`; topo da seção em 100,21px, abaixo do cabeçalho de 76px.
- FAQ de camisetas abriu; estados de `details`: `[false, true, false]`.
- Seis imagens carregadas; logs de aviso/erro vazios.
- `prefers-reduced-motion` real igual a `true`; animação computada `none` e botão de pausa oculto.
- Não houve envio, compra ou revalidação do serviço externo; URLs permanecem inalteradas no diff de HTML.

## Testes isolados executados por QA

Arquivo: [ribbon-behavior.test.mjs](evidencias/ribbon-behavior.test.mjs). Executa o `script.js` real em contexto VM com DOM/matchMedia simulados; sem bibliotecas instaladas ou alteração do produto.

Comando, executado na raiz do workspace:

`node --test 'Analista de Qualidade/relatorios/atletica-unesp-dracena/2026-10-21_23-58-55/evidencias/ribbon-behavior.test.mjs'`

Resultado: exit 0, 3 testes aprovados, 0 falhas, 0 ignorados, duração reportada 80,8412ms.

1. Movimento normal inicia; clique pausa/retoma e atualiza nome acessível.
2. Movimento reduzido inicia estático e reage a mudanças de preferência.
3. Pausa escolhida pelo usuário persiste quando a preferência do sistema é alternada.

Esses testes verificam transições de estado e nomes acessíveis; não verificam motor CSS, velocidade percebida, ciclo visual sem salto ou toque real. A estrutura CSS de duas cópias iguais e translação de metade da largura foi revisada estaticamente.

## Inspeção visual independente da captura

QA abriu com `view_image` a captura salva pelo Tech Lead em `projetos/atletica-unesp-dracena/evidencias/mobile-390.png` (viewport informado 390×844). Hero legível, título sem corte horizontal, CTA principal amplo e menu acessível no cabeçalho. A imagem do mascote continua abaixo da dobra, como conteúdo rolável normal; não há sobreposição de controles nessa captura. A captura não mostra a faixa nem as demais seções, portanto não valida sua aparência.
