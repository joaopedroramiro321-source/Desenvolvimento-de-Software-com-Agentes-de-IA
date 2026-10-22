# Auditoria de segurança — Atlética UNESP Dracena

Data: 20/10/2026, 17h36 (America/Sao_Paulo). Ambiente: Windows, Node.js v24.19.0.

Alvo: `C:/Users/João Pedro/Desktop/Projetos com Codex/projetos/atletica-unesp-dracena`. Não há commit de referência; projeto local novo. Auditoria sem alterações no alvo.

## Parecer

Sem vulnerabilidades confirmadas no escopo de código e execução local examinados. Triagem final: 8 arquivos analisados, 0 suspeitas, sem truncamento. Isso não comprova ausência absoluta de vulnerabilidades. A implantação Vercel ainda não foi realizada e seus cabeçalhos efetivos precisam ser verificados após publicação.

## Cobertura e arquitetura

- Página HTML/CSS/JavaScript estática, quatro imagens locais; nenhuma dependência npm declarada.
- Navegação externa exclusivamente para Instagram e Google Forms fornecidos pelo usuário. Links de nova aba usam `noopener noreferrer`.
- Sem API, autenticação, banco, pagamentos locais, cookies, localStorage, analytics, embeds ou entrada de usuário renderizada como HTML.
- JavaScript do menu usa `textContent`, atributos e classes; não há avaliação dinâmica nem inserção de HTML.
- Scripts Node de preview/build, manifesto, configuração Vercel, HTML, CSS, JavaScript, README e `.gitignore` revisados.
- CSP restringe scripts, estilos, imagens e fontes à origem; proíbe conexões, objetos, formulários e enquadramento. Configuração inclui nosniff, política de referrer, X-Frame-Options e restrição de câmera/microfone/geolocalização.
- Servidor vinculado a 127.0.0.1, lista de caminhos permitidos e verificação de caminho real. GET/HEAD apenas; erros não revelam stack ou caminhos internos.
- Build publica somente arquivos principais e imagens/fontes permitidas, verifica links simbólicos nos pontos de entrada e restringe a remoção à pasta dist do projeto. Não oferece defesa contra um atacante local que altere arquivos concorrentemente; esse cenário não foi solicitado nem exercitado.
- dist contém exatamente sete arquivos públicos, byte a byte equivalentes às fontes por SHA-256, sem documentos de projeto, evidências, scripts ou configurações.

## Evidências e verificações

| Caso / comando | Resultado |
| --- | --- |
| `node src/cli.mjs "C:\Users\João Pedro\Desktop\Projetos com Codex\projetos\atletica-unesp-dracena" --out reports/atletica-unesp-dracena-2026-10-20` na central Cybersegurança | Passou, exit 0; 8 arquivos, 0 suspeitas. Relatório final `triagem-2026-10-20T20-35-58.457Z-4f7ca121.md` e JSON correspondente. |
| `node --test ../projetos/atletica-unesp-dracena/scripts/server.test.mjs` na central | Primeira tentativa bloqueada por EACCES de rede do sandbox. Reexecução fora da restrição autorizada passou, exit 0, 1 teste / 0 falhas. |
| Casos HTTP desse teste | Imagem 200 com MIME correto e headers; README/package/config/scripts/traversal/inexistente 404; URL malformada 400; POST 405; HEAD 200. |
| Execução de `publicFiles(projectRoot)` | Sete arquivos públicos: index.html, styles.css, script.js e quatro imagens. |
| Inspeção recursiva de dist e comparação SHA-256 de cada arquivo com a fonte | Passou, sete arquivos idênticos às fontes. Build executado pelo Tech Lead; auditoria não recriou a saída. |

Infraestrutura permaneceu com os mesmos hashes entre leitura inicial e inspeção final:

- scripts/server.mjs: `D087C8FECB32DA28E73F70A876457B4A92FC42A354EFD8B9C3FA325DB1BD7FC9`
- scripts/build.mjs: `574BC07859309B3D36DCC6EFEC469C394EB741A58379C1BB7EF504198B5B2D84`
- vercel.json: `A0EF312919CEAAF54239169B6B8B16CFCF408AE0192840FE3BB84461C2B20658`

## Limitações e próximos passos

- Sem testes invasivos, compras, envios ou avaliação da segurança de Instagram/Google Forms. A aplicação apenas encaminha o visitante a esses serviços.
- Sem deploy: confirmar HTTPS, CSP e demais headers na URL definitiva. A validação local não comprova configuração efetiva da hospedagem.
- Não há dependências de terceiros declaradas para auditar; não foi realizada pesquisa de CVEs do runtime Node ou da infraestrutura Vercel.
- Links simbólicos foram revisados no código; não foram criados fixtures de symlink para teste dinâmico.
- Inspeção visual, responsividade e acessibilidade são responsabilidade da avaliação QA/Tech Lead, fora deste parecer.
- Preservar a ausência de dados privados em assets e revisar CSP/lista pública ao incorporar novas integrações.
