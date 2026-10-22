# Checklist adaptável de qualidade

Selecione conforme o produto e o risco. Classifique cada item selecionado como passou, falhou, bloqueado ou não executado. Marque itens sem pertinência como não aplicáveis, explicando brevemente.

## Preparação

- Objetivo, escopo, critérios de aceitação e ambiente identificados.
- Instruções do projeto, scripts e efeitos colaterais revisados.
- Versões, dependências, serviços e variáveis necessárias identificados, sem divulgar segredos.
- Estado inicial do Git e alterações locais registrados, quando disponíveis.
- Dados de teste e contas de teste adequados; produção separada dos testes.

## Comportamento e dados

- Inicialização, build e operação básica.
- Jornadas essenciais completas, com resultado final conferido.
- Regras de negócio e cálculos, incluindo limites, precisão e arredondamento.
- Entradas ausentes, inválidas, duplicadas e fora dos limites.
- Persistência, consistência e tratamento de operações parciais.
- Concorrência, reenvio e idempotência quando relevantes.
- Datas, fusos, idioma e codificação quando relevantes.

## APIs e integrações

- Contratos, status HTTP e mensagens de erro.
- Autenticação, autorização por recurso e isolamento entre usuários.
- Paginação, filtros, ordenação e limites.
- Timeout, indisponibilidade de dependências e novas tentativas.
- Integração real diferenciada dos testes com mocks.

## Interfaces

- Navegação, formulários, submissão e feedback.
- Estados de carregamento, vazio, sucesso e erro.
- Responsividade e ausência de conteúdo cortado.
- Navegação por teclado, foco visível, rótulos e semântica.
- Contraste e texto alternativo quando verificáveis.
- Console e requisições sem erros inesperados.
- Sessão expirada e acesso direto às rotas.

## Segurança e confiabilidade

- Validação nas fronteiras de confiança.
- Segredos expostos no código, logs ou resposta, sem copiar seus valores.
- Permissões mínimas e operações sensíveis protegidas.
- Injeção, XSS e outros riscos pertinentes revisados no código ou em ambiente autorizado.
- Dependências vulneráveis: confirmar versão e aplicabilidade do alerta; não aplicar upgrade automático.
- Logs úteis sem dados sensíveis.

## Engenharia e desempenho

- Testes existentes, lint, análise de tipos e build aplicáveis.
- Testes com asserts significativos e regressões relevantes.
- Falhas intermitentes registradas; uma repetição bem-sucedida não apaga a falha.
- Consultas redundantes, paginação ausente e operações custosas investigadas quando houver evidência.
- Medições de desempenho incluem ambiente, método e limites; não inferir desempenho de produção a partir de uma única execução local.

## Encerramento

- Evidências correspondem à versão avaliada.
- Defeitos, suspeitas, melhorias e bloqueios separados.
- Parecer compatível com a criticidade e as verificações essenciais.
- Arquivos alterados e processos iniciados contabilizados.
- Próximos passos concretos e relatório acessível.
