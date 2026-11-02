# Relatório de auditoria — Factory Flow (v0.4.1 → v0.4.4)

Data: 01/11/2026 · Arquivos analisados: `Satisfactory_Mobile_Modeler_v0.4.1_Offline.html` (2.152 linhas, ~207 KB de código sem o atlas base64) e `Minha_fabrica.factory.json`.

Referências de linha (`L123`) apontam para o HTML v0.4.1. A seção 0 traz os números de linha na v0.4.4.

## 0. Atualização — v0.4.4 (02/11/2026)

Repeti todos os testes deste relatório na v0.4.4. O código só mudou no motor de cálculo, nos rótulos das portas e no nível de detalhe por zoom.

**Mudanças da v0.4.4 em relação à v0.4.1:**
- `reserveSpareResources` (L1565): com uma meta fixa, a sobra de recurso vai para os ramos sem meta.
- Passada de "disponibilidade planejada" (`previewIns/Outs`): agora é ela que alimenta os alertas de falta e os rótulos das conexões.
- Portas mostram "✓ / ⚠ disponível / necessário".
- `lodFor`: cards completos até 10% de zoom (antes, 42%).

**O que melhorou (testado):**
- Fonte fixa de 120 de minério → lingote → Iron Plate (meta 20) + Iron Rod sem meta → armazenamento. Na v0.4.1 só a placa era abastecida (30 usados, 90 parados). Na v0.4.4 a barra recebe os 90 restantes: 6 construtoras. ✓
- Todos os resultados que estavam corretos continuam idênticos: gerador automático, clock, Somersloop, ciclo, geradores e o seu JSON (96,6 MW).

**O que continua igual (nenhum P0/P1 foi corrigido):**
- P0-1: ordem dos nós (3 × 12 foundries).
- P0-2: a fonte Mk2 do seu JSON ainda vira automática ao salvar (96,6 → 81,6 MW). Linhas L1875 e L1923.
- P0-3: colar outpost (L1047).
- P0-4: divisor prioritário e pesos.
- P1-1: lista cortada em 200 (L2092).
- P1-2: botão de alertas some em ≤365 px (CSS L14).
- P1-5: "esteira mais rápido" (L1813).
- P1-6: "/m".
- Todos os itens das seções 5 e 6.

**Regressões novas da v0.4.4:**

- **R1 — Meta não atingida sem nenhum alerta.**
  - Teste: Iron Ingot com meta de 60/min, que só pode entregar para 1 Iron Plate limitado a 1 máquina (aceita 30).
  - Fluxo real: 30/min. HUD: "✓ Sem pendências".
  - Na v0.4.1 havia um alerta (com texto enganoso, "Recebe 30/60"). Agora não há nenhum. Os alertas de entrada passaram a usar a disponibilidade planejada, que ignora a contrapressão. Como a entrada também cai para 50%, o aviso "Saída bloqueada" (L1795, `uOut < min(1,uIn)`) também não dispara.
  - Correção: alerta explícito "meta X/min, entregue Y/min" sempre que o fluxo real de um nó com meta (ou de um nó de destino) ficar abaixo do pedido.

- **R2 — Zoom distante ficou ~20–30× mais pesado.**
  - Teste: 400 cards, tudo na tela.

    | Zoom | v0.4.1 | v0.4.4 |
    |---|---|---|
    | 10% | 12,7 ms (800 elementos) | 376 ms (14.400 elementos) |
    | 20% | 12,7 ms | 242 ms |

  - Em celular, isso deve virar travadas de mais de 1 s a cada mudança de nível ao fazer pinça ou enquadrar.
  - A 10%, o texto do card tem ~1,3 px: ninguém consegue ler. O custo não traz ganho.
  - Correção: voltar a algo como `full ≥ 0,3`, `compact ≥ 0,1`. Outra opção é decidir pelo número de nós visíveis (ex.: full só com até 150 cards na tela).

- **R3 (menor) — Fonte automática ganha um teto implícito de 120.** A reserva de excedente usa `max(120, demanda)` como capacidade da fonte automática. Com fonte automática, os ramos sem meta recebem "o que sobra até 120", o mesmo número arbitrário do P0-1. Mais um motivo para tornar a referência configurável ou trocá-la por configuração real de extratora (P0-2).

