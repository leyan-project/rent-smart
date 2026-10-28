const assert=require('node:assert/strict');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const baseline='stable-before-page-copy-cleanup';
const previous=f=>execFileSync('git',['show',baseline+':'+f],{encoding:'utf8'});
for(const f of ['state.ts','content.ts','finaleModel.ts','contractReview.ts','moveInModel.ts','disputeModel.ts','gameSettlement.ts','GameEnding.tsx','ChallengeMilestones.tsx','StoryOpening.tsx','InspectionReport.tsx'])assert.equal(fs.readFileSync('src/'+f,'utf8'),previous('src/'+f),f+' stays unchanged');
const before=previous('src/Disputes.tsx'),after=fs.readFileSync('src/Disputes.tsx','utf8');
assert.equal(after.slice(after.indexOf('export function FinalResponse')),before.slice(before.indexOf('export function FinalResponse')),'Page12 and its response workflow stay unchanged');
const finale=fs.readFileSync('src/Finale.tsx','utf8'),oldFinale=previous('src/Finale.tsx');
assert.equal(finale.slice(finale.indexOf('export function RentalToolkit')),oldFinale.slice(oldFinale.indexOf('export function RentalToolkit')),'Page14 stays unchanged');
require('./new-ending-model.cjs');
const fixtures=JSON.parse(fs.readFileSync('/tmp/rent-smart-ending-fixtures.json'));
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const p=await context.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)errors.push(r.url())});
 await p.goto(process.env.TEST_URL||'http://localhost:4174/rent-smart/');
 const state=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('rent-smart.run')));
 async function seed(s){await p.evaluate(s=>localStorage.setItem('rent-smart.run',JSON.stringify(s)),s);await p.reload();await p.locator('h1').waitFor();}
 async function nav(n){if(n<=7)await p.locator('.page-links button').nth(n-1).click();else{const group=p.locator(n<=12?'.dispute-chapters':'.finale-chapters');if(await group.getAttribute('open')===null)await group.locator('summary').click();await group.locator(':scope>button').nth(n<=12?n-8:n-13).click();if(await p.locator('.challenge-interlude').isVisible())await p.getByRole('button',{name:'Take the Final Challenge',exact:true}).click();}}
 async function shot(n){await p.screenshot({path:'/tmp/page-copy-cleanup-'+n+'.png',fullPage:true});}
 await nav(4);
 assert.equal(await p.locator('.sign-status').innerText(),'Complete both understanding checks before signing.');
 await p.getByLabel('Lock exercise',{exact:true}).selectOption('amount');await p.getByLabel('Receipt understanding',{exact:true}).selectOption('receipt');
 assert.equal(await p.locator('.sign-status').innerText(),'Review the feedback above before signing.');
 await p.getByLabel('Lock exercise',{exact:true}).selectOption('scope');
 assert.equal(await p.locator('.sign-status').innerText(),'Both checks are complete. Select “Simulate signing”.');
 assert.equal(await p.locator('main .continue-help').count(),0);await shot('04-ready');
 await p.getByRole('button',{name:'Simulate signing',exact:true}).click();
 assert.equal(await p.locator('.sign-status').innerText(),'Signed. Continue to inspect your room.');
 await p.reload();assert.equal((await state()).signed,true);await p.locator('footer button').last().click();
 assert.equal((await state()).currentPage,5);assert.equal(await p.getByText('YOUR FIRST LOOK',{exact:true}).count(),0);await shot('05');
 for(const [name,action]of [['Floor near the window',null],['Desk & right-hand drawer','Test right-hand drawer'],['Mattress','Lift the bedding'],['Window','Open & close window'],['Wardrobe','Open & check wardrobe']]){await p.getByRole('button',{name:'Inspect '+name,exact:true}).click();if(action)await p.getByRole('button',{name:action,exact:true}).click();}
 assert.ok((await p.locator('.room-check-progress').innerText()).includes('5/5 checked'));
 await p.locator('footer button').last().click();await p.locator('.photo-picker input').first().check();await p.getByRole('button',{name:'Save this item',exact:true}).click();await p.locator('footer button').last().click();
 assert.equal((await state()).currentPage,7);assert.equal(await p.locator('.record-send-status').innerText(),'Saved r1 · Not sent');
 await p.locator('.attachment-card>label input').check();await p.getByRole('button',{name:'Review attachments',exact:true}).click();await p.getByRole('button',{name:'Send selected records',exact:true}).click();
 assert.equal(await p.locator('.record-send-status').innerText(),'Saved r1 · Sent');assert.ok((await p.locator('.conversation').innerText()).includes('RECEIPT ONLY'));
 const sent=JSON.stringify((await state()).evidenceSnapshots);await p.reload();assert.equal(JSON.stringify((await state()).evidenceSnapshots),sent);await shot('07');
 const s=structuredClone(fixtures.best);s.currentPage=8;
 // Real text stored in each message remains separately selectable and readable.
 s.communications.push(...['First saved clarification. Its complete original text remains here.','Second saved clarification. A different original message.'].map((text,i)=>({id:'copy-review-'+i,author:'landlord',storyDate:'Before 1 January 2027',type:'clarificationReply',attachmentIds:[],text})));
 await seed(s);assert.equal(await p.locator('.overview-message h2').count(),0);assert.ok((await p.locator('.archive-strip').innerText()).includes('1 sent batch'));await shot('08');
 const history=x=>JSON.stringify({entries:x.inspectionEntries,snapshots:x.evidenceSnapshots,messages:x.communications,batches:x.submissionBatches,first:x.postFirstAssessment});const frozen=history(await state());
 for(const n of [9,10,11]){
  await nav(n);assert.equal(await p.locator('.analysis-notice').innerText(),'Analysis saved.');
  await p.getByRole('button',{name:'Actual messages',exact:true}).click();
  const actual=(await state()).communications.filter(m=>m.author==='landlord'&&(m.type==='clarificationReply'||m.attachmentIds.some(id=>s.evidenceSnapshots[id]?.sourceEntryId===['floor','drawer','mattress'][n-9])));
  for(const text of ['First saved clarification. Its complete original text remains here.','Second saved clarification. A different original message.']){
   const card=p.locator('.source-card').filter({has:p.locator('.source-preview').filter({hasText:text})});assert.equal(await card.count(),1);await card.getByRole('button',{name:'View source',exact:true}).click();assert.ok((await card.innerText()).includes(text));
  }
  assert.ok(actual.length>=2);const c=['floor','drawer','mattress'][n-9];const first=JSON.stringify((await state()).analysisAttempts[c].first);const oldFeedback=JSON.stringify((await state()).analysisFeedback[c]);
  await p.getByRole('button',{name:'4. Position & next step',exact:true}).click();await p.locator('.analysis-note textarea').fill('Display check only.');
  assert.ok((await p.locator('.analysis-notice').innerText()).startsWith('Unsaved changes.'));assert.ok((await p.locator('.analysis-feedback').innerText()).includes('Feedback on your last checked analysis'));assert.equal(JSON.stringify((await state()).analysisFeedback[c]),oldFeedback);
  await p.reload();assert.ok((await p.locator('.dispute-date').innerText()).includes('UNSAVED CHANGES'));
  await p.getByRole('button',{name:'Save analysis',exact:true}).click();assert.equal(await p.locator('.analysis-notice').innerText(),'Analysis saved.');assert.equal(JSON.stringify((await state()).analysisAttempts[c].first),first);
  assert.equal(history(await state()),frozen);await shot(String(n).padStart(2,'0'));
 }
 // The generic stored feedback is formatted for display without altering its record.
 const generic=await state();generic.currentPage=9;generic.analysisFeedback.floor=['No changes since the last check. Your judgment is proportionate to the available material. Save it, with the specific checks you chose; these still need to be answered.'];await seed(generic);
 assert.ok(!(await p.locator('.analysis-feedback').innerText()).includes('Save it'));assert.deepEqual((await state()).analysisFeedback.floor,generic.analysisFeedback.floor);
 const final={...fixtures.best,currentPage:13,postSubmittedIds:['0','1','2','3'],postFirstAssessment:{0:'1',1:'2',2:'0',3:'1'},postAssessment:{0:'1',1:'2',2:'0',3:'1'},postLatestSubmitted:{0:'1',1:'2',2:'0',3:'1'}};await seed(final);
 assert.ok((await p.locator('.challenge-separate').innerText()).includes('do not apply'));assert.ok((await p.locator('.challenge-file-head').innerText()).includes('4 cm'));assert.equal(await p.locator('.challenge-file-head .eyebrow').count(),0);await shot('13');
 for(let n=1;n<=14;n++){await nav(n);assert.equal((await state()).currentPage,n);assert.ok((await p.locator('.topline').innerText()).includes('Page '+String(n).padStart(2,'0')+' / 14'));}
 await p.getByLabel('Final simulated refund S$1,210',{exact:true}).waitFor();
 await nav(4);assert.equal(await p.locator('.sign-status').count(),0);assert.ok((await p.locator('main').innerText()).includes('Archived run · Read only'));assert.deepEqual(errors,[]);
 await browser.close();console.log('PASS desktop approved copy cleanup: Page04 state prompts, five inspections, saved/sent photos and receipt, separate original messages, stale-vs-current analysis display, refresh, immutable first judgments/history, all14 navigation, unchanged challenge and settlement.');
})().catch(e=>{console.error(e);process.exit(1)});
