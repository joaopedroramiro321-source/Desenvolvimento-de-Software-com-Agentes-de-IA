# Analista de Qualidade

Agente de QA configurado para trabalhar pelo Codex neste repositório. As instruções estão em [AGENTS.md](AGENTS.md): ele identifica a tecnologia do projeto, planeja verificações por risco, executa os testes disponíveis e produz um relatório com evidências.

## Como usar

Abra esta pasta como projeto no Codex e inicie uma conversa indicando o alvo:

```text
Analise e teste o projeto em "C:\caminho\meu-projeto".
Verifique os fluxos principais e gere um relatório de qualidade.
```

Outros exemplos:

```text
Avalie a interface em http://localhost:3000.
Priorize cadastro, login e acessibilidade.
```

```text
Analise o repositório <URL do repositório> na branch <branch>.
Priorize a API e os testes de integração.
```

```text
No projeto "C:\caminho\meu-projeto", corrija os problemas confirmados
P1 e P2 do relatório <caminho do relatório> e execute a regressão.
```

Se esta conversa já estiver aberta antes da criação dos arquivos, você pode pedir: “Leia o AGENTS.md desta central e avalie o projeto em <caminho>”.

## Modos

| Modo | Entrega |
| --- | --- |
| Auditoria — padrão | Análise, verificações e relatório; preserva o código do alvo. |
| Correção — mediante pedido | Correções focadas, testes pertinentes e relatório atualizado em nova execução. |
| Regressão | Revalidação dos problemas e dos fluxos afetados por uma mudança. |

## O que pode avaliar

Aplicações web, APIs, bibliotecas, scripts e outros projetos, conforme as ferramentas disponíveis. O agente adapta os checks ao projeto: revisão de código, lint, tipos, testes unitários e de integração, build, fluxos de interface, autorização, erros, acessibilidade e desempenho.

Uma avaliação exige acesso ao alvo e às ferramentas necessárias. Aplicativos móveis ou desktop podem precisar de emulador, dispositivo ou ferramentas específicas. Se houver somente uma URL, a análise se limita ao comportamento acessível. Testes que não puderem ser executados aparecem como bloqueados ou não executados.

## Estrutura e resultados

```text
AGENTS.md                         Instruções do agente
checklists/qualidade.md            Referência para planejar verificações
templates/relatorio-qualidade.md   Modelo de relatório
relatorios/                       Histórico local das avaliações
```

Cada avaliação gera `relatorios/<projeto>/<data_hora>/relatorio.md`, com evidências na mesma pasta. Relatórios ficam fora do versionamento por padrão, pois podem conter informações dos projetos avaliados; revise antes de compartilhar.

Esta configuração é executada pelo Codex quando você solicita uma avaliação. Não instala um serviço em segundo plano nem inicia avaliações automaticamente. Não precisa de uma chave de API adicional para estes arquivos de instrução; usa a sessão e as ferramentas disponíveis no Codex.

A configuração usa o mecanismo oficial de [instruções por AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md). Os arquivos desta central não configuram automaticamente conversas abertas em outras pastas.
