# Roteiro de auditoria contextual

## Entrada e inventário

Registre caminho/commit, ambiente, dono, superfícies autorizadas e exclusões.
Identifique stack pelos manifestos e lockfiles; faça diagrama simples de entrada,
autenticação, API, banco, filas e integrações. Separe o que foi observado do que
foi inferido. Leia arquivos de configuração sem divulgar segredos.

## Revisão e testes

| Área | Revisão | Teste de regressão proposto |
|---|---|---|
| Autorização | Verificação no servidor, dono do recurso e tenant | Usuário A não lê/altera recurso de B; anônimo recebe 401/403 |
| Autenticação | Expiração, rotação, reset e revogação | Token expirado, sessão revogada e reset reutilizado são rejeitados |
| Injeção | Entrada até banco, shell, template ou interpretador | Entrada especial é tratada como dado, sem alterar consulta/comando |
| XSS | Origem do HTML e sanitização | Conteúdo controlado é escapado e não executa script |
| SSRF | Destinos, DNS e redirecionamentos | Destino fora da allowlist é rejeitado antes de realizar a conexão |
| Arquivos | Canonicalização, extensão, MIME, tamanho, localização | Traversal, symlink e upload acima do limite são rejeitados |
| Sessões/CSRF | Cookies e operações autenticadas que alteram estado | Origem/token inválido é rejeitado sem efeito colateral |
| Dados | Minimização, logs, erros e respostas | Respostas e logs não contêm senha, token ou dados de outro usuário |
| Abuso | Limites e idempotência | Requisições repetidas em teste local respeitam limite e não duplicam operação |
| Infraestrutura | Privilégios, portas, imagens, volumes e pipeline | Configuração não expõe serviços internos nem credenciais |

Execute testes somente após inspecionar comandos e dependências e preparar
ambiente isolado com dados fictícios. Scripts de build/teste são código do alvo.
Prefira testes focados no caminho vulnerável. Não use carga em produção.
Registre inclusive falhas de ambiente e testes não executados.

## Dependências

Use o auditor adequado à stack quando instalado e autorizado: npm/pnpm audit,
pip-audit, cargo audit, govulncheck, dotnet list package --vulnerable, ou scanners
equivalentes. Inspecione a versão da ferramenta e suas opções antes da execução.
Consultas externas podem enviar nomes/versões dos pacotes; não envie código
privado desnecessariamente. Não instale ferramentas automaticamente na máquina.
Sem fonte atual e versão afetada confirmada, não atribua CVE.

## Entrega

Produza o relatório contextual a partir de `docs/relatorio-template.md`.
Os arquivos `triagem-*.md/json` são insumos automatizados. Não transforme todos
os resultados da triagem em vulnerabilidades. Explique falsos positivos e lacunas.
