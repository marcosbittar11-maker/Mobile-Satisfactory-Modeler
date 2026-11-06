# Factory Flow v0.4.19 — relatório técnico

## Estado e recomendação

Candidata implementada e testada em Chromium. Recomendo revisão do PR e homologação em Safari/iPhone antes de integrar à versão publicada. Não houve merge, publicação Pages ou alteração de configuração de deploy. A tradução dos itens foi revisada com fontes secundárias; não é certificada como tradução oficial integral. Títulos de receitas sem evidência específica ficam no original, em vez de traduções inventadas.

## Base e preservação

Base principal: anexo Factory_Flow_v0.4.18_Offline.html, 420382 bytes, SHA-256 `f32a6f80f7916f82897de3cd6ad2b303a3254871ca592b93fff3dd6fb51530dc`.
Main consultada: `b5ada98406bc364dd1455c9546568a526a15133c`, v0.4.17. A branch incorpora a v0.4.18, não uma reconstrução sobre a v0.4.17. O catálogo em execução tem 172 itens e 308 receitas. IDs, taxas, conexões, formatos JSON e fórmulas de cálculo não foram alterados pela atualização desktop/localização.

O Git pelo terminal não alcançou o proxy. Os arquivos de texto foram obtidos pelo conector GitHub e versionados em snapshot local; o commit remoto usa a main verdadeira como pai e a árvore original como base, preservando inclusive arquivos binários que não foram baixados. A árvore main consultada não contém manifest, service worker, index.html nem workflows. Nenhum foi criado ou substituído. Eventuais configurações externas de Pages não foram alteradas.

## Alterações

- Traduções dos 172 itens agora associadas por chave estável; máquinas por nome original estável. Inglês original e modelos existentes preservados.
- Aluminum Casing: Carcaça de Alumínio; Alclad Aluminum Sheet: Chapa de Alumínio. Sinônimos obrigatórios mantidos na pesquisa, em ambos os idiomas.
- Removida tradução heurística de palavras isoladas em receitas, que produzia títulos híbridos. Receitas com nome exato de item reutilizam seu rótulo; demais conservam o original. A revisão editorial e o inventário completo estão em `localizacao-v0.4.19.md` e `catalogo-auditado-v0.4.19.json`.
- Catálogo desktop com pesquisa, filtros, inserção por clique e suporte a drag/drop; inspetor com o mesmo formulário e a mesma validação usados no mobile; resumo quando não há seleção individual.
- Desktop exige largura >=1024, altura >=560 e ponteiro fino. Em 1366×768 sobram 776 px centrais com painéis padrão. Em tablet >=651 px/altura >=500, botões do cabeçalho abrem um painel por vez. Em telas menores a navegação mobile permanece.
- Painéis desktop recolhíveis; alças redimensionáveis por mouse ou setas. Estado de layout fica fora do projeto. Formulário do inspetor só é reconstruído quando seleção/dados/idioma mudam, não a cada movimento de câmera. Eventos são instalados uma vez, com delegação nos catálogos.
- Reconectar portas já ligadas agora é idempotente. A v0.4.18 apagava a conexão; o teste antigo reproduziu esse defeito antes da correção. A remoção explícita permanece pelo editor da ligação.
- Corrigida descrição de fontes que prometia configuração de extratoras ausente na própria v0.4.18. Preservada a migração intencional v0.4.18 de extratoras antigas para vazão fixa equivalente.
- Nomes do usuário escapados e excluídos da tradução automática no inspetor. Campos de texto mantêm prioridade sobre atalhos de exclusão e navegação.

## Controles

Roda: zoom ancorado no cursor; arraste no fundo: pan; Espaço + arraste: pan mesmo sobre nós; Shift/Ctrl/Cmd + clique: alternar nó na seleção; F: enquadrar fábrica; Shift+F: centralizar seleção sem mudar zoom. Campos de edição e modais não recebem esses atalhos globais. Ctrl/Cmd+Z, Shift+Z/Y, C, V, A e Delete/Backspace preservam os comportamentos existentes fora dos campos. Nos tablets, ＋ e ⚙ do cabeçalho alternam catálogo e inspetor. Modais de ferramentas continuam disponíveis.

## Testes executados

Browser plugin não disponível; usado Playwright com Chromium instalado `/usr/bin/chromium`, HTTP em 127.0.0.1 e recursos externos bloqueados. `file://` foi bloqueado pela política do navegador (`ERR_BLOCKED_BY_ADMINISTRATOR`). O HTML foi também inicializado por `setContent` com rede desativada desde o início e executou normalmente; isso comprova independência de rede, mas não substitui abertura pelo app Arquivos do iPhone.

Comandos reproduzíveis (Playwright e Chromium precisam estar disponíveis no ambiente de teste):

