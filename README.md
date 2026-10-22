# Tech Lead e equipe de desenvolvimento

O ponto de entrada da equipe é esta pasta, **Projetos com Codex**.
O [AGENTS.md](AGENTS.md) define o Tech Lead: ele recebe seu pedido, planeja,
distribui tarefas aos especialistas, integra as entregas e apresenta o resultado.
Você conversa com o Tech Lead na conversa principal.

## Como usar

Abra esta pasta principal no Codex e inicie uma conversa. Como a descoberta de
instruções ocorre no início da sessão, para usar em uma conversa já aberta peça:

> Leia o AGENTS.md da pasta principal e atue como meu Tech Lead.

Depois descreva o que deseja:

> Planeje um sistema de estoque para minha loja. Defina o MVP, a arquitetura
> e as etapas de implementação.

> Construa o sistema conforme o plano e coordene os especialistas necessários.

> No projeto X, investigue a lentidão, implemente melhorias e valide o resultado.

> Continue o projeto X a partir do contexto e resolva as pendências.

Pedidos de planejamento permanecem em planejamento; pedidos de construção
incluem implementação e validação. Você não precisa escrever briefings individuais.

## Equipe

| Papel | Configuração |
| --- | --- |
| Tech Lead | [AGENTS.md](AGENTS.md) |
| Backend | [Engenheiro de Software/AGENTS.md](<Engenheiro de Software/AGENTS.md>) |
| Front-end | [Front-end/AGENTS.md](Front-end/AGENTS.md) |
| Qualidade | [Analista de Qualidade/AGENTS.md](<Analista de Qualidade/AGENTS.md>) |
| Cybersegurança | [Analista de Cybersegurança/AGENTS.md](<Analista de Cybersegurança/AGENTS.md>) |

O Tech Lead usa subagentes da sessão com as instruções desses especialistas.
Coordena as dependências e evita edições simultâneas nos mesmos arquivos.
Os relatórios retornam à conversa principal. Os especialistas existentes
continuam disponíveis para uso direto em suas próprias pastas.

## Projetos e memória de trabalho

Novos sistemas coordenados pelo Tech Lead ficam em `projetos/<nome>/`, criada
quando houver um pedido de implementação, ou no destino que você indicar.
Projetos existentes permanecem em seus locais.

- [PROJETOS.md](PROJETOS.md): catálogo de sistemas coordenados.
- `PLANO.md` no sistema: etapas, responsáveis, critérios de aceite e progresso.
- `CONTEXTO.md` no sistema: decisões, comandos, verificações e pendências.

Os dois últimos registros são criados conforme a dimensão do trabalho.
Eles ajudam a retomar uma sessão, mas precisam ser conferidos contra o código.

## Funcionamento

Esta configuração usa as ferramentas e permissões da sessão do Codex; não exige
instalar um novo runtime. A delegação depende da disponibilidade de subagentes.
Se indisponíveis, o Tech Lead informa isso e executa os papéis sequencialmente.
Não há serviço em segundo plano nem mudança de permissões globais.

Referências oficiais:
[instruções por AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
e [subagentes](https://learn.chatgpt.com/docs/agent-configuration/subagents).