## 1. Como foi verificado

| O quê | Como |
|---|---|
| Receitas (299 de fabricação + 2 ciclos nucleares + 6 geradores) | Extraí o catálogo com um script e comparei, uma a uma, com os valores do jogo 1.0/1.1 que conheço (duração, entradas, saídas, máquina). |
| Motor de cálculo | Rodei o HTML real no Chromium headless (viewport 390×844, toque) e montei 14 cenários por código: clock, Somersloop, limites, divisores, ciclo de reciclagem, geradores, outpost, esteiras. |
| Gerador automático | Gerei Modular Engine 2,5/min, Heavy Modular Frame 2/min, Supercomputer 1/min, Plastic 60/min e Turbofuel 30/min, e conferi à mão. |
| UI | 18 capturas de tela (390 px e 320 px), checagem de overflow e leitura de todos os handlers de botões. |
| Seu JSON | Importado e calculado; inclusive testei abrir e salvar o editor da fonte. |

**Limites desta verificação:** os sites satisfactory.wiki.gg, satisfactorymodeler.github.io e bisecthosting.com estão bloqueados na rede desta sessão, então não consegui cruzar linha a linha com a wiki nem ler a documentação do Modeler original. A comparação com o original usa a descrição da página da Steam. As mudanças de receitas da 1.2 não foram verificadas. Os gestos não foram testados em aparelho real.

## 2. O que está correto (com evidência)

- **Receitas:** não encontrei divergência nas 299 receitas de fabricação. Isso inclui todos os alternativos da 1.0 (Basic Iron Ingot, Tempered Copper/Caterium, Molded Beam, Fused Quartz…), conversores de minério, Quantum Encoder e embaladora/desembaladora. O único valor de que tenho menos certeza é **Alternate: Compacted Steel Ingot** (2 minério + 1 Compacted Coal → 4 aço em 24 s). Vale conferir na wiki.
- **Clock/energia:** expoente 1,321928 (log₂ 2,5) ✓. Última máquina subclockada ✓ (1,25 máquina = 1 a 100% + 1 a 25% → 4,64 MW). Power Shards ✓ (3,33 Iron Plate a 150% → 3 shards).
- **Somersloop:** saída ×(1+n/slots) e energia ×(1+n/slots)² ✓. Slots por máquina ✓ (Smelter 1, Constructor 1, Assembler/Foundry/Refinery/Converter 2, Manufacturer/Blender/Acelerador/Encoder 4, Packager 0).
- **Energia variável:** média do ciclo para Acelerador (250–750 / 500–1500), Conversor (100–400) e Encoder (0–2000) ✓.
- **Geradores:** carvão 75 MW (15 carvão + 45 água) ✓. Combustível 250 MW: Fuel/Biofuel 20, Turbo 7,5, Rocket 4,1667, Ionized 3 por minuto ✓. Nuclear 2.500 MW (240 m³/min de água, 10 Uranium Waste/min, 1 Plutonium Waste/min) ✓.
- **Esteiras/canos:** 60/120/270/480/780/1200 e 300/600 ✓. Extratoras (Mk1 60/5 MW, Mk2 120/15 MW, Mk3 240/45 MW, petróleo 120/40 MW, água 120/20 MW, pressurizador 150 MW) ✓.
- **Gerador automático:** Modular Engine 2,5/min deu exatamente o meu cálculo à mão: 273,75 minério de ferro, 40 cobre, 45 carvão, 56,25 petróleo, 3,75 Rotor, 10,875 Screw, 12,25 Iron Rod e 37,5 HOR para o Sink. HMF 2/min e Supercomputer 1/min também bateram.
- **Ciclo de reciclagem** (Recycled Plastic ↔ Recycled Rubber, meta de 60 de borracha): convergiu para o regime correto (0,667 + 1,333 refinarias, 60 de Fuel).
- **Outpost:** o cálculo atravessa as portas corretamente.
- **Seu JSON:** 4 smelters, 3 foundries, 1,5 de Steel Beam (22,5/min), 3 de Steel Pipe (60/min), 96,6 MW. Os números estão corretos para a regra que o app usa (aço dividido 90/90 entre viga e cano por falta de meta).
- **Desempenho:** com 400 nós, recálculo em ~22 ms e render em ~17 ms. Ativar `'use strict'` no topo não quebrou nenhum teste.

