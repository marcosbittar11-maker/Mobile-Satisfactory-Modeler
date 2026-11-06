# Revisão completa da interface em inglês — v0.4.19

## Problema reproduzido

A captura do usuário foi reproduzida: após selecionar inglês, a tela inicial ainda continha “Monte a sua fábrica”, “Plano principal”, instruções parcialmente traduzidas e o aviso de armazenamento em português. O teste novo falhou primeiro com essa mesma instrução misturada. A primeira auditoria encontrou 446 ocorrências suspeitas repetidas em mobile e desktop.

As causas eram: cobertura insuficiente de frases completas no dicionário; rótulos padrão protegidos como se fossem nomes do usuário; placeholders de inputs ignorados; cache de atributos que perdia o texto original ao voltar para português; títulos internos de geradores ainda em português; textos desenhados/exportados que não passam pelo tradutor do DOM.

## Correções

- Acrescentadas frases completas e cláusulas dos templates, com prioridade sobre substituições de palavras. Revisados início, menus, configuração, projetos, catálogo, logística, receitas personalizadas, geradores, editores de portas/conexões, ajuda, créditos, alertas, metas, fontes, templates e erros de importação/persistência.
- Localização dos nomes padrão de nós e do breadcrumb na apresentação, sem alterar os nomes/IDs armazenados no projeto. Nomes originais das receitas e chaves permanecem iguais.
- Placeholders e rótulos acessíveis de campos agora são traduzidos sem tocar no valor digitado. Cache por atributo preserva PT-BR → EN → PT-BR em alternâncias sucessivas.
- Campos novos recebem valores padrão no idioma ativo; nomes já escritos pelo usuário não são traduzidos.
- Nomes do usuário protegidos também no resumo, nos alertas, nas conexões, na confirmação de exclusão e nos modelos, não apenas no card.
- Subtítulos de nós localizados na origem: CSV e PNG recebem o mesmo idioma da tela. Legendas de contagem no PNG também corrigidas. Datas usam o idioma ativo e o zoom abaixo de 10% usa separador decimal local (1.5% em inglês, 1,5% em português).
- O aviso real de armazenamento indisponível aparece em inglês. A restrição de armazenamento de origens opacas, como `data:`, continua sendo uma limitação do navegador; a tradução não remove nem oculta o aviso.

## Verificação executada

`CHROMIUM_PATH=/usr/bin/chromium node tests/localization.js`

- 86 combinações de tela/estado em 393×852 com touch e 1366×852 com mouse: nenhuma ocorrência residual detectada pelo verificador de português e nenhuma exceção JavaScript.
- Fluxos examinados: 14 diálogos principais, quatro estados do seletor, 14 tipos de nó, quatro receitas incluindo carvão/nuclear/alumina e seus alertas, editor de porta, conexão e aviso de armazenamento.
- Testes específicos verificam conteúdo inglês na tela inicial, breadcrumb, placeholders e erro de armazenamento; três alternâncias consecutivas de idioma; preservação literal do projeto, nomes e notas; nomes escritos pelo usuário no resumo/alertas; conteúdo CSV; separador decimal do zoom.
- Inicialização em origem opaca e tentativa real de salvar reproduzem a indisponibilidade de localStorage, com aviso agora em inglês. Captura em `screenshots-v0.4.19/english-mobile.png`.
- Suíte existente: 26/26 passou. A suíte `tests/v0.4.19.js` também passou: sete resoluções, persistência, JSON, offline e cinco cenários numéricos sem diferença contra o anexo v0.4.18.

Os testes foram executados com Chromium/Playwright. Não substituem homologação em Safari/iPhone físico nem garantem ausência de traduções faltantes em todo conteúdo arbitrário de projetos importados. Textos personalizados podem legitimamente permanecer em português no modo inglês. Nenhuma fórmula, taxa, ID, configuração de deploy ou service worker foi alterado. Atualização no mesmo PR #1 em rascunho, sem merge/publicação Pages.
