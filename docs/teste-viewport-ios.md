# Teste de viewport iOS — v0.4.19

## Revisão 3 após a captura do usuário

O usuário confirmou o Teste Tela 2 ativo, mas pediu os controles mais baixos e relatou o cabeçalho ainda suavizado. A revisão 3 no wrapper de Pages remove a margem extra de 6 px abaixo dos controles (mantém somente a área segura), testa `100lvh` no modo instalado para ocupar a maior altura disponível e torna o cabeçalho opaco, com fonte 12 px, line-height explícito e marca alinhada ao topo para evitar centralização em meio pixel. Não se declara a nitidez nativa corrigida sem nova captura do aparelho.

O endereço e o ID do manifesto são os mesmos, preservando os projetos da prévia. O cabeçalho passa a mostrar **TESTE TELA 3**. Tocar nessa marca abre medidas locais da tela, janela, visualViewport, app, editor e rodapé; nada é transmitido e o projeto não é modificado. O layout normal continua protegido pelo seletor do teste e pelo seu armazenamento separado.

**Verificação desta revisão:** os três scripts executáveis do pacote passaram na análise sintática por `vm.Script`; `index.html` e `teste-tela.html` têm conteúdo idêntico; as condições de ativação e as propriedades foram conferidas estaticamente. Os testes de navegador novos não foram concluídos: o ambiente reiniciou e o sandbox bloqueou servidor local (`EPERM`) e inicialização do Chromium (`Operation not permitted`). Os resultados de navegador descritos abaixo são históricos das revisões anteriores, não execução do Teste Tela 3. Os novos critérios estão em `tests/preview-launch.js`, pendentes de execução.

O CSS da candidata principal nesta branch ainda corresponde à revisão anterior. A revisão 3 está apenas no pacote opt-in de Pages para homologação no aparelho, antes de transferir o ajuste validado ao HTML principal.

Objetivo: grade até as bordas no modo instalado, controles flutuantes e protegidos pela área segura, e cabeçalho compacto/mais legível. Candidata na branch `fix/ios-standalone-viewport`; não integrada à main.

## Alteração proposta

- Somente no modo standalone e até 1023 px: app com altura dinâmica `100dvh` e fallback, editor até a borda inferior, sem faixa opaca do rodapé.
- Botões flutuam acima da área segura inferior; fundo/grade continuam atrás deles. Espaços entre controles permitem pan no editor.
- Removida a folga extra de 17 px do cabeçalho em retrato. Em paisagem/tablets estreitos, cabeçalho de 60 px + área segura acomoda os controles de toque sem sobreposição.
- Frase superior em 11 px, line-height explícito de 14 px e alinhamento do bloco de marca. Sem aplicar filtros ou forçar rasterização por transform.
- Margens laterais seguras para cabeçalho, controles, botão +, breadcrumbs e indicadores em paisagem.
- Nenhum cálculo, taxa, formato JSON ou correção de teclado/renomeio foi modificado.

## Prévia publicada para teste

URL: https://marcosbittar11-maker.github.io/Mobile-Satisfactory-Modeler/teste-tela.html

No Safari, usar Compartilhar → Adicionar à Tela de Início e abrir **FF Tela Teste 2**. Deve aparecer **TESTE TELA 2** no cabeçalho. O manifesto tem ID/start_url no caminho fixo `teste-tela.html`, sem depender de parâmetro. O parâmetro antigo continua compatível. O modo instalado aceita tanto `display-mode: standalone` quanto `navigator.standalone` do iOS; o Safari com barra de endereço mantém o layout normal.

A versão normal conserva o layout atual. Para evitar alterar fábricas do app normal, o teste usa chaves separadas de projetos, projeto ativo, idioma e modelos no localStorage. É possível exportar JSON no app normal e importar no teste. Não apaga nem migra os projetos originais.

O servidor fornece os mesmos bytes para `index.html` e `teste-tela.html`. A seleção do teste ocorre no carregamento pelo caminho, evitando contaminar o fallback offline do service worker com um HTML exclusivo da prévia. O teste automatizado abriu a prévia e depois o app normal sem rede, verificando layout e armazenamento de ambos. É criado somente um link de manifesto, apontando desde o início para o manifesto correto, em vez de trocar o endereço de um manifesto já descoberto. Manifesto normal, ícones e estratégia do SW preservados; acrescentados manifesto/entrada de teste e uma revisão do cache.

A captura do primeiro teste mostrou o layout antigo mesmo após abertura pelo ícone FF Tela Teste. Sem telemetria do aparelho, não é possível distinguir perda do parâmetro, seleção/caching do manifesto ou reconhecimento do modo instalado. A revisão 2 elimina a dependência do parâmetro, evita a troca tardia do manifesto, aceita o sinal nativo do iOS e torna a identificação visual inequívoca. A hipótese foi reproduzida em teste: a entrada sem parâmetro anteriormente reutilizava o armazenamento normal.

`node tests/preview-launch.js /caminho/do/pacote-pages`: passou para caminho fixo, identificação visível, fallback iOS, manifesto sem query, isolamento de armazenamento, compatibilidade do link antigo, recarga offline e retorno offline ao app normal. O teste injeta `navigator.standalone` para exercitar esse contrato em Chromium; não declara homologação em Safari físico.

## Evidências

- `node tests/standalone-viewport.js`: 6/6 cenários de geometria passaram (Safari/browser modelado, iPhone app, tela pequena, paisagem, tablet/browser e desktop/browser).
- Área de 393×852 com insets sintéticos de 47 px em cima e 34 px embaixo: editor proposto chega ao pixel 852; cabeçalho 104 px; controles acima da área de gesto. Área vertical do editor: 748 px, contra 641 px do layout standalone anterior (+107 px nesse cenário modelado).
- Renomear/fechar restaura o layout e não altera o projeto; sem overflow horizontal e sem exceções JavaScript nos seis cenários.
- Prévia empacotada: layout normal preservado, armazenamento isolado, recarga offline da prévia e retorno offline ao app normal passaram, sem erros JavaScript.
- Suíte de regressão: 26/26 passou. Auditoria de idioma: 86 estados sem português residual detectado e sem erros JavaScript.

Os insets e a condição standalone foram substituídos em memória pelo teste: isto é uma simulação geométrica em Chromium, **não Safari/iPhone real**. A nitidez e a faixa preta observadas no aparelho ainda precisam ser conferidas pelo usuário. Nenhuma melhora de rasterização nativa é declarada como comprovada.