## 3. Bugs — prioridade P0 (número errado ou perda de dados)

### P0-1. O resultado depende da ordem em que os nós foram criados
`inferTargets` (L1463) ancora a fábrica sem meta na **primeira** fonte automática da ordem topológica, fixando-a em 120/min. Em uma receita com proporções desiguais, a resposta muda conforme a ordem dos nós.
- Teste: Iron Alloy Ingot com duas fontes automáticas (ferro e cobre), mesmo grafo:
  - ferro criado primeiro → **3 foundries, 48 MW**;
  - cobre criado primeiro → **12 foundries, 192 MW** (480 de minério de ferro).
- Correção sugerida: sem meta, dimensionar por "1 máquina no nó terminal", como já acontece com receita solta (L1531). Outra opção é ancorar todas as fontes automáticas proporcionalmente, nunca uma só. Também convém exibir um aviso "fábrica sem meta: escala arbitrária".
- Aceite: mesmo grafo em qualquer ordem → mesmo resultado.

### P0-2. A fonte de minério do seu JSON é alterada em silêncio
O seu JSON tem `sourceMachine: "miner-mk2"`. A migração (L1741) transforma isso no modo `node` (minerador físico, teto de 120, 15 MW). Esse modo **não tem interface**: o editor só oferece Automático/Fixa (L1990).
- Subtítulo errado: mostra "Entrada automática · referência 120/min" (L1788) para um Mk2 fixo.
- O texto do editor diz "sem equipamento… ou consumo elétrico", mas os 15 MW entram no total.
- **Teste:** abrir o editor da fonte e tocar em Salvar, sem mudar nada, troca o modo `node` para `auto`, troca `miner-mk2` para `external`, tira o teto de 120/min e reduz a energia de **96,6 para 81,6 MW**.
- Correção: devolver a interface de extratora (Mk1/2/3, pureza, nº de nós, clock), já que o motor (`EXTRACTORS`, `minerBase`, `extractorPower`) existe e está correto. Outra opção é migrar explicitamente na importação, com aviso.

### P0-3. Copiar, colar, duplicar ou salvar como modelo um outpost/blueprint gera uma casca vazia
`pasteSelection` faz `n.boardId=null` (L1046). O resultado é um outpost sem área, sem portas e com as ligações perdidas, confirmado em teste. O mesmo vale para "Duplicar" e "Salvar modelo".
- Correção: clonar a sub-árvore de boards (nós e arestas internas) com novos IDs.

### P0-4. A estimativa sem meta ignora divisor prioritário, pesos e transbordo
`inferTargets` divide igualmente entre as saídas usadas (L1471), seja qual for o tipo do divisor.
- Teste: fonte fixa de 120 → lingote → divisor prioritário → Iron Rod (máx. 1 máquina) e Iron Plate. Esperado: 15 para a barra e 105 de transbordo para a placa. Obtido: **75 usados, 45/min da fonte fixa desperdiçados**, sem nenhum aviso.
- Com pesos 1:1:2, o fluxo real fica 30/30/60, mas os nós mostram "30 / 40 req.". A exigência é calculada com divisão igual, então aparecem faltas falsas na porta.
- Correção: aplicar na inferência a mesma regra do fluxo real (prioridade, pesos, `waterfill` com tetos). Também convém alertar "oferta fixa não utilizada".

## 4. Bugs — prioridade P1 (UI)

