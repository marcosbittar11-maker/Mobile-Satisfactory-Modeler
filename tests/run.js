// Testes de regressão do Factory Flow. Uso: node tests/run.js [caminho/do/arquivo.html]
// Requer Playwright + Chromium (require('playwright')).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HTML = path.resolve(process.argv[2] || path.join(ROOT, 'Satisfactory_Mobile_Modeler_Offline.html'));
const FIXTURE = fs.readFileSync(path.join(__dirname, 'fixtures', 'Minha_fabrica.factory.json'), 'utf8');

// Funções auxiliares injetadas na página.
const HELPERS = () => {
  window.T = {};
  T.R = k => { const r = recs.find(r => r.name === k); if (!r) throw Error('receita? ' + k); return r.id; };
  T.I = k => { const i = ITEM_BY_KEY[k]; if (i == null) throw Error('item? ' + k); return i; };
  // spec: {nodes:{nome:{r|src|u, set, item}}, edges:[[a,fi,b,ti]]}
  T.build = spec => {
    const p = emptyProject('teste'); projects.unshift(p); project = p; history = []; future = []; selected.clear();
    const ids = {};
    for (const [k, v] of Object.entries(spec.nodes)) {
      let n;
      if (v.r) n = createNode({ kind: 'recipe', rid: T.R(v.r) }, 0, 0);
      else if (v.src) n = createNode({ kind: 'source', item: T.I(v.src) }, 0, 0);
      else n = createNode({ kind: 'util', key: v.u }, 0, 0);
      if (v.item) n.item = T.I(v.item);
      Object.assign(n, v.set || {});
      ids[k] = n.id; p.nodes.push(n);
    }
    for (const [a, fi, b, ti] of spec.edges) p.edges.push({ id: id(), board: 'root', from: ids[a], fi, to: ids[b], ti });
    normalizeProject(); recompute(true); render();
    return T.read(ids);
  };
  T.read = ids => {
    const out = {};
    for (const [k, nid] of Object.entries(ids)) {
      const s = calculated.nodes[nid];
      out[k] = { id: nid, m: s.machines || 0, built: s.built, ins: Object.values(s.actualIns || {}), need: Object.values(s.neededIns || {}), outs: Object.values(s.actualOuts || {}), pw: s.power || 0, gen: s.gen || 0 };
    }
    return { nodes: out, alerts: calculated.stats.alerts.map(a => ({ sev: a.sev, title: a.title, material: a.material, detail: a.detail })), power: calculated.stats.power };
  };
};

const tests = [];
const test = (name, fn) => tests.push({ name, fn });
const near = (a, b, msg, eps = 1e-6) => { if (!(Math.abs(a - b) <= eps * Math.max(1, Math.abs(b)))) throw Error(`${msg}: esperado ${b}, obtido ${a}`); };
const ok = (c, msg) => { if (!c) throw Error(msg); };

