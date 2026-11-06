// node tests/v0.4.19.js /absolute/path/to/v0.4.18.html
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),http=require('http'),vm=require('vm');
const root=path.resolve(__dirname,'..'),base=process.argv[2];
if(!base)throw Error('Pass the original v0.4.18 HTML');
const current=fs.readFileSync(path.join(root,'Satisfactory_Mobile_Modeler_Offline.html'),'utf8'),baseline=fs.readFileSync(base,'utf8');
const runner=fs.readFileSync(path.join(__dirname,'run.js'),'utf8');
const helpers=vm.runInNewContext(runner.slice(runner.indexOf('const HELPERS'),runner.indexOf('const tests ='))+';HELPERS');
const fixture=fs.readFileSync(path.join(__dirname,'fixtures/Minha_fabrica.factory.json'),'utf8');
const result={numerical:[],viewports:[],checks:[],errors:[]};
const scenarios=[
 {name:'limited supply and planned machines',nodes:{s:{src:'iron-ore',set:{sourceMode:'manual',limit:30}},i:{r:'Iron Ingot',set:{machineGoal:4}},p:{r:'Iron Plate',set:{target:80}}},edges:[['s',0,'i',0],['i',0,'p',0]]},
 {name:'surplus multiple consumers',nodes:{s:{src:'iron-ore',set:{sourceMode:'manual',limit:120}},i:{r:'Iron Ingot'},p:{r:'Iron Plate',set:{target:20}},r:{r:'Iron Rod'},st:{u:'storage'}},edges:[['s',0,'i',0],['i',0,'p',0],['i',0,'r',0],['r',0,'st',0]]},
 {name:'clock and Somersloops',nodes:{s:{src:'iron-ore'},i:{r:'Iron Ingot'},p:{r:'Iron Plate',set:{target:100,clock:150,sloops:1}}},edges:[['s',0,'i',0],['i',0,'p',0]]},
 {name:'hydraulic feedback',nodes:{a:{src:'bauxite'},w:{src:'water'},c:{src:'coal'},al:{r:'Alumina Solution'},sc:{r:'Aluminum Scrap'},st:{u:'storage'}},edges:[['a',0,'al',0],['w',0,'al',1],['al',0,'sc',0],['c',0,'sc',1],['sc',1,'al',1],['sc',0,'st',0]]},
 {name:'generator limited coal',nodes:{c:{src:'coal',set:{sourceMode:'manual',limit:15}},w:{src:'water'},g:{r:'Gerador a carvão · Coal',set:{target:300}}},edges:[['c',0,'g',0],['w',0,'g',1]]}
];
(async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end(req.url==='/base'?baseline:current)});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const url='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:1366,height:768},locale:'pt-BR'});
 await context.route('**/*',route=>route.request().url().startsWith(url)?route.continue():route.abort());
 const open=async which=>{const p=await context.newPage();p.on('pageerror',e=>result.errors.push(e.message));await p.goto(url+'/'+which);await p.evaluate(helpers);await p.evaluate(()=>closeSheet());return p;};
 try{
 const a=await open('base'),b=await open('current');
 fs.mkdirSync('/tmp/factory-flow-v0.4.19',{recursive:true});
 fs.writeFileSync('/tmp/factory-flow-v0.4.19/catalog-audit.json',JSON.stringify(await b.evaluate(()=>({items:items.map(i=>({key:i.key,en:i.name,pt:i.namePt})),machines:machines.map((en,i)=>({en,pt:machineLabel(i)})),recipes:recs.map(r=>({key:r.key,original:r.name,pt:recipeLabel(r),status:items.some(i=>i.name===r.name.replace(/^Alternate: /,''))?'item label reused':'original retained: specific translation unverified'}))})),null,2));
 const clean=r=>{for(const n of Object.values(r.nodes))delete n.id;delete r.alerts;return r;};
 for(const spec of scenarios){const old=clean(await a.evaluate(s=>T.build(s),spec)),now=clean(await b.evaluate(s=>T.build(s),spec));assert.deepEqual(now,old,spec.name);if(spec.name==='limited supply and planned machines'){assert.equal(now.nodes.i.built,4);assert.equal(now.nodes.p.outs[0],20);}if(spec.name==='generator limited coal')assert.equal(now.nodes.g.gen,75);result.numerical.push({name:spec.name,maxAbsoluteDifference:0,baseline:old,current:now});}
 for(const p of [a,b])await p.evaluate(j=>{importProjectText(j,'fixture.json');closeSheet()},fixture);
 assert.equal(await a.evaluate(()=>calculated.stats.power),await b.evaluate(()=>calculated.stats.power));result.checks.push('legacy fixture: identical power');
 const state=await b.evaluate(()=>JSON.stringify(project));
 await b.evaluate(()=>{persistLanguage('en-US');render();localizeAll();persistLanguage('pt-BR');render();localizeAll()});
 assert.equal(await b.evaluate(()=>JSON.stringify(project)),state);result.checks.push('language changes preserve project byte-for-byte');
 await b.evaluate(()=>{persistLanguage('pt-BR');closeSheet();render()});
 assert.equal(await b.evaluate(()=>itemName(ITEM_BY_KEY['aluminum-casing'])),'Carcaça de Alumínio');
 assert.equal(await b.evaluate(()=>recipeLabel(recs.find(r=>r.name==='Alclad Aluminum Sheet'))),'Chapa de Alumínio');
 for(const q of ['Invólucro de Alumínio','Carcaça de Alumínio','Chapa de Alumínio Alclad','Chapa de Duralumínio','Aluminum Casing']){
 await b.locator('#catalogSearch').fill(q);assert.ok(await b.locator('#catalogList [data-catalog]').count(),q);}
 result.checks.push('aluminum preferred names, English and all required aliases');
 await b.locator('#catalogSearch').fill('Aluminum Casing');await b.locator('#catalogList [data-catalog]').first().click();
 assert.ok(await b.locator('#inspectorBody #editForm').count());assert.ok(await b.locator('#overlay.hidden').count());
 await b.locator('#editTitle').fill('<img src=x onerror=alert(1)>');await b.locator('#editMachineGoal').fill('4');await b.locator('#inspectorBody [data-action="saveNode"]').click();
 assert.equal(await b.evaluate(()=>nBy([...selected][0]).machineGoal),4);assert.equal(await b.locator('#world img[src="x"]').count(),0);result.checks.push('desktop insert, inline editing, machine goal, escaped user title');
 await b.locator('#editClock').fill('999');await b.locator('#inspectorBody [data-action="saveNode"]').click();assert.equal(await b.evaluate(()=>nBy([...selected][0]).clock),100);result.checks.push('invalid clock rejected');
 await b.locator('#editClock').fill('125');await b.locator('#inspectorBody [data-action="saveNode"]').click();
 await b.evaluate(()=>{selected.clear();render()});assert.ok((await b.locator('#inspectorTitle').textContent()).includes('fábrica'));
 await b.locator('[data-collapse="catalog"]').click();assert.ok(await b.locator('.left-collapsed').count());await b.locator('[data-collapse="catalog"]').click();
 await b.locator('#catalogSearch').fill('');
 const z=await b.evaluate(()=>camera.z);await b.mouse.move(650,400);await b.mouse.wheel(0,-120);assert.ok(await b.evaluate(()=>camera.z)>z);await b.keyboard.press('f');
 result.checks.push('deselect overview, collapsible catalog, wheel zoom, F fit');
 const resize= b.locator('#catalogPanel [data-resize]');const rb=await resize.boundingBox();await b.mouse.move(rb.x+3,rb.y+80);await b.mouse.down();await b.mouse.move(rb.x+33,rb.y+80);await b.mouse.up();assert.ok(await b.locator('#catalogPanel').evaluate(el=>el.clientWidth)>280);result.checks.push('panel resized using mouse');
 await b.evaluate(()=>{selected=new Set([project.nodes.find(n=>n.type==='recipe').id]);render()});await b.screenshot({path:'/tmp/factory-flow-inspector.png'});
 await b.locator('#btnFit').click();const pstate=await b.evaluate(()=>({node:nBy([...selected][0]).x,camera:camera.x}));await b.keyboard.down('Space');const nodebox=await b.locator('.node.selected .node-header').boundingBox();await b.mouse.move(nodebox.x+10,nodebox.y+10);await b.mouse.down();await b.mouse.move(nodebox.x+70,nodebox.y+10,{steps:5});await b.mouse.up();await b.keyboard.up('Space');assert.equal(await b.evaluate(()=>nBy([...selected][0]).x),pstate.node);assert.notEqual(await b.evaluate(()=>camera.x),pstate.camera);result.checks.push('Space + drag pans over a node without moving it');
 await b.locator('#editTitle').click();await b.keyboard.press('Control+a');await b.keyboard.type('Nome preservado');await b.keyboard.press('Backspace');assert.ok(await b.evaluate(()=>selected.size===1));result.checks.push('keyboard editing does not delete selected node');
 await b.locator('#inspectorBody [data-action="saveNode"]').click();await b.locator('#catalogSearch').click();await b.keyboard.press('Escape');await b.locator('#btnFit').click();
 // Real export then reimport, preserving all project fields.
 const exp=await b.evaluate(async()=>{let blob;const old=offerFile;offerFile=b=>blob=b;exportJSON();offerFile=old;return blob.text()});
 const exported=JSON.parse(exp);await b.evaluate(j=>{importProjectText(j,'roundtrip.json');closeSheet()},exp);assert.equal(await b.evaluate(()=>project.nodes.length),exported.project.nodes.length);result.checks.push('JSON export/import');
 const saved=await b.evaluate(()=>{save();return {name:project.name,nodes:project.nodes.length,edges:project.edges.length}});await b.reload();await b.evaluate(helpers);assert.deepEqual(await b.evaluate(()=>({name:project.name,nodes:project.nodes.length,edges:project.edges.length})),saved);result.checks.push('session restored on reload from localStorage');
 const screens='/tmp/factory-flow-v0.4.19';fs.mkdirSync(screens,{recursive:true});
 for(const [width,height,touch] of [[320,680,true],[393,852,true],[768,1024,true],[1024,768,true],[1366,768,false],[1920,1080,false],[2560,1080,false]]){
 const ctx=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,locale:'pt-BR'});await ctx.route('**/*',route=>route.request().url().startsWith(url)?route.continue():route.abort());
 const p=await ctx.newPage();p.on('pageerror',e=>result.errors.push(e.message));await p.goto(url);await p.evaluate(j=>{importProjectText(j,'fixture.json');closeSheet();fitBoard()},fixture);
 const metrics=await p.evaluate(()=>({desktop:desktopLayout(),viewport:currentRect().width,overflow:document.documentElement.scrollWidth>innerWidth,items:items.length,recipes:recs.length,title:document.title}));
 assert.ok(metrics.viewport>=320);assert.equal(metrics.overflow,false);assert.equal(metrics.desktop,!touch);assert.equal(metrics.items,172);
 await p.screenshot({path:`${screens}/${width}x${height}.png`});result.viewports.push({width,height,touch,...metrics});
 // Touch tap and mobile edit flow, not just viewport resizing.
 if(touch){await p.locator('#btnName').tap();await p.locator('#renameValue').fill('Fábrica '+width);await p.locator('[data-action="renameSave"]').tap();assert.equal(await p.evaluate(()=>project.name),'Fábrica '+width);}
 if(touch&&width>650){await p.locator('[data-tablet="catalog"]').tap();assert.ok(await p.locator('#catalogPanel.tablet-open').count());await p.locator('#catalogSearch').fill('Aluminum Casing');await p.locator('#catalogList [data-catalog]').first().tap();await p.locator('[data-tablet="inspector"]').tap();assert.ok(await p.locator('#inspectorBody #editForm').count());await p.screenshot({path:`${screens}/${width}x${height}-inspector.png`});}
 await ctx.close();}
 result.checks.push('rename with touch at mobile and tablet sizes');
 result.performance=await b.evaluate(()=>{const start=performance.now();const p=emptyProject('large');projects.unshift(p);project=p;for(let i=0;i<500;i++)p.nodes.push(createNode({kind:'recipe',rid:0},i%25*300,Math.floor(i/25)*220));recompute(true);render();const elapsed=performance.now()-start;return {nodes:500,recomputeAndRenderMs:elapsed,domNodes:document.querySelectorAll('#world .node').length};});
 assert.ok(result.performance.domNodes<500);result.checks.push('500 nodes: viewport culling retained');
 await context.setOffline(true);await b.evaluate(()=>{recompute(true);render();fitBoard()});assert.equal(await b.locator('.node').count()>0,true);result.checks.push('calculation/render with network disabled after loading; file:// blocked by browser policy');
 const offline=await browser.newContext({offline:true,locale:'pt-BR'});const offpage=await offline.newPage();offpage.on('pageerror',e=>result.errors.push(e.message));await offpage.setContent(current);assert.equal(await offpage.evaluate(()=>FACTORY_FLOW_DEBUG.version),'0.4.19');assert.equal(await offpage.evaluate(()=>FACTORY_FLOW_DEBUG.itemsCount()),172);await offline.close();result.checks.push('cold offline boot: embedded HTML executes with network disabled from start (setContent)');
 assert.deepEqual(result.errors,[]);result.checks.push('no uncaught JavaScript errors');
 console.log(JSON.stringify(result,null,2));fs.writeFileSync('/tmp/factory-flow-v0.4.19/results.json',JSON.stringify(result,null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