| # | Problema | Evidência | Correção |
|---|---|---|---|
| P1-1 | A aba **"Tudo"** do seletor nunca mostra Recursos nem Logística | Lista de 332 itens cortada em 200 (`slice(0,200)`, L1944). Os 200 primeiros são só receitas. | Agrupar por seção (Recursos/Logística primeiro, ou só receitas com busca) e paginar ou rolar sem corte. |
| P1-2 | Em telas ≤365 px **some o botão de alertas/Recalcular** | CSS L14 `.hud .stat:last-child{display:none}`. Em 360 px aparece `display:none` justamente no botão "⚠ pendências". No modo manual não há outra forma de recalcular. | Esconder o contador de nós e linhas, não o botão de status. |
| P1-3 | O toast cobre os botões das sheets por 2,6 s | z-index 250 > overlay 200 (L11). Nas capturas, cobre "Trocar receita/Duplicar" e "Renomear". | Com a sheet aberta, mostrar o toast no topo ou abaixo do overlay. |
| P1-4 | Texto "Plano: 2 máquina(s) a 100% + 1 a 100%" | L1985 | Se a última máquina estiver no mesmo clock, mostrar "3 máquinas a 100%". |
| P1-5 | "esteira mais rápido liberado" | L1678 | Concordância: "esteira mais rápida liberada" / "cano mais rápido liberado". |
| P1-6 | Rótulo da conexão "120 / 120/m" | L1864: `/m` parece metro | Usar "/min". |
| P1-7 | Arrastar com vários nós selecionados move só um | `viewportMove` move só `g.nid` (L1242) | Mover a seleção inteira. |
| P1-8 | Conectar de novo duas portas já ligadas **apaga** a ligação (alternância oculta) | L1777 | Remover a alternância: desconectar só pelo editor da conexão. |

## 5. Duplicatas e itens dispensáveis na UI

**Ações duplicadas (o mesmo código atrás de botões diferentes):**
- **Renomear**: aparece 3 vezes (toque no nome, Menu, Meus projetos).
- **Projetos**: aparece 2 vezes (ícone ▤ do topo e Menu).
- **Novo projeto**: aparece 2 vezes com nomes diferentes ("＋ Plano vazio" no Menu e "＋ Criar projeto" em Projetos).
- **"Ações do bloco"** (toque longo) é um subconjunto do editor (toque duplo / Editar). As duas sheets têm Duplicar/Excluir.
- **Excluir** aparece em Ações do bloco, no editor, em "Apagar seleção" e na tecla Delete. Isso é aceitável, mas a sheet de Ações pode sair.

**Ícones reaproveitados para funções diferentes:** ▤ = Projetos, Resumo e Inserir modelo; ▥ = Salvar modelo e Blueprint.

**Conceitos sobrepostos:**
- **Blueprint × Outpost**: o comportamento é idêntico (`isContainer`), só muda o rótulo. Ou se funde os dois, ou o Blueprint ganha um diferencial real, como "N cópias" (multiplicador).
- **Depósito dimensional**: no jogo é um upload para o armazenamento central, ou seja, um destino sem saída para esteira. Aqui está modelado como passagem com saída (L1454), o que engana.
- **Divisor "com transbordo"**: o divisor comum também diz "com transbordo" na descrição. Melhor renomear para "Divisor prioritário (overflow)".
- **Pesos no divisor**: não existem no jogo. São úteis para planejar, mas convém rotular como "proporção de planejamento".

**Botão "Editar" fixo na barra inferior:** fica desabilitado quase sempre. Sugiro uma barra contextual que só aparece com um nó selecionado (Editar · Trocar receita · Duplicar · Excluir). Isso elimina a sheet "Ações do bloco".

**Modelos (templates):**
- usam `prompt()` nativo, fora do padrão das sheets;
- não dá para renomear nem apagar;
- não vão no backup JSON;
- sem seleção múltipla (não há seleção por área), só servem para 1 nó ou para "Selecionar todos".

## 6. Código morto e higiene

- Pipeline de ícones online (`GAME_ICON_BASE/MIRROR`, `cacheGameIcon`, `gameIconCache`, listeners `load`/`error` de `.game-icon-image`, L799–807, L840–849, L887–897): nenhuma `<img>` é criada desde o atlas embutido. O código ainda lê o localStorage na inicialização sem necessidade.
- Também sem uso:
  - `defaultSourceMachine`, `LEGACY_RECIPE_COUNT`, `resourcesFluid`, `baseRate`, `findPickerItem`, `toastTimer`, `historyTimer`;
  - `requested`/`canAuto` em `spawnAtEnd` (L1090/1093);
  - `g.armed` (L1155), que é definido mas nunca lido;
  - `GAME_ICON_RENAMES`, que é um mapeamento identidade.