// ---------- cálculo: comportamentos já corretos (regressão) ----------
test('JSON de exemplo: migração v0.4.18 sem energia de extratoras abstratas', async page => {
  const r = await page.evaluate(j => {
    importProjectText(j, 'x.factory.json'); closeSheet();
    const by = rid => calculated.nodes[project.nodes.find(n => n.rid === rid).id].machines;
    return { power: calculated.stats.power, ingot: by(0), steel: by(9), beam: by(46), pipe: by(48) };
  }, FIXTURE);
  near(r.power, 81.6, 'energia'); near(r.ingot, 4, 'smelters'); near(r.steel, 3, 'foundries'); near(r.beam, 1.5, 'Steel Beam'); near(r.pipe, 3, 'Steel Pipe');
});
test('Overclock 150% + última máquina subclockada + shards', async page => {
  const r = await page.evaluate(() => T.build({ nodes: { s: { src: 'iron-ore' }, i: { r: 'Iron Ingot' }, p: { r: 'Iron Plate', set: { target: 100, clock: 150 } } }, edges: [['s', 0, 'i', 0], ['i', 0, 'p', 0]] }));
  near(r.nodes.p.m, 10 / 3, 'máquinas'); near(r.nodes.p.pw, 3 * 4 * Math.pow(1.5, 1.321928) + 4 * Math.pow(0.5, 1.321928), 'energia', 1e-4);
});
test('Somersloop dobra a saída e eleva energia ao quadrado', async page => {
  const r = await page.evaluate(() => T.build({ nodes: { s: { src: 'iron-ore' }, i: { r: 'Iron Ingot' }, p: { r: 'Iron Plate', set: { target: 100, sloops: 1 } } }, edges: [['s', 0, 'i', 0], ['i', 0, 'p', 0]] }));
  near(r.nodes.p.m, 2.5, 'máquinas'); near(r.nodes.p.pw, 38.4, 'energia', 1e-4); near(r.nodes.i.outs[0], 75, 'lingotes');
});
test('Ciclo Recycled Plastic/Rubber converge', async page => {
  const r = await page.evaluate(() => T.build({ nodes: { oil: { src: 'crude-oil' }, fuel: { r: 'Fuel' }, rp: { r: 'Alternate: Recycled Plastic' }, rr: { r: 'Alternate: Recycled Rubber' }, out: { u: 'output', item: 'rubber', set: { target: 60 } }, sk: { u: 'sink' } }, edges: [['oil', 0, 'fuel', 0], ['fuel', 0, 'rp', 1], ['fuel', 0, 'rr', 1], ['rp', 0, 'rr', 0], ['rr', 0, 'rp', 0], ['rr', 0, 'out', 0], ['fuel', 1, 'sk', 0]] }));
  near(r.nodes.rr.m, 4 / 3, 'Recycled Rubber', 1e-4); near(r.nodes.fuel.m, 1.5, 'Fuel', 1e-4); near(r.nodes.out.ins[0], 60, 'entrega', 1e-4);
});
test('Gerador a carvão por meta de MW', async page => {
  const r = await page.evaluate(() => T.build({ nodes: { c: { src: 'coal' }, w: { src: 'water' }, g: { r: 'Gerador a carvão · Coal', set: { target: 300 } } }, edges: [['c', 0, 'g', 0], ['w', 0, 'g', 1]] }));
  near(r.nodes.g.m, 4, 'geradores'); near(r.nodes.g.gen, 300, 'MW'); near(r.nodes.c.outs[0], 60, 'carvão');
});
test('Gerador automático: Modular Engine 2,5/min', async page => {
  const r = await page.evaluate(() => {
    generatorSheet(); $('genProduct').value = String(ITEM_BY_KEY['modular-engine']); $('genProduct').dispatchEvent(new Event('change')); $('genRate').value = '2,5'; runGenerator();
    const s = {}; for (const [k, v] of Object.entries(calculated.stats.sources)) s[itemName(+k)] = v; return { s, alerts: calculated.stats.alerts.length };
  });
  near(r.s['Iron Ore'], 273.75, 'ferro'); near(r.s['Copper Ore'], 40, 'cobre'); near(r.s['Coal'], 45, 'carvão'); near(r.s['Crude Oil'], 56.25, 'petróleo'); ok(r.alerts === 0, 'sem alertas');
});
test('Sobra de fonte fixa vai para ramo sem meta (v0.4.4)', async page => {
  const r = await page.evaluate(() => T.build({ nodes: { s: { src: 'iron-ore', set: { sourceMode: 'manual', limit: 120 } }, i: { r: 'Iron Ingot' }, p: { r: 'Iron Plate', set: { target: 20 } }, rod: { r: 'Iron Rod' }, st: { u: 'storage' } }, edges: [['s', 0, 'i', 0], ['i', 0, 'p', 0], ['i', 0, 'rod', 0], ['rod', 0, 'st', 0]] }));
  near(r.nodes.rod.m, 6, 'Iron Rod'); near(r.nodes.p.outs[0], 20, 'placas');
});
test('Outpost: cálculo atravessa as portas', async page => {
  const r = await page.evaluate(() => {
    const p = emptyProject('op'); projects.unshift(p); project = p;
    const src = createNode({ kind: 'source', item: T.I('iron-ore') }, 0, 0), sm = createNode({ kind: 'recipe', rid: T.R('Iron Ingot') }, 300, 0), op = createNode({ kind: 'util', key: 'outpost' }, 600, 0), goal = createNode({ kind: 'util', key: 'output' }, 900, 0);
    goal.item = T.I('iron-plate'); goal.target = 20; p.boards.push({ id: op.boardId, name: 'Outpost', parent: 'root' });
    const pin = { ...createNode({ kind: 'util', key: 'port_in' }, 0, 0), board: op.boardId, item: T.I('iron-ingot'), order: 1 };
    const pl = { ...createNode({ kind: 'recipe', rid: T.R('Iron Plate') }, 300, 0), board: op.boardId };
    const pout = { ...createNode({ kind: 'util', key: 'port_out' }, 600, 0), board: op.boardId, item: T.I('iron-plate'), order: 2 };
    p.nodes.push(src, sm, op, goal, pin, pl, pout);
    p.edges.push({ id: id(), board: 'root', from: src.id, fi: 0, to: sm.id, ti: 0 }, { id: id(), board: 'root', from: sm.id, fi: 0, to: op.id, ti: 0 }, { id: id(), board: 'root', from: op.id, fi: 0, to: goal.id, ti: 0 }, { id: id(), board: op.boardId, from: pin.id, fi: 0, to: pl.id, ti: 0 }, { id: id(), board: op.boardId, from: pl.id, fi: 0, to: pout.id, ti: 0 });
    normalizeProject(); recompute(true); render();
    const before = { goal: calculated.nodes[goal.id].actualIns[0], plates: calculated.nodes[pl.id].machines };
    // P0-3: copiar/colar o outpost deve clonar a área interna
    selected = new Set([op.id]); copySelection(); pasteSelection();
    const pasted = project.nodes.find(n => n.type === 'outpost' && n.id !== op.id);
    const inner = pasted?.boardId ? project.nodes.filter(n => n.board === pasted.boardId) : [];
    const innerEdges = pasted?.boardId ? project.edges.filter(e => e.board === pasted.boardId).length : 0;
    // duplicar (pela seleção) também
    return { before, pastedBoard: !!(pasted?.boardId && project.boards.some(b => b.id === pasted.boardId)), inner: inner.length, innerEdges, ports: pasted ? ports(pasted) : null, boards: project.boards.length };
  });
  near(r.before.goal, 20, 'entrega'); near(r.before.plates, 1, 'placas');
  ok(r.pastedBoard, 'outpost colado sem área (P0-3)'); ok(r.inner === 3, 'nós internos clonados: ' + r.inner); ok(r.innerEdges === 2, 'ligações internas: ' + r.innerEdges);
  ok(r.ports.ins.length === 1 && r.ports.outs.length === 1, 'portas do outpost colado'); ok(r.boards === 3, 'boards: ' + r.boards);
});

