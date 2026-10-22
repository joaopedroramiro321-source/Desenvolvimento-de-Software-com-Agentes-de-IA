# Desenvolvimento de Software com Agentes de IA

Ambiente de desenvolvimento organizado com cinco agentes de inteligência artificial no Codex: um **Tech Lead**, responsável pela coordenação, e quatro agentes especializados em **Back-end, Front-end, Cibersegurança e QA**.

O projeto centraliza a interação do usuário no Tech Lead, que distribui as tarefas entre os especialistas e coordena suas contribuições ao longo do desenvolvimento.

## Objetivo

Explorar a aplicação de agentes de IA no desenvolvimento de software, utilizando divisão de responsabilidades, documentação estruturada e manutenção de contexto para organizar o trabalho.

A proposta é apoiar diferentes etapas de um sistema, desde o planejamento técnico até a implementação, revisão de segurança e validação de qualidade.

## Organização dos agentes

| Agente | Responsabilidade |
|---|---|
| **Tech Lead** | Interpretar as solicitações, planejar o trabalho, distribuir tarefas e coordenar as entregas. |
| **Back-end** | Desenvolver a lógica de negócio, APIs, integrações e acesso a dados. |
| **Front-end** | Desenvolver interfaces, organizar componentes e integrar a experiência do usuário ao back-end. |
| **Cibersegurança** | Revisar aspectos de segurança e identificar riscos nas implementações. |
| **QA** | Validar requisitos, identificar falhas e apoiar os testes de qualidade. |

## Estrutura do projeto

A organização abaixo representa a estrutura lógica do ambiente. Os nomes das pastas podem variar conforme a configuração utilizada.

```text
projeto/
├── AGENTS.md
├── CONTEXT.md
├── MEMORY.md
├── backend/
│   ├── AGENTS.md
│   ├── CONTEXT.md
│   └── MEMORY.md
├── frontend/
│   ├── AGENTS.md
│   ├── CONTEXT.md
│   └── MEMORY.md
├── cyber/
│   ├── AGENTS.md
│   ├── CONTEXT.md
│   └── MEMORY.md
└── qa/
    ├── AGENTS.md
    ├── CONTEXT.md
    └── MEMORY.md
```

O agente Tech Lead fica na pasta principal. Cada especialista possui uma subpasta com sua própria documentação.

## Documentação dos agentes

Elaborei os arquivos **AGENTS.md**, **CONTEXT.md** e **MEMORY.md** de todos os agentes, com foco em organização profissional, clareza de responsabilidades e boas práticas de engenharia de software.

### AGENTS.md

Define as instruções de atuação de cada agente, incluindo suas responsabilidades, padrões de trabalho e orientações para execução das tarefas.

### CONTEXT.md

Reúne o contexto necessário para o trabalho, como objetivos, requisitos, restrições e informações técnicas relevantes ao projeto.

### MEMORY.md

Registra decisões, progresso e pendências para apoiar a continuidade do trabalho entre sessões.

Esses arquivos fornecem uma base explícita para orientar os agentes. Sua consulta e atualização dependem das instruções e do fluxo de execução configurados.

## Fluxo de trabalho

1. O usuário apresenta uma demanda ao **Tech Lead**.
2. O Tech Lead interpreta os requisitos e organiza as tarefas.
3. As atividades são direcionadas aos agentes especializados.
4. Os especialistas executam suas responsabilidades e reportam resultados.
5. O Tech Lead coordena a integração das contribuições e os ajustes necessários.
6. O contexto e as decisões são registrados para apoiar as próximas etapas.

## Exemplo de solicitação

> Desenvolva um sistema de controle financeiro com cadastro de entradas e saídas. Organize as tarefas de back-end e front-end, solicite uma revisão de segurança e coordene a validação dos requisitos com o agente de QA.

O Tech Lead utiliza essa demanda como ponto de partida para planejar e coordenar o trabalho dos especialistas.

## Como utilizar

1. Disponibilize a estrutura de pastas no ambiente de trabalho do Codex.
2. Revise os arquivos de instruções de cada agente.
3. Preencha o contexto com os requisitos e as tecnologias do sistema que será desenvolvido.
4. Configure a execução e a delegação entre os agentes conforme o ambiente utilizado.
5. Inicie a interação pelo agente Tech Lead na pasta principal.
6. Acompanhe as entregas e mantenha a documentação atualizada.

**A estrutura de pastas, por si só, não executa nem conecta os agentes.** A coordenação depende da configuração do Codex e das instruções utilizadas no ambiente.

## Competências aplicadas

- Orquestração de agentes de inteligência artificial.
- Engenharia de contexto e elaboração de instruções.
- Documentação técnica.
- Planejamento e distribuição de tarefas.
- Organização de fluxos de desenvolvimento de software.
- Integração de implementação, segurança e qualidade.

## Aprendizados

O projeto permitiu explorar como a especialização de agentes e a documentação de responsabilidades podem apoiar a organização do desenvolvimento de software.

Também reforçou a importância de manter contexto, decisões e critérios de validação explícitos. As entregas dos agentes precisam ser revisadas e testadas para verificar se atendem aos requisitos do sistema.

## Autor

**João Pedro Ramiro**

- [GitHub](https://github.com/joaopedroramiro321-source)
- [LinkedIn](https://www.linkedin.com/in/joaopedroramiro/)
