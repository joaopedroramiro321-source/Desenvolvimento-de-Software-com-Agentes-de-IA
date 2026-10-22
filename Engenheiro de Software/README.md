# Engenheiro de Backend

Workspace de João Pedro para desenvolver projetos de backend com um agente configurado
no Codex.

O comportamento do agente está definido em [AGENTS.md](AGENTS.md). Ele orienta
o Codex a entender o pedido, implementar, testar, revisar e documentar a entrega.
O foco é exclusivo em APIs, regras de negócio, bancos de dados, autenticação,
autorização, integrações e serviços. Telas, layouts e componentes frontend
ficam fora do escopo; o agente fornece contratos para sua integração.
O agente usa o modelo, as ferramentas e as permissões da sessão do Codex.
Este repositório não instala um programa independente nem um serviço em segundo plano.

## Como usar

Abra esta pasta como projeto no Codex e inicie uma conversa. Para conferir a
configuração, peça: “Leia o AGENTS.md e resuma suas regras de trabalho”.

Depois descreva o que deseja construir, por exemplo:

> Crie em projetos/controle-de-estoque uma API de estoque para minha loja.
> Preciso cadastrar produtos, registrar entradas e saídas e consultar saldo,
> com autenticação e persistência em banco de dados.
> Escolha a stack, documente os endpoints e valide os fluxos. Não crie frontend.

Outros pedidos possíveis:

- “No projeto X, investigue e corrija este erro: ...”
- “Continue o projeto X a partir do CONTEXTO.md e valide o que falta.”
- “Revise o projeto X procurando bugs e acrescente testes para os encontrados.”
- “Implemente um webhook com validação de assinatura e processamento idempotente.”

Se souber, informe as regras de negócio, os consumidores da API, as integrações,
as restrições e o volume esperado. Você não precisa escolher tecnologias
antecipadamente.

## Estrutura

```text
AGENTS.md              Instruções persistentes do agente
PROJETOS.md            Catálogo de projetos e caminhos
templates/CONTEXTO.md  Modelo para continuidade entre sessões
projetos/              Projetos criados neste workspace
```

Cada projeto terá suas dependências e comandos documentados no próprio README.
Não há instalação de dependências necessária para esta configuração.

Para trabalhar em outro repositório, leve as orientações pertinentes para o
`AGENTS.md` desse repositório, preservando suas regras existentes. As instruções
desta pasta não se aplicam automaticamente a todos os seus projetos no computador.

## Integrações

O agente está orientado a usar Supabase, Vercel, Stripe e GitHub nos trabalhos
de backend, com autorização ampla de acesso concedida por João Pedro.

Em 20/10/2026, os quatro plugins foram verificados como instalados e habilitados,
todos com a configuração **Permitir todas as ações**. Não foi necessário alterar
essas permissões.

Essa verificação confirma a configuração dos plugins, não o acesso administrativo
a todas as contas, organizações, projetos ou repositórios. O acesso ao recurso
específico será conferido durante cada trabalho. As ferramentas disponíveis e
os escopos concedidos pela plataforma continuam determinando o que é possível.

Informe o projeto ou repositório de destino e o ambiente quando iniciar um
trabalho. O agente registra esses identificadores no contexto, sem salvar segredos.

## Funcionamento e verificação

O Codex descobre `AGENTS.md` ao iniciar a sessão. Após modificar esse arquivo,
inicie uma nova conversa para conferir seu carregamento. Veja a
[documentação oficial](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

`PROJETOS.md` e `CONTEXTO.md` são registros mantidos durante o trabalho. Não
substituem a inspeção do código nem garantem memória automática fora da pasta.

A validação inicial desta configuração consiste em revisar os arquivos,
conferir os caminhos e pedir ao Codex que resuma as instruções em uma nova sessão.
Testes de aplicação serão definidos quando o primeiro projeto for criado.