// ---------- bugs P0 ----------
test('P0-1: resultado independe da ordem dos nós', async page => {
  const r = await page.evaluate(() => {
    const a = T.build({ nodes: { fe: { src: 'iron-ore' }, cu: { src: 'copper-ore' }, al: { r: 'Alternate: Iron Alloy Ingot' } }, edges: [['fe', 0, 'al', 0], ['cu', 0, 'al', 1]] });
    const b = T.build({ nodes: { cu: { src: 'copper-ore' }, fe: { src: 'iron-ore' }, al: { r: 'Alternate: Iron Alloy Ingot' } }, edges: [['fe', 0, 'al', 0], ['cu', 0, 'al', 1]] });
    return [a.nodes.al.m, b.nodes.al.m];
  });
  near(r[0], r[1], 'foundries (ordem A × B)');
});
test('P0-2: extratora antiga migra para oferta fixa equivalente (v0.4.18)', async page => {
  const r = await page.evaluate(j => {
    importProjectText(j, 'x.factory.json'); closeSheet();
    const n = project.nodes.find(n => n.type === 'source' && n.item === 0);
    const before = { power: calculated.stats.power, sub: nodeSubtitle(n) };
    selected = new Set([n.id]); inspectNode(n.id); saveNodeEdit();
    const m = nBy(n.id);
    return { before, after: { power: calculated.stats.power, mode: m.sourceMode, machine: m.sourceMachine, cap: sourceCap(m) } };
  }, FIXTURE);
  ok(/120/.test(r.before.sub), 'oferta antiga deve ser preservada');
  near(r.after.power, r.before.power, 'energia após salvar sem mudanças'); ok(r.after.machine === 'external' && r.after.mode === 'manual', 'fonte abstrata fixa'); near(r.after.cap, 120, 'teto');
});
test('P0-2: oferta manual fixa limita fluxo sem gerar energia fictícia', async page => {
  const r = await page.evaluate(() => {
    const x = T.build({ nodes: { s: { src: 'iron-ore' }, i: { r: 'Iron Ingot' }, st: { u: 'storage' } }, edges: [['s', 0, 'i', 0], ['i', 0, 'st', 0]] });
    const n = nBy(x.nodes.s.id); selected = new Set([n.id]); inspectNode(n.id);
    $('editSourceMode').value = 'manual'; $('editSourceMode').dispatchEvent(new Event('change'));
    $('editManualRate').value = '1200';
    saveNodeEdit(); const c = calculated.nodes[n.id];
    return { cap: sourceCap(nBy(n.id)), flow: c.actualOuts[0], power: c.power };
  });
  near(r.cap, 1200, 'teto manual'); near(r.power, 0, 'entrada externa sem equipamento'); near(r.flow, 1200, 'fluxo');
});
test('P0-4: divisor prioritário manda o transbordo para a saída 2', async page => {
  const r = await page.evaluate(() => T.build({ nodes: { s: { src: 'iron-ore', set: { sourceMode: 'manual', limit: 120 } }, i: { r: 'Iron Ingot' }, sp: { u: 'priority_splitter' }, rod: { r: 'Iron Rod', set: { limit: 1 } }, pl: { r: 'Iron Plate', set: { limit: 10 } }, s1: { u: 'storage' }, s2: { u: 'storage' } }, edges: [['s', 0, 'i', 0], ['i', 0, 'sp', 0], ['sp', 0, 'rod', 0], ['sp', 1, 'pl', 0], ['rod', 0, 's1', 0], ['pl', 0, 's2', 0]] }));
  near(r.nodes.i.outs[0], 120, 'lingotes usados'); near(r.nodes.rod.ins[0], 15, 'barra'); near(r.nodes.pl.ins[0], 105, 'transbordo para placa');
});
test('P0-4: pesos do divisor refletidos na necessidade (sem falta falsa)', async page => {
  const r = await page.evaluate(() => T.build({ nodes: { s: { src: 'iron-ore', set: { sourceMode: 'manual', limit: 120 } }, sp: { u: 'splitter', set: { weights: [1, 1, 2] } }, a: { u: 'storage' }, b: { u: 'storage' }, c: { u: 'storage' } }, edges: [['s', 0, 'sp', 0], ['sp', 0, 'a', 0], ['sp', 1, 'b', 0], ['sp', 2, 'c', 0]] }));
  near(r.nodes.a.ins[0], 30, 'a'); near(r.nodes.c.ins[0], 60, 'c'); near(r.nodes.a.need[0], 30, 'necessidade a'); near(r.nodes.c.need[0], 60, 'necessidade c');
});
test('R1: meta não atingida gera alerta', async page => {
  const r = await page.evaluate(() => T.build({ nodes: { s: { src: 'iron-ore' }, i: { r: 'Iron Ingot', set: { target: 60 } }, p: { r: 'Iron Plate', set: { limit: 1 } } }, edges: [['s', 0, 'i', 0], ['i', 0, 'p', 0]] }));
  ok(r.alerts.some(a => a.title === 'Iron Ingot'), 'nenhum alerta para meta 60 entregando 30');
});

