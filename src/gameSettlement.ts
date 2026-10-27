import type {RunState,CaseAnalysis,Snapshot} from './state';

type CaseId='floor'|'drawer'|'mattress';
type Negotiation=Pick<CaseAnalysis,'position'|'evidenceIds'|'requestedChecks'>;
export interface SettlementItem {id:CaseId;label:string;proposed:number;deduction:number;reason:string}
/** Page14-only fiction. No state writes, random outcomes, assessment scores or legal findings. */
export function gameSettlement(s:Readonly<RunState>){
 const last=s.disputeMessages?.at(-1);
 const response=s.finalResponse;
 const sent=!!(response&&last&&last.text===response.generatedText);
 const cited=(a:Negotiation,id:string)=>a.evidenceIds.includes(id)&&!!response?.referencedEvidenceIds.includes(id)&&!!last?.referencedEvidenceIds.includes(id);
 const analysis=(id:CaseId):Negotiation|undefined=>sent&&response?{position:response.positionByCase[id],evidenceIds:response.referencedEvidenceIds.filter(key=>last!.referencedEvidenceIds.includes(key)),requestedChecks:response.requestedChecks.filter(key=>key.startsWith(id+':')).map(key=>key.slice(id.length+1))}:undefined;
 const requested=(a:Negotiation|undefined,id:CaseId,key:string)=>!!a?.requestedChecks.includes(key)&&!!response?.requestedChecks.includes(id+':'+key);
 const sentRecords=(id:CaseId)=>Object.entries(s.evidenceSnapshots).filter(([key,snap])=>snap.sourceEntryId===id&&s.submissions.submittedEvidenceIds.includes(key)&&s.submissionBatches.some(batch=>batch.snapshotIds.includes(key)));
 const floorRecord=(v:Snapshot)=>v.photoIds.includes('floor_closeup_movein')&&v.photoIds.includes('floor_context_movein')&&['floor_location','floor_scratch'].every(part=>v.descriptionParts.includes(part));
 const fa=analysis('floor');
 const floorQuery=!!fa&&['review','uncertain'].includes(fa.position)&&(requested(fa,'floor','compareRecords')||requested(fa,'floor','matchLocation')||requested(fa,'floor','reviewDeduction'));
 const confirmation=!!fa&&s.inspectionActions.floorInspected&&s.communications.some(m=>m.author==='landlord'&&m.type==='factConfirmation'&&cited(fa,'message:'+m.id)&&m.attachmentIds.some(key=>sentRecords('floor').some(([id,snap])=>id===key&&floorRecord(snap))));
 const floor: SettlementItem={id:'floor',label:'Floor scratch',proposed:250,deduction:floorQuery?(confirmation?0:125):250,reason:floorQuery?(confirmation?'You used the specific pre-existing-scratch confirmation in your submitted challenge; this game removes the floor charge.':'Your submitted comparison request opens a compromise in this game; a qualifying specific confirmation was not cited.'):'No qualifying floor challenge was sent in the current response, so this game keeps the proposed floor amount.'};
 const da=analysis('drawer');
 const drawerQuery=!!da&&['review','uncertain'].includes(da.position)&&(requested(da,'drawer','inspectCause')||requested(da,'drawer','checkScope'));
 const functional=(snap:Snapshot)=>snap.descriptionParts.some(p=>['drawer_resistance','drawer_closing'].includes(p));
 const drawerProof=!!da&&s.inspectionActions.drawerTested&&sentRecords('drawer').some(([id,snap])=>functional(snap)&&cited(da,'snapshot:'+id));
 const drawer:SettlementItem={id:'drawer',label:'Right-hand drawer',proposed:120,deduction:drawerQuery?(drawerProof&&requested(da,'drawer','inspectCause')&&requested(da,'drawer','checkScope')?0:60):120,reason:drawerQuery?(drawerProof&&requested(da,'drawer','inspectCause')&&requested(da,'drawer','checkScope')?'Your sent functional record and cause / repair-scope checks support removing the drawer charge in this fictional negotiation.':drawerProof?'You used the sent functional record, but only part of the cause / repair-scope checks; this game uses an S$60 compromise.':'Your submitted responsibility checks support a compromise here; the full recorded-and-sent functional trail was not used.'):'The current response did not make the qualifying responsibility checks, so this game keeps the proposed drawer amount.'};
 const ma=analysis('mattress');
 const acknowledge=!!ma&&['acknowledge','uncertain'].includes(ma.position);
 const fees=['stain90','deep70','service40'].filter(key=>requested(ma,'mattress',key));
 const mattress:SettlementItem={id:'mattress',label:'Mattress cleaning',proposed:200,deduction:acknowledge?(fees.length===3?90:fees.length?160:200):200,reason:acknowledge&&fees.length===3?'You acknowledged the stain and queried all three services; this game settles on S$90 for stain treatment.':acknowledge&&fees.length?'You acknowledged the stain and checked part of the quote; this game uses the S$160 middle settlement.':'The current response did not combine acknowledgement with service-cost checks, so this game keeps S$200.'};
 const items=[floor,drawer,mattress];const deducted=items.reduce((sum,item)=>sum+item.deduction,0);
 return {deposit:1300,proposed:570,deducted,refund:1300-deducted,items,currentResponseCounted:sent};
}
