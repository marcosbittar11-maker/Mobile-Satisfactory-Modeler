# Teste de viewport iOS — v0.4.19

Objetivo: grade até as bordas no modo instalado, controles flutuantes e protegidos pela área segura, e cabeçalho compacto/mais legível. Candidata na branch `fix/ios-standalone-viewport`; não integrada à main.

## Alteração proposta

- Somente no modo standalone e até 1023 px: app com altura dinâmica `100dvh` e fallback, editor até a borda inferior, sem faixa opaca do rodapé.
- Botões flutuam acima da área segura inferior; fundo/grade continuam atrás deles. Espaços entre controles permitem pan no editor.
- Removida a folga extra de 17 px do cabeçalho em retrato. Em paisagem/tablets estreitos, cabeçalho de 60 px + área segura acomoda os controles de toque sem sobreposição.
- Frase superior em 11 px, line-height explícito de 14 px e alinhamento do bloco de marca. Sem aplicar filtros ou forçar rasterização por transform.
- Margens laterais seguras para cabeçalho, controles, botão +, breadcrumbs e indicadores em paisagem.
- Nenhum cálculo, taxa, formato JSON ou correção de teclado/renomeio foi modificado.

## Prévia publicada para teste

URL: https://marcosbittar11-maker.github.io/Mobile-Satisfactory-Modeler/?teste-tela=1

No Safari, usar Compartilhar → Adicionar à Tela de Início e abrir **FF Tela Teste**. O manifesto tem ID/start_url específicos para esse teste. A mudança visual é ativada somente no modo instalado; o Safari com barra de endereço mantém o layout normal.

A versão normal conserva o layout atual. Para evitar alterar fábricas do app normal, o teste usa chaves separadas de projetos, projeto ativo, idioma e modelos no localStorage. É possível exportar JSON no app normal e importar no teste. Não apaga nem migra os projetos originais.

O servidor fornece o mesmo documento para a URL normal e para a URL com parâmetro. A seleção do teste ocorre no carregamento, evitando contaminar o fallback offline do service worker com um HTML exclusivo da prévia. O teste automatizado abriu a prévia e depois o app normal sem rede, verificando layout e armazenamento de ambos. Manifesto normal, ícones e estratégia do SW preservados; só foram acrescentados o manifesto de teste e uma revisão do cache para disponibilizá-lo offline.

## Evidências

- `node tests/standalone-viewport.js`: 6/6 cenários de geometria passaram (Safari/browser modelado, iPhone app, tela pequena, paisagem, tablet/browser e desktop/browser).
- Área de 393×852 com insets sintéticos de 47 px em cima e 34 px embaixo: editor proposto chega ao pixel 852; cabeçalho 104 px; controles acima da área de gesto. Área vertical do editor: 748 px, contra 641 px do layout standalone anterior (+107 px nesse cenário modelado).
- Renomear/fechar restaura o layout e não altera o projeto; sem overflow horizontal e sem exceções JavaScript nos seis cenários.
- Prévia empacotada: layout normal preservado, armazenamento isolado, recarga offline da prévia e retorno offline ao app normal passaram, sem erros JavaScript.
- Suíte de regressão: 26/26 passou. Auditoria de idioma: 86 estados sem português residual detectado e sem erros JavaScript.

Os insets e a condição standalone foram substituídos em memória pelo teste: isto é uma simulação geométrica em Chromium, **não Safari/iPhone real**. A nitidez e a faixa preta observadas no aparelho ainda precisam ser conferidas pelo usuário. Nenhuma melhora de rasterização nativa é declarada como comprovada.
