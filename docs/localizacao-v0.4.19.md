# Revisão de localização v0.4.19

Data: 2026-11-06. Escopo: 172 itens/fluidos, 15 categorias de máquinas e 308 receitas em execução.

## Evidências e decisões

- [SatisfactoryBase — lista de itens](https://satisfactorybase.com/pt/wiki/items): comparação nominal dos 172 rótulos existentes; fonte comunitária secundária, não certificação oficial. Os nomes da v0.4.18 correspondem à nomenclatura dessa lista. Mantidos, exceto as duas preferências explícitas do projeto.
- [TH.GL — inventário](https://satisfactory.th.gl/pt/db/inventory): confirma Carcaça de Alumínio, usa Chapa de Duralumínio e apresenta divergências como Chapa de Ferro, Armação modular, Catério, Fio-veloz, Cronocristal, Galão de Água. Não misturamos automaticamente dois vocabulários completos.
- [TH.GL — receitas](https://satisfactory.th.gl/pt/db/recipes) e [máquinas](https://satisfactory.th.gl/pt/db/structures): nomenclatura diverge (Fornalha/Fundidora, Envasadora/Empacotadora, Misturador/Misturadora). Rótulos de máquinas existentes tratados como convenção do projeto; não substituídos sem dump oficial correspondente ao patch.
- [Wiki oficial — Community resources](https://satisfactory.wiki.gg/wiki/Community_resources): documenta CommunityResources/Docs/pt-BR.json em UTF-16. O arquivo original do jogo não está disponível nesta sessão. A página inicial wiki.gg retornou 403; a pesquisa indexada da página Community resources foi acessível. Não alegamos validação direta do dump.

Carcaça de Alumínio é preferência explícita e corroborada por TH.GL; Chapa de Alumínio é preferência explícita do projeto. Sinônimos pesquisáveis obrigatórios: Invólucro de Alumínio, Chapa de Alumínio Alclad, Chapa de Duralumínio. Inglês original preservado. As demais variantes TH.GL são alternativas documentadas, não uma troca geral de terminologia.

## Itens e fluidos — inventário completo

S = rótulo corroborado na lista SatisfactoryBase; P = preferência explícita do projeto. S não significa tradução oficial certificada. Nenhum ID ou taxa foi alterado.

| Chave estável | Inglês preservado | PT-BR principal | Evidência |
|---|---|---|---|
| iron-ore | Iron Ore | Minério de Ferro | S |
| copper-ore | Copper Ore | Minério de Cobre | S |
| coal | Coal | Carvão | S |
| iron-ingot | Iron Ingot | Lingote de Ferro | S |
| copper-ingot | Copper Ingot | Lingote de Cobre | S |
| steel-ingot | Steel Ingot | Lingote de Aço | S |
| iron-plate | Iron Plate | Placa de Ferro | S |
| iron-rod | Iron Rod | Barra de Ferro | S |
| wire | Wire | Fio | S |
| cable | Cable | Cabo | S |
| biomass | Biomass | Biomassa | S |
| concrete | Concrete | Concreto | S |
| leaves | Leaves | Folhas | S |
| limestone | Limestone | Calcário | S |
| screw | Screw | Parafusos | S |
| wood | Wood | Madeira | S |
| hog-remains | Hog Remains | Restos de Hog | S |
| spitter-remains | Spitter Remains | Restos de Spitter | S |
| stinger-remains | Stinger Remains | Restos de Stinger | S |
| hatcher-remains | Hatcher Remains | Restos de Hatcher | S |
| alien-protein | Alien Protein | Proteína Alienígena | S |
| alien-dna-capsule | Alien DNA Capsule | Cápsula de DNA Alienígena | S |
| blue-power-slug | Blue Power Slug | Lesma de Energia Azul | S |
| yellow-power-slug | Yellow Power Slug | Lesma de Energia Amarela | S |
| purple-power-slug | Purple Power Slug | Lesma de Energia Roxa | S |
| power-shard | Power Shard | Fragmento de Energia | S |
| mycelia | Mycelia | Micélio | S |
| solid-biofuel | Solid Biofuel | Biocombustível Sólido | S |
| steel-beam | Steel Beam | Viga de Aço | S |
| steel-pipe | Steel Pipe | Tubo de Aço | S |
| reinforced-iron-plate | Reinforced Iron Plate | Placa de Ferro Reforçada | S |
| rotor | Rotor | Rotor | S |
| modular-frame | Modular Frame | Estrutura Modular | S |
| encased-industrial-beam | Encased Industrial Beam | Viga Industrial Revestida | S |
| stator | Stator | Estator | S |
| motor | Motor | Motor | S |
| circuit-board | Circuit Board | Placa de Circuito | S |
| plastic | Plastic | Plástico | S |
| rubber | Rubber | Borracha | S |
| heavy-modular-frame | Heavy Modular Frame | Estrutura Modular Pesada | S |
| computer | Computer | Computador | S |
| caterium-ore | Caterium Ore | Minério de Caterium | S |
| caterium-ingot | Caterium Ingot | Lingote de Caterium | S |
| quickwire | Quickwire | Fio Rápido | S |
| supercomputer | Supercomputer | Supercomputador | S |
| high-speed-connector | High-Speed Connector | Conector de Alta Velocidade | S |
| ai-limiter | AI Limiter | Limitador de IA | S |
| fabric | Fabric | Tecido | S |
| filter | Gas Filter | Filtro de Gás | S |
| raw-quartz | Raw Quartz | Quartzo Bruto | S |
| quartz-crystal | Quartz Crystal | Cristal de Quartzo | S |
| crystal-oscillator | Crystal Oscillator | Oscilador de Cristal | S |
| sulfur | Sulfur | Enxofre | S |
| black-powder | Black Powder | Pólvora Negra | S |
| smokeless-powder | Smokeless Powder | Pólvora Sem Fumaça | S |
| nobelisk | Nobelisk | Nobelisk | S |
| gas-nobelisk | Gas Nobelisk | Nobelisk de Gás | S |
| pulse-nobelisk | Pulse Nobelisk | Nobelisk de Pulso | S |
| cluster-nobelisk | Cluster Nobelisk | Nobelisk de Fragmentação | S |
| nuke-nobelisk | Nuke Nobelisk | Nobelisk Nuclear | S |
| compacted-coal | Compacted Coal | Carvão Compactado | S |
| silica | Silica | Sílica | S |
| bauxite | Bauxite | Bauxita | S |
| aluminum-ingot | Aluminum Ingot | Lingote de Alumínio | S |
| alclad-aluminum-sheet | Alclad Aluminum Sheet | Chapa de Alumínio | P |
| heat-sink | Heat Sink | Dissipador de Calor | S |
| radio-control-unit | Radio Control Unit | Unidade de Controle de Rádio | S |
| turbo-motor | Turbo Motor | Turbomotor | S |
| battery | Battery | Bateria | S |
| uranium | Uranium | Urânio | S |
| uranium-cell | Encased Uranium Cell | Célula de Urânio Revestida | S |
| em-control-rod | Electromagnetic Control Rod | Barra de Controle Eletromagnética | S |
| uranium-fuel-rod | Uranium Fuel Rod | Barra de Combustível de Urânio | S |
| iodine-infused-filter | Iodine Infused Filter | Filtro Infundido com Iodo | S |
| aluminum-scrap | Aluminum Scrap | Sucata de Alumínio | S |
| copper-sheet | Copper Sheet | Chapa de Cobre | S |
| polymer-resin | Polymer Resin | Resina Polimérica | S |
| petroleum-coke | Petroleum Coke | Coque de Petróleo | S |
| non-fissile-uranium | Non-fissile Uranium | Urânio Não Físsil | S |
| plutonium-pellet | Plutonium Pellet | Pastilha de Plutônio | S |
| encased-plutonium-cell | Encased Plutonium Cell | Célula de Plutônio Revestida | S |
| plutonium-fuel-rod | Plutonium Fuel Rod | Barra de Combustível de Plutônio | S |
| copper-powder | Copper Powder | Pó de Cobre | S |
| pressure-conversion-cube | Pressure Conversion Cube | Cubo de Conversão de Pressão | S |
| empty-canister | Empty Canister | Galão Vazio | S |
| packaged-water | Packaged Water | Água Embalada | S |
| packaged-oil | Packaged Oil | Petróleo Embalado | S |
| packaged-fuel | Packaged Fuel | Combustível Embalado | S |
| packaged-turbofuel | Packaged Turbofuel | Turbocombustível Embalado | S |
| packaged-heavy-oil-residue | Packaged Heavy Oil Residue | Resíduo de Petróleo Pesado Embalado | S |
| packaged-liquid-biofuel | Packaged Liquid Biofuel | Biocombustível Líquido Embalado | S |
| packaged-alumina-solution | Packaged Alumina Solution | Solução de Alumina Embalada | S |
| packaged-sulfuric-acid | Packaged Sulfuric Acid | Ácido Sulfúrico Embalado | S |
| packaged-nitrogen-gas | Packaged Nitrogen Gas | Gás Nitrogênio Embalado | S |
| packaged-nitric-acid | Packaged Nitric Acid | Ácido Nítrico Embalado | S |
| packaged-rocket-fuel | Packaged Rocket Fuel | Combustível de Foguete Embalado | S |
| packaged-ionized-fuel | Packaged Ionized Fuel | Combustível Ionizado Embalado | S |
| smart-plating | Smart Plating | Revestimento Inteligente | S |
| versatile-framework | Versatile Framework | Estrutura Versátil | S |
| automated-wiring | Automated Wiring | Fiação Automatizada | S |
| modular-engine | Modular Engine | Motor Modular | S |
| adaptive-control-unit | Adaptive Control Unit | Unidade de Controle Adaptativa | S |
| assembly-director-system | Assembly Director System | Sistema Diretor de Montagem | S |
| magnetic-field-generator | Magnetic Field Generator | Gerador de Campo Magnético | S |
| thermal-propulsion-rocket | Thermal Propulsion Rocket | Foguete de Propulsão Térmica | S |
| nuclear-pasta | Nuclear Pasta | Pasta Nuclear | S |
| portable-miner | Portable Miner | Mineradora Portátil | S |
| aluminum-casing | Aluminum Casing | Carcaça de Alumínio | P |
| empty-fluid-tank | Empty Fluid Tank | Tanque de Fluido Vazio | S |
| cooling-system | Cooling System | Sistema de Resfriamento | S |
| fused-modular-frame | Fused Modular Frame | Estrutura Modular Fundida | S |
| uranium-waste | Uranium Waste | Resíduo de Urânio | S |
| plutonium-waste | Plutonium Waste | Resíduo de Plutônio | S |
| sam | SAM | SAM | S |
| reanimated-sam | Reanimated SAM | SAM Reanimado | S |
| sam-fluctuator | SAM Fluctuator | Flutuador SAM | S |
| iron-rebar | Iron Rebar | Vergalhão de Ferro | S |
| stun-rebar | Stun Rebar | Vergalhão Atordoante | S |
| shatter-rebar | Shatter Rebar | Vergalhão Estilhaçante | S |
| explosive-rebar | Explosive Rebar | Vergalhão Explosivo | S |
| rifle-ammo | Rifle Ammo | Munição de Rifle | S |
| homing-rifle-ammo | Homing Rifle Ammo | Munição Teleguiada de Rifle | S |
| turbo-rifle-ammo | Turbo Rifle Ammo | Munição Turbo de Rifle | S |
| diamonds | Diamonds | Diamantes | S |
| time-crystal | Time Crystal | Cristal Temporal | S |
| ficsite-ingot | Ficsite Ingot | Lingote de Ficsita | S |
| ficsite-trigon | Ficsite Trigon | Trígono de Ficsita | S |
| dark-matter-crystal | Dark Matter Crystal | Cristal de Matéria Escura | S |
| ficsonium | Ficsonium | Ficsonium | S |
| ficsonium-fuel-rod | Ficsonium Fuel Rod | Barra de Combustível de Ficsonium | S |
| superposition-oscillator | Superposition Oscillator | Oscilador de Superposição | S |
| neural-quantum-processor | Neural-Quantum Processor | Processador Neural-Quântico | S |
| singularity-cell | Singularity Cell | Célula de Singularidade | S |
| ballistic-warp-drive | Ballistic Warp Drive | Motor de Dobra Balístico | S |
| ai-expansion-server | AI Expansion Server | Servidor de Expansão de IA | S |
| alien-power-matrix | Alien Power Matrix | Matriz de Energia Alienígena | S |
| water | Water | Água | S |
| crude-oil | Crude Oil | Petróleo Bruto | S |
| fuel | Fuel | Combustível | S |
| turbofuel | Turbofuel | Turbocombustível | S |
| heavy-oil-residue | Heavy Oil Residue | Resíduo de Petróleo Pesado | S |
| liquid-biofuel | Liquid Biofuel | Biocombustível Líquido | S |
| alumina-solution | Alumina Solution | Solução de Alumina | S |
| sulfuric-acid | Sulfuric Acid | Ácido Sulfúrico | S |
| nitrogen-gas | Nitrogen Gas | Gás Nitrogênio | S |
| nitric-acid | Nitric Acid | Ácido Nítrico | S |
| dissolved-silica | Dissolved Silica | Sílica Dissolvida | S |
| rocket-fuel | Rocket Fuel | Combustível de Foguete | S |
| dark-matter-residue | Dark Matter Residue | Resíduo de Matéria Escura | S |
| excited-photonic-matter | Excited Photonic Matter | Matéria Fotônica Excitada | S |
| ionized-fuel | Ionized Fuel | Combustível Ionizado | S |
| biochemical-sculptor | Biochemical Sculptor | Escultor Bioquímico | S |
| blade-runners | Blade Runners | Blade Runners | S |
| chainsaw | Chainsaw | Motosserra | S |
| factory-carttm | Factory Cart™ | Carrinho de Fábrica™ | S |
| gas-mask | Gas Mask | Máscara de Gás | S |
| golden-factory-carttm | Golden Factory Cart™ | Carrinho de Fábrica Dourado™ | S |
| hazmat-suit | Hazmat Suit | Traje de Proteção | S |
| hoverpack | Hoverpack | Mochila Flutuante | S |
| jetpack | Jetpack | Jetpack | S |
| object-scanner | Object Scanner | Scanner de Objetos | S |
| nobelisk-detonator | Nobelisk Detonator | Detonador de Nobelisk | S |
| bacon-agaric | Bacon Agaric | Ágarico-bacon | S |
| paleberry | Paleberry | Baga-pálida | S |
| beryl-nut | Beryl Nut | Noz de Berílio | S |
| medicinal-inhaler | Medicinal Inhaler | Inalador Medicinal | S |
| parachute | Parachute | Paraquedas | S |
| rebar-gun | Rebar Gun | Rifle de Vergalhão | S |
| rifle | Rifle | Rifle | S |
| xeno-zapper | Xeno-Zapper | Xeno-Zapper | S |
| xeno-basher | Xeno-Basher | Xeno-Basher | S |
| zipline | Zipline | Tirolesa | S |

## Receitas e incertezas

A v0.4.18 traduzia palavras isoladas, produzindo títulos híbridos como “Solid Lingote de Aço”. A v0.4.19 usa o nome PT-BR do item quando a receita tem exatamente esse nome; para os demais títulos conserva o nome original cadastrado. Isso evita inventar uma tradução não verificada. Entradas, saídas e pesquisa continuam localizadas. Receitas alternativas não verificadas são uma limitação explícita, não traduções oficiais.

A tabela abaixo inventaria as receitas do bloco RAW_RECIPES. As receitas de energia adicionadas por código mantêm seus identificadores e títulos originais cadastrados. O catálogo em execução contém 308 receitas, verificadas no teste responsivo.

| Receita original | Decisão PT-BR |
|---|---|
| Iron Ingot | Lingote de Ferro |
| Alternate: Iron Alloy Ingot | Original preservado; tradução específica não verificada |
| Alternate: Pure Iron Ingot | Original preservado; tradução específica não verificada |
| Alternate: Leached Iron Ingot | Original preservado; tradução específica não verificada |
| Copper Ingot | Lingote de Cobre |
| Alternate: Copper Alloy Ingot | Original preservado; tradução específica não verificada |
| Alternate: Pure Copper Ingot | Original preservado; tradução específica não verificada |
| Alternate: Leached Copper Ingot | Original preservado; tradução específica não verificada |
| Steel Ingot | Lingote de Aço |
| Alternate: Solid Steel Ingot | Original preservado; tradução específica não verificada |
| Alternate: Compacted Steel Ingot | Original preservado; tradução específica não verificada |
| Alternate: Coke Steel Ingot | Original preservado; tradução específica não verificada |
| Iron Plate | Placa de Ferro |
| Alternate: Steel Cast Plate | Original preservado; tradução específica não verificada |
| Alternate: Coated Iron Plate | Original preservado; tradução específica não verificada |
| Iron Rod | Barra de Ferro |
| Alternate: Steel Rod | Original preservado; tradução específica não verificada |
| Alternate: Aluminum Rod | Original preservado; tradução específica não verificada |
| Wire | Fio |
| Alternate: Iron Wire | Original preservado; tradução específica não verificada |
| Alternate: Caterium Wire | Original preservado; tradução específica não verificada |
| Alternate: Fused Wire | Original preservado; tradução específica não verificada |
| Cable | Cabo |
| Alternate: Insulated Cable | Original preservado; tradução específica não verificada |
| Alternate: Quickwire Cable | Original preservado; tradução específica não verificada |
| Alternate: Coated Cable | Original preservado; tradução específica não verificada |
| Concrete | Concreto |
| Alternate: Fine Concrete | Original preservado; tradução específica não verificada |
| Alternate: Rubber Concrete | Original preservado; tradução específica não verificada |
| Alternate: Wet Concrete | Original preservado; tradução específica não verificada |
| Screw | Parafusos |
| Alternate: Cast Screw | Original preservado; tradução específica não verificada |
| Alternate: Steel Screw | Original preservado; tradução específica não verificada |
| Hog Protein | Original preservado; tradução específica não verificada |
| Spitter Protein | Original preservado; tradução específica não verificada |
| Stinger Protein | Original preservado; tradução específica não verificada |
| Hatcher Protein | Original preservado; tradução específica não verificada |
| Alien DNA Capsule | Cápsula de DNA Alienígena |
| Power Shard (1) | Original preservado; tradução específica não verificada |
| Power Shard (2) | Original preservado; tradução específica não verificada |
| Power Shard (5) | Original preservado; tradução específica não verificada |
| Biomass (Leaves) | Original preservado; tradução específica não verificada |
| Biomass (Wood) | Original preservado; tradução específica não verificada |
| Biomass (Mycelia) | Original preservado; tradução específica não verificada |
| Biomass (Alien Protein) | Original preservado; tradução específica não verificada |
| Solid Biofuel | Biocombustível Sólido |
| Steel Beam | Viga de Aço |
| Alternate: Aluminum Beam | Original preservado; tradução específica não verificada |
| Steel Pipe | Tubo de Aço |
| Alternate: Molded Steel Pipe | Original preservado; tradução específica não verificada |
| Alternate: Iron Pipe | Original preservado; tradução específica não verificada |
| Reinforced Iron Plate | Placa de Ferro Reforçada |
| Alternate: Bolted Iron Plate | Original preservado; tradução específica não verificada |
| Alternate: Stitched Iron Plate | Original preservado; tradução específica não verificada |
| Alternate: Adhered Iron Plate | Original preservado; tradução específica não verificada |
| Rotor | Rotor |
| Alternate: Steel Rotor | Original preservado; tradução específica não verificada |
| Alternate: Copper Rotor | Original preservado; tradução específica não verificada |
| Modular Frame | Estrutura Modular |
| Alternate: Steeled Frame | Original preservado; tradução específica não verificada |
| Alternate: Bolted Frame | Original preservado; tradução específica não verificada |
| Encased Industrial Beam | Viga Industrial Revestida |
| Alternate: Encased Industrial Pipe | Original preservado; tradução específica não verificada |
| Stator | Estator |
| Alternate: Quickwire Stator | Original preservado; tradução específica não verificada |
| Motor | Motor |
| Alternate: Rigor Motor | Original preservado; tradução específica não verificada |
| Alternate: Electric Motor | Original preservado; tradução específica não verificada |
| Circuit Board | Placa de Circuito |
| Alternate: Caterium Circuit Board | Original preservado; tradução específica não verificada |
| Alternate: Silicon Circuit Board | Original preservado; tradução específica não verificada |
| Alternate: Electrode Circuit Board | Original preservado; tradução específica não verificada |
| Plastic | Plástico |
| Alternate: Recycled Plastic | Original preservado; tradução específica não verificada |
| Residual Plastic | Original preservado; tradução específica não verificada |
| Fuel | Combustível |
| Residual Fuel | Original preservado; tradução específica não verificada |
| Alternate: Diluted Fuel | Original preservado; tradução específica não verificada |
| Rubber | Borracha |
| Alternate: Recycled Rubber | Original preservado; tradução específica não verificada |
| Residual Rubber | Original preservado; tradução específica não verificada |
| Petroleum Coke | Coque de Petróleo |
| Alternate: Polymer Resin | Alternativa: Resina Polimérica |
| Alternate: Heavy Oil Residue | Alternativa: Resíduo de Petróleo Pesado |
| Heavy Modular Frame | Estrutura Modular Pesada |
| Alternate: Heavy Encased Frame | Original preservado; tradução específica não verificada |
| Alternate: Heavy Flexible Frame | Original preservado; tradução específica não verificada |
| Computer | Computador |
| Alternate: Caterium Computer | Original preservado; tradução específica não verificada |
| Alternate: Crystal Computer | Original preservado; tradução específica não verificada |
| Caterium Ingot | Lingote de Caterium |
| Alternate: Pure Caterium Ingot | Original preservado; tradução específica não verificada |
| Alternate: Leached Caterium Ingot | Original preservado; tradução específica não verificada |
| Quickwire | Fio Rápido |
| Alternate: Fused Quickwire | Original preservado; tradução específica não verificada |
| Supercomputer | Supercomputador |
| Alternate: Super-State Computer | Original preservado; tradução específica não verificada |
| Alternate: OC Supercomputer | Original preservado; tradução específica não verificada |
| High-Speed Connector | Conector de Alta Velocidade |
| Alternate: Silicon High-Speed Connector | Original preservado; tradução específica não verificada |
| AI Limiter | Limitador de IA |
| Alternate: Plastic AI Limiter | Original preservado; tradução específica não verificada |
| Fabric | Tecido |
| Alternate: Polyester Fabric | Original preservado; tradução específica não verificada |
| Gas Filter | Filtro de Gás |
| Quartz Crystal | Cristal de Quartzo |
| Alternate: Pure Quartz Crystal | Original preservado; tradução específica não verificada |
| Alternate: Quartz Purification | Original preservado; tradução específica não verificada |
| Crystal Oscillator | Oscilador de Cristal |
| Alternate: Insulated Crystal Oscillator | Original preservado; tradução específica não verificada |
| Black Powder | Pólvora Negra |
| Alternate: Fine Black Powder | Original preservado; tradução específica não verificada |
| Smokeless Powder | Pólvora Sem Fumaça |
| Nobelisk | Nobelisk |
| Gas Nobelisk | Nobelisk de Gás |
| Cluster Nobelisk | Nobelisk de Fragmentação |
| Pulse Nobelisk | Nobelisk de Pulso |
| Nuke Nobelisk | Nobelisk Nuclear |
| Rifle Ammo | Munição de Rifle |
| Homing Rifle Ammo | Munição Teleguiada de Rifle |
| Turbo Rifle Ammo | Munição Turbo de Rifle |
| Turbo Rifle Ammo | Munição Turbo de Rifle |
| Alternate: Compacted Coal | Alternativa: Carvão Compactado |
| Alternate: Charcoal | Original preservado; tradução específica não verificada |
| Alternate: Biocoal | Original preservado; tradução específica não verificada |
| Turbofuel | Turbocombustível |
| Alternate: Turbo Heavy Fuel | Original preservado; tradução específica não verificada |
| Alternate: Turbo Blend Fuel | Original preservado; tradução específica não verificada |
| Rocket Fuel | Combustível de Foguete |
| Alternate: Nitro Rocket Fuel | Original preservado; tradução específica não verificada |
| Silica | Sílica |
| Alternate: Cheap Silica | Original preservado; tradução específica não verificada |
| Alternate: Distilled Silica | Original preservado; tradução específica não verificada |
| Aluminum Ingot | Lingote de Alumínio |
| Alternate: Pure Aluminum Ingot | Original preservado; tradução específica não verificada |
| Alclad Aluminum Sheet | Chapa de Alumínio |
| Aluminum Casing | Carcaça de Alumínio |
| Alternate: Alclad Casing | Original preservado; tradução específica não verificada |
| Heat Sink | Dissipador de Calor |
| Alternate: Heat Exchanger | Original preservado; tradução específica não verificada |
| Radio Control Unit | Unidade de Controle de Rádio |
| Alternate: Radio Connection Unit | Original preservado; tradução específica não verificada |
| Alternate: Radio Control System | Original preservado; tradução específica não verificada |
| Turbo Motor | Turbomotor |
| Alternate: Turbo Electric Motor | Original preservado; tradução específica não verificada |
| Alternate: Turbo Pressure Motor | Original preservado; tradução específica não verificada |
| Battery | Bateria |
| Alternate: Classic Battery | Original preservado; tradução específica não verificada |
| Encased Uranium Cell | Célula de Urânio Revestida |
| Alternate: Infused Uranium Cell | Original preservado; tradução específica não verificada |
| Non-Fissile Uranium | Original preservado; tradução específica não verificada |
| Alternate: Fertile Uranium | Original preservado; tradução específica não verificada |
| Electromagnetic Control Rod | Barra de Controle Eletromagnética |
| Alternate: Electromagnetic Connection Rod | Original preservado; tradução específica não verificada |
| Nitric Acid | Ácido Nítrico |
| Uranium Fuel Rod | Barra de Combustível de Urânio |
| Alternate: Uranium Fuel Unit | Original preservado; tradução específica não verificada |
| Plutonium Pellet | Pastilha de Plutônio |
| Encased Plutonium Cell | Célula de Plutônio Revestida |
| Alternate: Instant Plutonium Cell | Original preservado; tradução específica não verificada |
| Plutonium Fuel Rod | Barra de Combustível de Plutônio |
| Alternate: Plutonium Fuel Unit | Original preservado; tradução específica não verificada |
| Iodine-Infused Filter | Original preservado; tradução específica não verificada |
| Copper Sheet | Chapa de Cobre |
| Alternate: Steamed Copper Sheet | Original preservado; tradução específica não verificada |
| Copper Powder | Pó de Cobre |
| Empty Canister | Galão Vazio |
| Alternate: Steel Canister | Original preservado; tradução específica não verificada |
| Alternate: Coated Iron Canister | Original preservado; tradução específica não verificada |
| Packaged Fuel | Combustível Embalado |
| Alternate: Diluted Packaged Fuel | Original preservado; tradução específica não verificada |
| Unpackage Fuel | Original preservado; tradução específica não verificada |
| Packaged Turbofuel | Turbocombustível Embalado |
| Unpackage Turbo Fuel | Original preservado; tradução específica não verificada |
| Packaged Rocket Fuel | Combustível de Foguete Embalado |
| Unpackage Rocket Fuel | Original preservado; tradução específica não verificada |
| Packaged Ionized Fuel | Combustível Ionizado Embalado |
| Unpackage Ionized Fuel | Original preservado; tradução específica não verificada |
| Packaged Water | Água Embalada |
| Unpackage Water | Original preservado; tradução específica não verificada |
| Packaged Oil | Petróleo Embalado |
| Unpackage Oil | Original preservado; tradução específica não verificada |
| Packaged Heavy Oil Residue | Resíduo de Petróleo Pesado Embalado |
| Unpackage Heavy Oil Residue | Original preservado; tradução específica não verificada |
| Packaged Liquid Biofuel | Biocombustível Líquido Embalado |
| Unpackage Liquid Biofuel | Original preservado; tradução específica não verificada |
| Packaged Sulfuric Acid | Ácido Sulfúrico Embalado |
| Unpackage Sulfuric Acid | Original preservado; tradução específica não verificada |
| Packaged Alumina Solution | Solução de Alumina Embalada |
| Unpackage Alumina Solution | Original preservado; tradução específica não verificada |
| Empty Fluid Tank | Tanque de Fluido Vazio |
| Packaged Nitrogen Gas | Gás Nitrogênio Embalado |
| Unpackage Nitrogen Gas | Original preservado; tradução específica não verificada |
| Packaged Nitric Acid | Ácido Nítrico Embalado |
| Unpackage Nitric Acid | Original preservado; tradução específica não verificada |
| Liquid Biofuel | Biocombustível Líquido |
| Aluminum Scrap | Sucata de Alumínio |
| Alternate: Electrode Aluminum Scrap | Original preservado; tradução específica não verificada |
| Alternate: Instant Scrap | Original preservado; tradução específica não verificada |
| Alumina Solution | Solução de Alumina |
| Alternate: Sloppy Alumina | Original preservado; tradução específica não verificada |
| Sulfuric Acid | Ácido Sulfúrico |
| Fused Modular Frame | Estrutura Modular Fundida |
| Alternate: Heat-Fused Frame | Original preservado; tradução específica não verificada |
| Pressure Conversion Cube | Cubo de Conversão de Pressão |
| Cooling System | Sistema de Resfriamento |
| Alternate: Cooling Device | Original preservado; tradução específica não verificada |
| Smart Plating | Revestimento Inteligente |
| Alternate: Plastic Smart Plating | Original preservado; tradução específica não verificada |
| Versatile Framework | Estrutura Versátil |
| Alternate: Flexible Framework | Original preservado; tradução específica não verificada |
| Automated Wiring | Fiação Automatizada |
| Alternate: Automated Speed Wiring | Original preservado; tradução específica não verificada |
| Modular Engine | Motor Modular |
| Adaptive Control Unit | Unidade de Controle Adaptativa |
| Assembly Director System | Sistema Diretor de Montagem |
| Magnetic Field Generator | Gerador de Campo Magnético |
| Thermal Propulsion Rocket | Foguete de Propulsão Térmica |
| Nuclear Pasta | Pasta Nuclear |
| Alternate: Automated Miner | Original preservado; tradução específica não verificada |
| Reanimated SAM | SAM Reanimado |
| SAM Fluctuator | Flutuador SAM |
| Iron Rebar | Vergalhão de Ferro |
| Stun Rebar | Vergalhão Atordoante |
| Shatter Rebar | Vergalhão Estilhaçante |
| Explosive Rebar | Vergalhão Explosivo |
| Diamonds | Diamantes |
| Alternate: Petroleum Diamonds | Original preservado; tradução específica não verificada |
| Alternate: Turbo Diamonds | Original preservado; tradução específica não verificada |
| Alternate: Oil-Based Diamonds | Original preservado; tradução específica não verificada |
| Alternate: Cloudy Diamonds | Original preservado; tradução específica não verificada |
| Alternate: Pink Diamonds | Original preservado; tradução específica não verificada |
| Time Crystal | Cristal Temporal |
| Ficsite Ingot (Iron) | Original preservado; tradução específica não verificada |
| Ficsite Ingot (Caterium) | Original preservado; tradução específica não verificada |
| Ficsite Ingot (Aluminum) | Original preservado; tradução específica não verificada |
| Ficsite Trigon | Trígono de Ficsita |
| Excited Photonic Matter | Matéria Fotônica Excitada |
| Dark Matter Residue | Resíduo de Matéria Escura |
| Dark Matter Crystal | Cristal de Matéria Escura |
| Alternate: Dark Matter Crystallization | Original preservado; tradução específica não verificada |
| Alternate: Dark Matter Trap | Original preservado; tradução específica não verificada |
| Ficsonium | Ficsonium |
| Superposition Oscillator | Oscilador de Superposição |
| Neural-Quantum Processor | Processador Neural-Quântico |
| Ficsonium Fuel Rod | Barra de Combustível de Ficsonium |
| Synthetic Power Shard | Original preservado; tradução específica não verificada |
| Ionized Fuel | Combustível Ionizado |
| Alternate: Dark-Ion Fuel | Original preservado; tradução específica não verificada |
| Singularity Cell | Célula de Singularidade |
| Ballistic Warp Drive | Motor de Dobra Balístico |
| AI Expansion Server | Servidor de Expansão de IA |
| Alien Power Matrix | Matriz de Energia Alienígena |
| Iron Ore (Limestone) | Original preservado; tradução específica não verificada |
| Copper Ore (Sulfur) | Original preservado; tradução específica não verificada |
| Copper Ore (Quartz) | Original preservado; tradução específica não verificada |
| Limestone (Sulfur) | Original preservado; tradução específica não verificada |
| Coal (Limestone) | Original preservado; tradução específica não verificada |
| Coal (Iron) | Original preservado; tradução específica não verificada |
| Sulfur (Iron) | Original preservado; tradução específica não verificada |
| Sulfur (Coal) | Original preservado; tradução específica não verificada |
| Caterium Ore (Copper) | Original preservado; tradução específica não verificada |
| Caterium Ore (Quartz) | Original preservado; tradução específica não verificada |
| Raw Quartz (Coal) | Original preservado; tradução específica não verificada |
| Raw Quartz (Bauxite) | Original preservado; tradução específica não verificada |
| Bauxite (Copper) | Original preservado; tradução específica não verificada |
| Bauxite (Caterium) | Original preservado; tradução específica não verificada |
| Nitrogen Gas (Caterium) | Original preservado; tradução específica não verificada |
| Nitrogen Gas (Bauxite) | Original preservado; tradução específica não verificada |
| Uranium Ore (Bauxite) | Original preservado; tradução específica não verificada |
| Reactor Cycle (Uranium) | Original preservado; tradução específica não verificada |
| Reactor Cycle (Plutonium) | Original preservado; tradução específica não verificada |
| Alternate: Basic Iron Ingot | Original preservado; tradução específica não verificada |
| Alternate: Fused Quartz Crystal | Original preservado; tradução específica não verificada |
| Alternate: Molded Beam | Original preservado; tradução específica não verificada |
| Alternate: Tempered Caterium Ingot | Original preservado; tradução específica não verificada |
| Alternate: Tempered Copper Ingot | Original preservado; tradução específica não verificada |
| Biochemical Sculptor | Escultor Bioquímico |
| Blade Runners | Blade Runners |
| Chainsaw | Motosserra |
| Factory Cart™ | Carrinho de Fábrica™ |
| Gas Mask | Máscara de Gás |
| Golden Factory Cart™ | Carrinho de Fábrica Dourado™ |
| Hazmat Suit | Traje de Proteção |
| Hoverpack | Mochila Flutuante |
| Jetpack | Jetpack |
| Nobelisk Detonator | Detonador de Nobelisk |
| Nutritional Inhaler | Original preservado; tradução específica não verificada |
| Object Scanner | Scanner de Objetos |
| Parachute | Paraquedas |
| Portable Miner | Mineradora Portátil |
| Protein Inhaler | Original preservado; tradução específica não verificada |
| Rebar Gun | Rifle de Vergalhão |
| Rifle | Rifle |
| Therapeutic Inhaler | Original preservado; tradução específica não verificada |
| Vitamin Inhaler | Original preservado; tradução específica não verificada |
| Xeno-Basher | Xeno-Basher |
| Xeno-Zapper | Xeno-Zapper |
| Zipline | Tirolesa |

## Máquinas — convenções mantidas

| Inglês/chave estável | PT-BR do projeto |
|---|---|
| Smelter | Fundidora |
| Foundry | Fundição |
| Refinery | Refinaria |
| Constructor | Construtor |
| Assembler | Montadora |
| Manufacturer | Fabricadora |
| Blender | Misturadora |
| Particle Accelerator | Acelerador de Partículas |
| Packager | Empacotadora |
| Converter | Conversor |
| Quantum Encoder | Codificador Quântico |
| Nuclear Power Plant | Usina Nuclear |
| Coal-Powered Generator | Gerador a Carvão |
| Fuel-Powered Generator | Gerador a Combustível |
| Equipment Workshop (manual) | Oficina de Equipamentos (manual) |

A associação de tradução usa chaves estáveis dos itens e nomes originais das máquinas; os índices legados permanecem somente nos formatos/modelos existentes. Receitas personalizadas e títulos do usuário permanecem literalmente como digitados. Pendência editorial: conferir variantes e todos os títulos alternativos com o pt-BR.json original do patch antes de declarar tradução integral oficial.

