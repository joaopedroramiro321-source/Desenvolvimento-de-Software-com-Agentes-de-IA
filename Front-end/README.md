# Agente de engenharia front-end

Este workspace configura o Codex para trabalhar como seu engenheiro de front-end. A definição está em [AGENTS.md](AGENTS.md): design, implementação, integração com APIs, acessibilidade, responsividade e validação.

O agente atua durante as conversas do Codex, com as ferramentas e permissões disponíveis. Não é um processo executando em segundo plano. Esta configuração não exige uma aplicação própria nem uma chave de API adicional.

## Como usar

Abra esta pasta no Codex e inicie uma conversa com o pedido do projeto. Em uma nova sessão, o Codex descobre as instruções do `AGENTS.md`. Para conferir, peça: “Resuma as instruções de front-end carregadas neste projeto”.

Exemplo:

> Crie em projetos/painel-financeiro um dashboard financeiro para pequenos negócios, com visão geral, receitas, despesas e filtros por período. Quero uma interface sóbria, responsiva, em português. Use dados demonstrativos isolados, pois ainda não tenho uma API. Implemente e valide o fluxo principal.

Para continuar:

> No painel financeiro, implemente o formulário de nova despesa, com validação, categorias e atualização do saldo. Preserve o estilo existente.

Você pode fornecer uma ideia curta, imagens de referência, requisitos ou um projeto existente. O [briefing opcional](templates/BRIEFING.md) ajuda a descrever trabalhos maiores.

## Organização

```text
AGENTS.md                Instruções do agente
README.md                Como usar
templates/BRIEFING.md     Modelo opcional de pedido
projetos/                Destino dos produtos criados aqui
```

Cada produto deve ter suas próprias dependências, comandos de execução e documentação. A pasta `projetos/` será criada no primeiro pedido de produto.

## Usar em outro repositório

Copie o `AGENTS.md` para a raiz do projeto de destino e, se desejar, o modelo de briefing. Se já houver instruções, combine os trechos relevantes sem sobrescrevê-las. Ajuste a regra de destino `projetos/<nome-do-projeto>/` à organização daquele repositório. Abra o projeto de destino em uma nova conversa do Codex.

As instruções desta pasta não são instaladas globalmente e não passam a valer automaticamente em todos os seus outros repositórios.

## Estado inicial

Foi criada a configuração do agente. Ainda não há um produto front-end, dependências de aplicação ou testes executáveis. A pasta não tinha Git inicializado na criação desta configuração.

Referência: [documentação oficial sobre AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