- `'use strict'` aparece 3 vezes no meio do script (L744–746) e não tem efeito. Movi para o topo em teste e nada quebrou.
- A receita personalizada é criada a partir de um nó "nota" (L976) e herda o campo `note`. Também não dá para editar nem apagar receitas personalizadas. A lista de máquinas inclui gerador, usina nuclear e bancada manual, que não fazem sentido ali.
- `window.__portEdit/__editEdge/__deleteEdge` são globais soltas. Melhor guardá-las no estado do app.

## 7. Melhorias para se aproximar do Satisfactory Modeler (Steam)

A página da Steam destaca três pontos: limites opcionais de máquinas, cálculo de fluxo e **quantas máquinas de cada tipo**, e splitter/merger com prioridade e outposts. Esta versão já tem limites, fluxo, prioridade e outposts. O que falta ou pode melhorar:

1. **Resumo por tipo de máquina.** Hoje o resumo soma "11,5 máquinas equivalentes" misturando smelter, foundry e constructor, o que tem pouco significado. O ideal é uma tabela "4 Smelters · 3 Foundries · 5 Constructors" com MW por tipo.
2. **Balanço por item** (produzido × consumido × sobra/falta). É o que mais ajuda a achar gargalos.
3. **Extratoras configuráveis** (ver P0-2), com aviso quando passar da capacidade do nó. Como opção, limites do mapa por recurso, como fazem outros planejadores.
4. **Combustíveis que faltam:**
   - gerador a carvão com Compacted Coal (≈7,14/min) e Petroleum Coke (25/min);
   - usina nuclear com Ficsonium Fuel Rod (sem resíduo; conferir na wiki).
5. **Seleção múltipla** (toque longo + arrastar para caixa, ou modo "selecionar") e mover em grupo.
6. **Blueprint com multiplicador** (N cópias idênticas), que é o diferencial natural em relação ao Outpost.
7. **Conexões agregadas:** o aviso de esteira acima de 1.200/min aparece em nós que representam dezenas de máquinas. Um campo "nº de linhas paralelas" por conexão, ou mostrar "2× Mk.6", resolve.
8. **Exportação versionada:** o seu JSON não tem `rkey`/`schema`, porque foi exportado por uma versão anterior. Ao importar, o app confia no índice `rid` (L1737). Se o catálogo mudar de ordem, as receitas trocam em silêncio. Sugestões:
   - gravar `appVersion` e `catalogVersion` no export;
   - em arquivos só com `rid`, validar com os itens das ligações ou avisar.
9. **Importação .sfmd:** é parcial (sem ligações) e supõe campos `Data/Name/X/Y/Max`. Não consegui confirmar o formato. Ou valide com um arquivo real, ou rotule como experimental.
10. **Multiplicador de custo (Game Modes 1.2):** as faixas batem com o que as fontes relatam (custo 0,25–2×, energia 0,25–5×). Confirme no jogo se ele afeta os ingredientes das receitas de fabricação (como o app assume) e se vale para empacotar/desempacotar e para o Conversor.
11. **Persistência:** todos os projetos ficam numa única chave do localStorage, regravada a cada ação, e há até 60 snapshots completos para desfazer. Para fábricas grandes, IndexedDB e mudanças só de posição sem recálculo evitam estourar a cota e travar.

## 8. Plano sugerido (aguardando autorização)

| Etapa | Conteúdo | Risco | Critério de aceite |
|---|---|---|---|
| 0 | Commitar o HTML v0.4.1 como base no repositório | nenhum | diff limpo para as próximas etapas |
| 1 | P0-1 a P0-4 | médio (motor de cálculo) | cenários deste relatório como testes automatizados (Playwright) passando |
| 2 | P1-1 a P1-8 e limpeza das duplicatas | baixo | capturas em 320/390 px sem regressão |
| 3 | Código morto e `'use strict'` | baixo | mesmos testes passando, arquivo menor |
| 4 | Resumo por máquina + balanço por item + extratoras | médio | números conferidos à mão em 2–3 fábricas |
| 5 | Seleção múltipla, blueprint ×N, combustíveis extras | médio/alto | testes de gesto em aparelho real |