// ---------- UI ----------
test('P1-1: aba Tudo mostra recursos e logística', async page => {
  const r = await page.evaluate(() => { openPicker(); const k = [...document.querySelectorAll('#pickerList .pickitem')].map(b => b.dataset.pick.split(':')[0]); closeSheet(); return [...new Set(k)]; });
  ok(r.includes('source') && r.includes('util') && r.includes('recipe'), 'tipos mostrados: ' + r);
});
test('P1-2: botão de alertas visível em 320 px', async page => {
  await page.setViewportSize({ width: 320, height: 640 });
  const r = await page.evaluate(() => { render(); const b = document.querySelector('#stats [data-action]'); return b && getComputedStyle(b).display !== 'none' && b.getBoundingClientRect().right <= innerWidth; });
  await page.setViewportSize({ width: 390, height: 844 });
  ok(r, 'botão de status escondido');
});
test('P1-3: toast não cobre a sheet aberta', async page => {
  const r = await page.evaluate(() => { openMenu(); toast('teste'); const t = $('toast').getBoundingClientRect(), s = document.querySelector('.sheet').getBoundingClientRect(); const overlap = t.bottom > s.top && t.top < s.bottom; closeSheet(); return !overlap; });
  ok(r, 'toast sobre a sheet');
});
test('P1-5/6: textos ("esteira mais rápida", "/min")', async page => {
  const r = await page.evaluate(() => {
    const x = T.build({ nodes: { s: { src: 'iron-ore' }, i: { r: 'Iron Ingot', set: { target: 1500 } } }, edges: [['s', 0, 'i', 0]] });
    return { alert: x.alerts.map(a => a.detail).join(' '), label: edgeLabel(project.edges[0]) };
  });
  ok(/esteira mais rápida liberada/.test(r.alert), r.alert); ok(!/\/m(\b|$)/.test(r.label.replace(/\/min/g, '')), 'rótulo: ' + r.label);
});
test('P1-7: arrastar move toda a seleção', async page => {
  const r = await page.evaluate(() => {
    const x = T.build({ nodes: { a: { r: 'Iron Ingot' }, b: { r: 'Iron Plate' } }, edges: [] });
    const a = nBy(x.nodes.a.id), b = nBy(x.nodes.b.id); b.x = 400; render();
    selected = new Set([a.id, b.id]); camera = { x: 20, y: 250, z: 1 }; updateCamera(); render();
    const el = document.querySelector(`[data-node="${a.id}"] .node-title`), rc = el.getBoundingClientRect();
    return { x: rc.left + 5, y: rc.top + 5, a: a.id, b: b.id };
  });
  await page.mouse.move(r.x, r.y); await page.mouse.down(); await page.mouse.move(r.x + 60, r.y + 40, { steps: 6 }); await page.mouse.up();
  const pos = await page.evaluate(([a, b]) => [nBy(a).x, nBy(b).x], [r.a, r.b]);
  near(pos[0], 60, 'nó arrastado', 1e-3); near(pos[1], 460, 'outro nó selecionado', 1e-3);
});
test('P1-8: reconectar portas já ligadas não apaga a ligação', async page => {
  const r = await page.evaluate(() => {
    const x = T.build({ nodes: { s: { src: 'iron-ore' }, i: { r: 'Iron Ingot' } }, edges: [['s', 0, 'i', 0]] });
    connect({ nid: x.nodes.s.id, io: 'out', index: 0 }, { nid: x.nodes.i.id, io: 'in', index: 0 }); return project.edges.length;
  });
  ok(r === 1, 'ligação removida');
});

