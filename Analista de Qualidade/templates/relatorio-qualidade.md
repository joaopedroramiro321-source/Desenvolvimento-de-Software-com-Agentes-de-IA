# Relatório de qualidade — <projeto>

> Modelo: substitua os campos entre `<...>` e remova as instruções antes da entrega.

## Parecer

**<Aprovado no escopo avaliado | Aprovado com ressalvas no escopo avaliado | Reprovado no escopo avaliado | Inconclusivo>**

<Justificativa baseada nas evidências, impacto e limitações.>

## Contexto

- Data, hora e fuso: <...>
- Alvo e caminho ou URL: <...>
- Modo: <auditoria | correção | regressão>
- Branch e commit, se disponíveis: <...>
- Alterações locais pré-existentes: <...>
- Ambiente e versões relevantes: <...>
- Objetivo e requisitos de referência: <...>
- Escopo e exclusões: <...>
- Hipóteses: <...>

## Plano e execução

| ID | Cenário ou verificação | Essencial? | Resultado esperado | Estado | Evidência |
| --- | --- | --- | --- | --- | --- |
| QA-001 | <...> | <sim/não> | <...> | <passou/falhou/bloqueado/não executado/não aplicável> | <link> |

## Registro dos comandos

| Diretório | Comando exato | Código de saída | Resultado e duração, se medida | Evidência sanitizada |
| --- | --- | --- | --- | --- |
| <...> | `<...>` | <código ou indisponível> | <...> | <link> |

<Para testes manuais, documentar passos, ambiente e observações. Informar quantidade de testes apenas se reportada pela ferramenta.>

## Defeitos confirmados

### BUG-001 — <título>

- Prioridade e confiança: <P0/P1/P2/P3; alta/média e justificativa>
- Localização: <arquivo:linha, endpoint ou tela>
- Pré-condições: <...>
- Reprodução:
  1. <...>
  2. <...>
- Esperado: <...>
- Observado: <...>
- Impacto: <...>
- Evidência: <link relativo ao log sanitizado, teste ou captura>
- Recomendação: <ação concreta>
- Reteste, se realizado: <resultado e evidência>

<Repetir por defeito. Se não houver, informar “Nenhum defeito confirmado nas verificações executadas”.>

## Suspeitas, melhorias e bloqueios

| Tipo | Descrição | Impacto na avaliação | Próxima ação |
| --- | --- | --- | --- |
| <suspeita/melhoria/bloqueio> | <...> | <...> | <...> |

## Alterações e regressão

<Listar arquivos modificados pelo agente, motivo e verificação posterior. Se não houve correção, indicar “Não houve alterações no código do projeto-alvo”.>

## Limitações e próximos passos

<Explicitar verificações não executadas, lacunas essenciais e ações prioritárias. A aprovação vale somente para o escopo e versão avaliados.>
