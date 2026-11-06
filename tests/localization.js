// Regression coverage for untranslated UI, default labels and user-text preservation.
// Run: CHROMIUM_PATH=/usr/bin/chromium node tests/localization.js [--audit]
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('playwright');
const html=fs.readFileSync(path.join(__dirname,'../Satisfactory_Mobile_Modeler_Offline.html'),'utf8');
const residual=/[áàâãéêíóôõúç]|\b(?:Toque|toque|Monte|Comece|Nenhum|Nenhuma|blocos|copiados|salvos|recebe|primeiro|depois|entrada|salvamento|Salvamento|Demanda|demanda|precisa|acima|baixo|itens|ligada|ligado|faltam|pede|receita|plano|Plano|vazio|vazia|destino|estoque|salvar|contagem|em|uma|para|com|ou|de|da|sua|seu|fora|capacidade|quantidade|Selecione|Use dois)\b/u;
(async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end(html)});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const findings=[],errors=[],texts=new Set(),checks=[];let screens=0;
 try{for(const width of [393,1366]){
 const ctx=await browser.newContext({viewport:{width,height:852},locale:'en-US',hasTouch:width===393,isMobile:width===393});const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:'+server.address().port);
 await page.evaluate(()=>{persistLanguage('en-US');project=emptyProject('User factory');projects=[project];selected.clear();recompute(true);closeSheet();render();localizeAll()});
 const scan=async name=>{screens++;await page.evaluate(()=>localizeAll());const values=await page.evaluate(()=>{
 const root=$('overlay').classList.contains('hidden')?$('app'):document.querySelector('#overlay .sheet');const out=[];
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(walker.nextNode()){const n=walker.currentNode,p=n.parentElement;if(!p||p.closest('script,style,.user-project-name,.planname,.note-content,[data-user-text]')||!p.getClientRects().length)continue;const text=n.nodeValue.trim();if(text)out.push({text,original:uiOriginalTexts.get(n)?.original.trim()||text});}
 for(const el of root.querySelectorAll('[placeholder],[aria-label],[title]'))if(el.getClientRects().length)for(const key of ['placeholder','aria-label','title'])if(el.hasAttribute(key))out.push({text:el.getAttribute(key),original:el.getAttribute('data-l10n-original-'+key)||el.getAttribute(key)});return out;});
 for(const {text,original} of values){texts.add(text);if(residual.test(text))findings.push({width,screen:name,text,original});}};
 await scan('empty factory');
 if(width===1366)await page.screenshot({path:'/tmp/factory-flow-english-desktop.png'});
 for(const fn of ['openMenu','projectsSheet','openSettings','helpSheet','creditsSheet','summarySheet','openAlerts','generatorSheet','customRecipeSheet','locatorSheet','insertTemplate','renameProject','deleteProject']){await page.evaluate(fn=>{closeSheet();window[fn]()},fn);await scan(fn);}
 await page.evaluate(()=>{closeSheet();openPicker()});await scan('picker');for(const tab of ['recipes','resources','utils']){await page.evaluate(tab=>{pickerContext.tab=tab;refreshPicker()},tab);await scan('picker '+tab);}
 const kinds=['source','splitter','priority_splitter','merger','priority_merger','storage','depot','sink','output','outpost','blueprint','port_in','port_out','note'];
 for(const kind of kinds){await page.evaluate(kind=>{closeSheet();project.nodes=[];project.edges=[];let n=createNode(kind==='source'?{kind:'source',item:ITEM_BY_KEY.water}:{kind:'util',key:kind},0,0);if(kind!=='source')n.item=ITEM_BY_KEY['iron-ingot'];project.nodes.push(n);selected=new Set([n.id]);recompute(true);inspectNode(n.id)},kind);await scan('editor '+kind);}
 for(const name of ['Iron Plate','Gerador a carvão · Coal','Reactor Cycle (Ficsonium)','Alumina Solution']){await page.evaluate(name=>{closeSheet();project.nodes=[];project.edges=[];const r=recs.find(r=>r.name===name),n=createNode({kind:'recipe',rid:r.id},0,0);project.nodes.push(n);selected=new Set([n.id]);recompute(true);inspectNode(n.id)},name);await scan('recipe '+name);await page.evaluate(()=>{closeSheet();openAlerts()});await scan('alerts '+name);}
 await page.evaluate(()=>{closeSheet();const n=project.nodes[0];portEditor({nid:n.id,io:'out',index:0})});await scan('port editor');
 await page.evaluate(()=>{closeSheet();const s=createNode({kind:'source',item:ITEM_BY_KEY['iron-ore']},0,0),r=createNode({kind:'recipe',rid:0},300,0);project.nodes=[s,r];project.edges=[{id:id(),board:'root',from:s.id,fi:0,to:r.id,ti:0,tier:1}];recompute(true);edgeEditor(project.edges[0])});await scan('connection editor');
 await page.evaluate(()=>{closeSheet();toast('Salvamento local indisponível. Exporte um arquivo JSON!',true)});await scan('storage warning');
 // These assertions fail if the screenshot's bug or protected-input bug returns.
 if(!process.argv.includes('--audit')){
 await page.evaluate(()=>{closeSheet();project.nodes=[];project.edges=[];recompute(true);render();localizeAll()});
 assert.match(await page.locator('#hint').innerText(),/Build your factory/);assert.match(await page.locator('#breadcrumbs').innerText(),/Main plan/);
 await page.evaluate(()=>openPicker());assert.match(await page.locator('#pickerSearch').getAttribute('placeholder'),/^Search/);
 const model=await page.evaluate(()=>JSON.stringify(project));
 for(let i=0;i<3;i++){await page.evaluate(()=>{persistLanguage('pt-BR');localizeAll()});assert.match(await page.locator('#pickerSearch').getAttribute('placeholder'),/^Buscar/);await page.evaluate(()=>{persistLanguage('en-US');localizeAll()});assert.match(await page.locator('#pickerSearch').getAttribute('placeholder'),/^Search/);}
 assert.equal(await page.evaluate(()=>JSON.stringify(project)),model);
 await page.evaluate(()=>{closeSheet();customRecipeSheet()});assert.equal(await page.locator('#customName').inputValue(),'My recipe');
 await page.evaluate(()=>{closeSheet();toast('Salvamento local indisponível. Exporte um arquivo JSON!',true)});assert.match(await page.locator('#toast').innerText(),/Local storage unavailable/);
 const invariant=await page.evaluate(()=>{const n=createNode({kind:'util',key:'note'},0,0);n.title='Minha fábrica';n.note='Toque em um nó';project.nodes=[n];selected=new Set([n.id]);recompute(true);const before=JSON.stringify(project);persistLanguage('pt-BR');render();localizeAll();persistLanguage('en-US');render();localizeAll();return {same:before===JSON.stringify(project),title:document.querySelector('.node-title,.lodm-title,.lodc-title')?.textContent,note:document.querySelector('.note-content')?.textContent}});assert.equal(invariant.same,true);assert.equal(invariant.title,'Minha fábrica');assert.equal(invariant.note,'Toque em um nó');
 const csv=await page.evaluate(async()=>{let blob;const old=offerFile;offerFile=b=>blob=b;exportCSV();offerFile=old;return blob.text()});assert.ok(csv.includes('Minha fábrica'));assert.ok(!residual.test(csv.replace('Minha fábrica','')),'CSV includes Portuguese system labels');
 await page.evaluate(()=>{closeSheet();const n=createNode({kind:'recipe',rid:0},0,0);n.title='Minha fábrica';project.nodes=[n];project.edges=[];selected=new Set([n.id]);recompute(true);summarySheet()});await page.evaluate(()=>localizeAll());assert.ok((await page.locator('#sheetBody').innerText()).includes('Minha fábrica'),'Summary translated a user name');
 await page.evaluate(()=>{closeSheet();openAlerts()});await page.evaluate(()=>localizeAll());assert.ok((await page.locator('#sheetBody').innerText()).includes('Minha fábrica'),'Alert translated a user name');
 const zoom=await page.evaluate(()=>{const old=camera.z;camera.z=.015;persistLanguage('en-US');const en=zoomText();persistLanguage('pt-BR');const pt=zoomText();persistLanguage('en-US');camera.z=old;return{en,pt}});assert.equal(zoom.en,'1.5%');assert.equal(zoom.pt,'1,5%');
 await page.evaluate(()=>{closeSheet();const n=createNode({kind:'util',key:'outpost'},0,0);project.nodes=[n];project.edges=[];project.boards.push({id:n.boardId,parent:'root',name:'Novo outpost'});recompute(true);enterBoard(n);localizeAll()});assert.match(await page.locator('#breadcrumbs').innerText(),/New outpost/);
 checks.push('home, breadcrumb, placeholder, storage warning, roundtrip and user text: '+width);
 }
 await ctx.close();}
 const offline=await browser.newContext({locale:'en-US',viewport:{width:393,height:852}});const off=await offline.newPage();await off.setContent(html);await off.evaluate(()=>save());assert.match(await off.locator('#toast').innerText(),/Local storage unavailable/);await off.screenshot({path:'/tmp/factory-flow-english-mobile.png'});await offline.close();checks.push('save without storage in an opaque origin: English warning and homepage');
 fs.writeFileSync('/tmp/factory-flow-localization-audit.json',JSON.stringify({checks,errors,findings,screens,texts:[...texts]},null,2));console.log(JSON.stringify({checks,errors,screens,findings:findings.length},null,2));
 if(!process.argv.includes('--audit')){assert.deepEqual(errors,[]);assert.deepEqual(findings,[],'Untranslated Portuguese UI; see /tmp/factory-flow-localization-audit.json');}
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