// ---------- funções novas da v0.4.5 ----------
test('Modelo com outpost: salvar, inserir e excluir', async page => {
  const r = await page.evaluate(() => {
    const p = emptyProject('tpl'); projects.unshift(p); project = p;
    const op = createNode({ kind: 'util', key: 'outpost' }, 0, 0); p.boards.push({ id: op.boardId, name: 'O', parent: 'root' });
    const pin = { ...createNode({ kind: 'util', key: 'port_in' }, 0, 0), board: op.boardId, item: T.I('iron-ingot'), order: 1 };
    const pl = { ...createNode({ kind: 'recipe', rid: T.R('Iron Plate') }, 300, 0), board: op.boardId };
    p.nodes.push(op, pin, pl); p.edges.push({ id: id(), board: op.boardId, from: pin.id, fi: 0, to: pl.id, ti: 0 }); normalizeProject(); recompute(true); render();
    localStorage.removeItem('factory_flow_templates_v1');
    selected = new Set([op.id]); saveTemplate(); $('templateName').value = 'Placas'; saveTemplateConfirm();
    insertTemplate(); document.querySelector('[data-template="0"]').click();
    const copies = project.nodes.filter(n => n.type === 'outpost');
    const inner = copies.map(c => project.nodes.filter(n => n.board === c.boardId).length);
    insertTemplate(); document.querySelector('[data-deltemplate="0"]').click(); closeSheet();
    return { copies: copies.length, inner, left: readTemplates().length };
  });
  ok(r.copies === 2, 'outposts: ' + r.copies); ok(r.inner.every(x => x === 2), 'nós internos: ' + r.inner); ok(r.left === 0, 'modelo não excluído');
});
test('Geradores: Compacted Coal, Petroleum Coke e Ficsonium', async page => {
  const r = await page.evaluate(() => {
    const g = k => { const rc = recs.find(r => r.name === k); return { gen: rc.gen, ins: rc.ins.map(p => [itemName(p.item), p.qty * 60 / rc.duration]) }; };
    return [g('Gerador a carvão · Compacted Coal'), g('Gerador a carvão · Petroleum Coke'), g('Reactor Cycle (Ficsonium)')];
  });
  near(r[0].gen, 75, 'MW'); near(r[0].ins[0][1], 75 * 60 / 630, 'Compacted Coal/min'); near(r[1].ins[0][1], 25, 'Petroleum Coke/min');
  near(r[2].gen, 2500, 'nuclear MW'); near(r[2].ins[0][1], 1, 'Ficsonium rod/min'); near(r[2].ins[1][1], 240, 'água');
});
test('Resumo mostra máquinas por tipo e balanço por item', async page => {
  const r = await page.evaluate(j => { importProjectText(j, 'x.factory.json'); closeSheet(); summarySheet(); return $('sheetBody').textContent; }, FIXTURE);
  ok(/Máquinas por tipo|Machines by type/.test(r) && /Foundry/.test(r), 'tipos'); ok(/Balanço por item|Per-item balance/.test(r) && /Steel Ingot/.test(r), 'balanço');
});
test('Importação antiga com receitas inconsistentes avisa; a do exemplo não', async page => {
  const r = await page.evaluate(j => {
    importProjectText(j, 'ok.json'); const okTitle = $('overlay').classList.contains('hidden') ? '' : $('sheetTitle').textContent; closeSheet();
    const d = JSON.parse(j); d.project.nodes.find(n => n.rid === 9).rid = 12; importProjectText(JSON.stringify(d), 'bad.json');
    return { okTitle, bad: $('sheetTitle').textContent };
  }, FIXTURE);
  ok(r.okTitle === '', 'aviso indevido no exemplo: ' + r.okTitle); ok(r.bad === 'Confira a importação', 'sem aviso: ' + r.bad);
});
test('Export inclui versão do app e do catálogo; receita personalizada funciona', async page => {
  const r = await page.evaluate(() => {
    T.build({ nodes: {}, edges: [] });
    customRecipeSheet(); $('customName').value = 'Teste'; $('customInItem1').value = String(T.I('iron-ingot')); $('customInQty1').value = '2'; $('customOutItem1').value = String(T.I('iron-plate')); $('customOutQty1').value = '1'; $('customTime').value = '6'; saveCustom();
    const n = project.nodes.at(-1); const machinesOpt = [...document.querySelectorAll('#customMachine option')].length;
    return { type: n.type, note: 'note' in n, m: calculated.nodes[n.id].machines, ins: calculated.nodes[n.id].neededIns[0], src: exportJSON.toString().includes('APP_VERSION') };
  });
  ok(r.type === 'recipe' && !r.note, 'nó personalizado'); near(r.m, 1, 'máquinas'); near(r.ins, 20, 'consumo'); ok(r.src, 'export sem versão');
});
test('Arraste em grupo é desfeito em um passo', async page => {
  const r = await page.evaluate(() => {
    const x = T.build({ nodes: { a: { r: 'Iron Ingot' }, b: { r: 'Iron Plate', set: { x: 400 } } }, edges: [] });
    selected = new Set([x.nodes.a.id, x.nodes.b.id]); camera = { x: 20, y: 250, z: 1 }; updateCamera(); render();
    const rc = document.querySelector(`[data-node="${x.nodes.a.id}"] .node-title`).getBoundingClientRect(); return { x: rc.left + 5, y: rc.top + 5, a: x.nodes.a.id, b: x.nodes.b.id };
  });
  await page.mouse.move(r.x, r.y); await page.mouse.down(); await page.mouse.move(r.x + 50, r.y, { steps: 5 }); await page.mouse.up();
  const u = await page.evaluate(([a, b]) => { undo(); return [nBy(a).x, nBy(b).x]; }, [r.a, r.b]);
  near(u[0], 0, 'a após desfazer'); near(u[1], 400, 'b após desfazer');
});

(async () => {
  const server = require('http').createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(fs.readFileSync(HTML)); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
  let fail = 0;
  for (const t of tests) {
    const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: false, hasTouch: true })).newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    await page.goto('http://127.0.0.1:' + server.address().port); await page.waitForTimeout(150); await page.evaluate(HELPERS);
    try { await t.fn(page); if (errors.length) throw Error('erro JS: ' + errors.join(' | ')); console.log('✓ ' + t.name); }
    catch (e) { fail++; console.log('✗ ' + t.name + '\n    ' + e.message); }
    await page.context().close();
  }
  await browser.close();
  server.close();
  console.log(`\n${tests.length - fail}/${tests.length} testes passaram`);
  process.exit(fail ? 1 : 0);
})();

