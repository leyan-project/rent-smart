import type {RunState,Item,Entry,Communication} from './state';
export const items:Item[]=['floor','drawer','mattress','window','wardrobe'];
export const names:Record<Item,string>={floor:'Floor near the window',drawer:'Desk & right-hand drawer',mattress:'Mattress',window:'Window',wardrobe:'Wardrobe'};
export const date='2027-01-01';
export const descriptions:Record<Item,{id:string;text:string}[]>={
 floor:[{id:'floor_location',text:'Near the window.'},{id:'floor_scratch',text:'A scratch approximately 6 cm long.'}],
 drawer:[{id:'drawer_resistance',text:'Noticeable resistance when opening and closing the right-hand drawer.'},{id:'drawer_closing',text:'The right-hand drawer does not close smoothly.'}],
 mattress:[{id:'mattress_clean',text:'No obvious surface stains when the bedding was lifted.'}],
 window:[{id:'window_operation',text:'The window opens and closes during the check.'}],
 wardrobe:[{id:'wardrobe_wear',text:'Light signs of use; the wardrobe functions normally.'}]
};
export const photos:Record<Item,{id:string;label:string;view:string}[]>={floor:[{id:'floor_closeup_movein',label:'Scratch close-up',view:'565 525 100 75'},{id:'floor_context_movein',label:'Window & floor location',view:'335 190 500 460'},{id:'floor_overview_movein',label:'Room overview',view:'0 0 900 720'}],drawer:[{id:'drawer_still_movein',label:'Right-hand drawer · still image',view:'475 365 130 205'}],mattress:[{id:'mattress_movein',label:'Uncovered mattress surface',view:'0 350 465 360'}],window:[{id:'window_inspection',label:'Window',view:'320 30 335 400'}],wardrobe:[{id:'wardrobe_inspection',label:'Wardrobe',view:'600 260 225 335'}]};
export const descriptionText=(id:string)=>Object.values(descriptions).flat().find(x=>x.id===id)?.text??id;
export const photoLabel=(id:string)=>Object.values(photos).flat().find(x=>x.id===id)?.label??id;
export function inspected(s:RunState,item:Item){const a=s.inspectionActions;return item==='floor'?a.floorInspected:item==='drawer'?a.deskViewed:item==='mattress'?a.mattressLifted:item==='window'?a.windowTested:a.wardrobeChecked}
export function availableDescriptions(s:RunState,item:Item){return inspected(s,item)&&(item!=='drawer'||s.inspectionActions.drawerTested)?descriptions[item]:[]}
export function dirty(e:Entry){return JSON.stringify([e.draftPhotoIds,e.draftDescriptionParts,e.draftNote??''])!==JSON.stringify([e.savedPhotoIds,e.savedDescriptionParts,e.savedNote??''])}
export function canSave(s:RunState,item:Item){const e=s.inspectionEntries[item];return !s.historyLocked&&inspected(s,item)&&(e.draftPhotoIds.length+e.draftDescriptionParts.length)>0}
export function snapshotId(s:RunState,item:Item){return `${s.runId}:${item}:r${s.inspectionEntries[item].revision}`}
export type MoveInAction={type:'inspect';item:Item;perform?:boolean}|{type:'draft';item:Item;photoIds:string[];descriptionParts:string[];note?:string}|{type:'save';items:Item[]}|{type:'discard'}|{type:'send';items:Item[]}|{type:'followup';snapshotId:string}|{type:'archive'};
export function moveInReducer(s:RunState,a:MoveInAction):RunState{
 if(s.historyLocked)return s;
 if(a.type==='archive')return {...s,currentPage:8,phase:'dispute',historyLocked:true,archivedAtPage:8};
 if(a.type==='inspect'){const actions={...s.inspectionActions};if(a.item==='floor')actions.floorInspected=true;if(a.item==='drawer'){actions.deskViewed=true;if(a.perform)actions.drawerTested=true}if(a.item==='mattress'&&a.perform)actions.mattressLifted=true;if(a.item==='window'&&a.perform)actions.windowTested=true;if(a.item==='wardrobe'&&a.perform)actions.wardrobeChecked=true;return {...s,inspectionActions:actions}}
 if(a.type==='draft'){if(!inspected(s,a.item))return s;const validPhotos=photos[a.item].map(p=>p.id),validParts=availableDescriptions(s,a.item).map(d=>d.id);return {...s,inspectionEntries:{...s.inspectionEntries,[a.item]:{...s.inspectionEntries[a.item],draftPhotoIds:[...new Set(a.photoIds.filter(id=>validPhotos.includes(id)))],draftDescriptionParts:[...new Set(a.descriptionParts.filter(id=>validParts.includes(id)))],draftNote:(a.note??'').slice(0,500)}}}}
 if(a.type==='discard'){return {...s,inspectionEntries:Object.fromEntries(items.map(id=>{const e=s.inspectionEntries[id];return [id,{...e,draftPhotoIds:[...e.savedPhotoIds],draftDescriptionParts:[...e.savedDescriptionParts],draftNote:e.savedNote??''}]})) as Record<Item,Entry>}}
 if(a.type==='save'){const entries={...s.inspectionEntries};for(const id of a.items){if(!canSave(s,id))continue;const e=entries[id];if(e.saved&&!dirty(e))continue;entries[id]={...e,saved:true,recordId:`${s.runId}:${id}`,revision:e.revision+1,savedAtStoryTime:date,savedPhotoIds:[...e.draftPhotoIds],savedDescriptionParts:[...e.draftDescriptionParts],savedNote:e.draftNote??''}}return {...s,inspectionEntries:entries}}
 const comms=[...s.communications];const add=(author:Communication['author'],type:Communication['type'],text:string,attachmentIds:string[])=>comms.push({id:crypto.randomUUID(),author,storyDate:date,type,text,attachmentIds:[...attachmentIds]});
 if(a.type==='send'){
 const selected=items.filter(id=>a.items.includes(id)&&s.inspectionEntries[id].saved);if(!selected.length)return s;
 const ids=selected.map(id=>snapshotId(s,id));if(s.submissionBatches.some(b=>JSON.stringify(b.snapshotIds)===JSON.stringify(ids)))return s;
 const snapshots={...s.evidenceSnapshots};selected.forEach((id,i)=>{const e=s.inspectionEntries[id];snapshots[ids[i]]={sourceEntryId:id,revision:e.revision,photoIds:[...e.savedPhotoIds],descriptionParts:[...e.savedDescriptionParts],note:e.savedNote??'',savedAtStoryTime:e.savedAtStoryTime!}});
 const batch={id:crypto.randomUUID(),storyDate:date,snapshotIds:ids,acknowledged:true};
 add('tenant','conditionReport',`Please find my move-in condition records: ${selected.map(id=>names[id]).join('; ')}.`,ids);
 add('landlord','receipt',`I have received this batch of ${ids.length} condition record${ids.length===1?'':'s'}: ${selected.map(id=>names[id]).join('; ')}. This acknowledges these attachments, not agreement with every reported fact or responsibility.`,ids);
 const drawer=selected.includes('drawer')?snapshots[ids[selected.indexOf('drawer')]]:undefined;
 const functional=!!drawer?.descriptionParts.some(id=>id.startsWith('drawer_'));
 if(functional)add('landlord','inspectionReply','I have received the reported drawer symptoms. The drawer needs further inspection; its cause and responsibility are not yet determined.',[ids[selected.indexOf('drawer')]]);
 return {...s,communications:comms,evidenceSnapshots:snapshots,submissionBatches:[...s.submissionBatches,batch],submissions:{submittedEvidenceIds:[...new Set([...s.submissions.submittedEvidenceIds,...ids])],acknowledged:true},confirmations:{...s.confirmations,drawerRequiresInspection:s.confirmations.drawerRequiresInspection||functional}};
 }
 const snap=s.evidenceSnapshots[a.snapshotId];if(!snap||snap.sourceEntryId!=='floor'||!s.submissions.submittedEvidenceIds.includes(a.snapshotId)||s.communications.some(m=>m.type==='infoRequest'&&m.attachmentIds.includes(a.snapshotId)))return s;
 add('tenant','infoRequest','Please check whether this is the same scratch that was present before I moved in.',[a.snapshotId]);
 const missing:string[]=[];if(!snap.photoIds.includes('floor_closeup_movein'))missing.push('a clear close-up');if(!snap.photoIds.includes('floor_context_movein'))missing.push('a location image showing where the scratch is');if(!['floor_location','floor_scratch'].every(id=>snap.descriptionParts.includes(id)))missing.push('an objective description identifying the location and observed scratch');
 const confirmed=!missing.length;
 add('landlord',confirmed?'factConfirmation':'inspectionReply',confirmed?'I have checked my pre-handover records against these materials. The same scratch near the window was present before you moved in. This confirms that specific fact; it is not an agreement about any future charge.':`To compare this specific scratch, please provide ${missing.join('; ')}. I have received this record, but have not confirmed that the scratch was pre-existing.`,[a.snapshotId]);
 return {...s,communications:comms,confirmations:{...s.confirmations,floorPreexistingConfirmed:s.confirmations.floorPreexistingConfirmed||confirmed,floorNeedsLocation:!confirmed&&!snap.photoIds.includes('floor_context_movein')}};
}
