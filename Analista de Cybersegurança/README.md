# Analista de Cybersegurança

Agente em português para auditar seus projetos: triagem estática, revisão
contextual, planejamento de testes e recomendações com evidências.

## Usar neste projeto pelo Codex

Abra este repositório no Codex e envie:

> Analise o projeto em C:\Projetos\meu-app. Faça a triagem, revise os achados
> com contexto e gere um relatório. Inspecione os scripts antes de executar
> testes locais isolados. Não altere o código.

O `AGENTS.md` carrega o procedimento do analista. Para implementar correções,
inclua essa solicitação. Para testes em uma aplicação online, indique o endereço,
o ambiente e quais testes estão autorizados. Acesso a pastas externas continua
sujeito às permissões do Codex.

## Triagem local, sem IA ou instalação de pacotes

Requer Node.js 24 ou superior:

```powershell
node src/cli.mjs "C:\Projetos\meu-app"
node src/cli.mjs "C:\Projetos\meu-app" --out reports --fail-on-findings
node --test
```

Gera relatórios Markdown e JSON em `reports/`, com localização, CWE,
severidade sugerida e correção. Não grava no projeto analisado, não faz
requisições de rede e não executa seu código. Não escolha o alvo como pasta
de saída se quiser mantê-lo sem alterações.

Exit codes: `0` triagem concluída; `1` suspeitas encontradas quando
`--fail-on-findings` está ativo; `2` erro operacional ou cobertura interrompida
por limites/arquivos ilegíveis. Exclusões normais e binários são descritos no relatório.

## Agente independente com Eve

Requer Node.js 24+, pnpm e conexão com um modelo. As dependências estão fixadas
no `pnpm-lock.yaml`.

```powershell
pnpm install --frozen-lockfile
$env:CYBER_PROJECT_ROOT = "C:\Projetos\meu-app"
pnpm dev
```

No terminal do Eve, use `/login` para conectar sua conta/provedor e peça a auditoria.
O modelo inicial usa um identificador de AI Gateway, configurável em
`agent/agent.ts`. Não salve credenciais no repositório.

Se você só tiver o Node disponibilizado pelo Codex e não tiver `pnpm` no PATH,
a triagem e os testes funcionam pelos comandos `node` acima; com dependências já
instaladas, inicie o agente com `node node_modules/eve/bin/eve.js dev`.

O modo independente disponibiliza duas ferramentas: `scan_project` e
`read_project_file`. Só acessam a raiz definida em `CYBER_PROJECT_ROOT`.
Ferramentas padrão de shell, rede e escrita ficam desativadas. Ele não executa
testes dinâmicos nesta versão; esse fluxo está documentado para execução no Codex.
Trechos de código lidos serão enviados ao provedor do modelo. A redação de
segredos é heurística: use uma cópia sanitizada de projetos confidenciais.
Use uma cópia estável do projeto; o leitor não é uma sandbox contra alterações
concorrentes maliciosas. Não exponha esse processo local como serviço público.

## Cobertura e limites

O scanner identifica seis classes de padrões: possíveis credenciais/chaves,
TLS desabilitado, avaliação dinâmica, inserção de HTML e execução com shell.
São **suspeitas**, sujeitas a falsos positivos e falsos negativos.
Não faz análise de fluxo, não consulta CVEs nem lê histórico Git.
Revisão contextual pode abranger outras stacks e riscos usando o roteiro.

Exclui dependências, builds, `.git`, `.aws`, `.ssh`, relatórios e links/junctions.
Lê arquivos de texto suportados de até 512 KiB, até 5.000 arquivos/20.000 entradas,
profundidade 40 e até 1.000 achados. Limites aparecem no relatório.
`.env` pode ser examinado localmente por padrões, mas seu conteúdo não é exposto
pela ferramenta de leitura do modelo. Extensões não suportadas não são analisadas.
A resposta da triagem ao modelo é resumida a 300 arquivos e 100 achados; use o
CLI para obter o relatório completo. Isso não certifica a segurança do projeto.

## Arquivos principais

- `AGENTS.md`: entrada do agente no Codex.
- `agent/instructions.md`: identidade, procedimento e formato do relatório.
- `agent/tools/`: ferramentas do agente Eve.
- `src/`: scanner e CLI locais sem dependências externas.
- `docs/roteiro-auditoria.md`: revisão e testes por área.
- `docs/relatorio-template.md`: relatório contextual.
- `tests/`: testes de limites, isolamento de caminhos, redação e CLI.

Validação: `node --test`, `pnpm check` e `pnpm exec eve info`.
Configuração do runtime baseada na [documentação do Eve](https://eve.dev/docs).