```sh
CHROMIUM_PATH=/usr/bin/chromium node tests/run.js
node tests/v0.4.19.js /caminho/Factory_Flow_v0.4.18_Offline.html
```

A suíte original de main sobre a v0.4.18 deu 21/26. Sobre a primeira candidata deu 22/26 após corrigir reconexão. Quatro expectativas antigas foram atualizadas com justificativa: energia do fixture era 96,6 MW com extratoras físicas na v0.4.17 e já era 81,60000010523345 MW na v0.4.18; duas verificações de extratoras foram substituídas por testes da migração/fonte manual vigente; resumo passou a aceitar os cabeçalhos localizados e não exigir Miner Mk.2 removido pela base. A suíte atualizada passou **26/26**. Não alteramos fórmulas para satisfazer os testes antigos.

| Comparação idêntica v0.4.18 × v0.4.19 | Resultado |
|---|---|
| Oferta limitada, máquinas planejadas e produção real | Diferença numérica zero; 4 máquinas planejadas, só 20 placas/min com 30 minério/min |
| Excedente distribuído para vários consumidores | Diferença zero |
| Clock 150% com Somersloop | Diferença zero |
| Água de retorno em Alumina Solution/Aluminum Scrap | Diferença zero |
| Gerador com carvão limitado | Diferença zero; meta 300 MW, geração real 75 MW |
| Fixture JSON antigo | Energia idêntica 81,60000010523345 MW |

As comparações verificam máquinas, construção, entradas reais/necessárias, saídas, potência e geração de cada nó. O relatório JSON registra números completos das duas versões. Testes existentes também cobrem reciclagem de plástico/borracha, prioridade/proporções de divisores, outposts, modelos, alertas, geradores e undo de arraste em grupo.

Testes novos: inserção por clique no catálogo, formulário inline, meta de máquinas, clock inválido rejeitado, título HTML escapado, idioma sem alterar JSON do projeto, sinônimos de alumínio, painel recolhível/redimensionável, zoom, pan com Espaço sem mover nó, teclado dentro de campo, exportação/importação JSON, recuperação de sessão ao recarregar, renomeio via touch em celulares/tablets, painéis híbridos tablet, inicialização offline e ausência de exceções JavaScript.

| Resolução | Entrada emulada | Área central padrão | Resultado |
|---|---|---|---|
| 320×680 | Touch | 320 px | Sem overflow horizontal |
| 393×852 | Touch | 393 px | Sem overflow horizontal |
| 768×1024 | Touch | 768 px; painéis sob demanda | Sem overflow horizontal |
| 1024×768 | Touch | 1024 px; painéis sob demanda | Sem overflow horizontal |
| 1366×768 | Mouse | 776 px | Painéis dedicados |
| 1920×1080 | Mouse | 1330 px | Painéis dedicados |
| 2560×1080 | Mouse | 1970 px | Painéis dedicados |

Capturas reais em `docs/screenshots-v0.4.19/`. O teste de carga de 500 nós manteve apenas 100 cards próximos à câmera no DOM. Rodadas observadas de recálculo+render ficaram aproximadamente entre 75 e 285 ms nesta máquina (a rodada final concorreu com outra suíte); não é promessa de FPS nem benchmark de grafos densos/cíclicos. O JSON de resultados registra a medição da rodada final.

## Revisão e limites

Não alteramos o solver estacionário: ciclos convergentes continuam estimativas, não simulação de partida, estoque ou hidráulica física. Energia continua planejada; geração depende do combustível real. Arredondamento visual segue Intl.NumberFormat com até três casas por padrão, sem arredondar valores internos.

O inspetor reutiliza readOptional e saveNodeEdit: números negativos/não finitos, clock fora de 1–250 e metas de máquinas não inteiras são rejeitados. Escapes e delegação de eventos preservados. Nenhuma dependência de runtime foi adicionada. Persistência continua sujeita à disponibilidade/quota do localStorage e ao contexto de abertura em iOS, com mensagem de erro e exportação JSON disponível.

Não executados: Safari/WebKit real, teclado físico do iPhone, pinça em dispositivo real, PWA instalada e atualização de cache/service worker, drag/drop nativo por automação, ensaio prolongado de vazamento de memória ou grafos com milhares de conexões. As correções de renomeio/visualViewport/WebKit da base foram preservadas textualmente, mas não certificadas em aparelho físico. O corpus de regressão não representa todos os projetos históricos possíveis.

Não foi obtido o dump oficial pt-BR.json do patch; variantes de receitas e máquinas permanecem documentadas. Recomendo **manter a atualização como candidata em branch/PR**, testar abertura offline e teclado em iPhone real e só então aprovar integração/publicação. Nenhuma aprovação de publicação foi presumida.
