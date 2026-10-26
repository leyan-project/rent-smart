import type {RunState} from './state';
export const abilities=['Connect the contract','Interpret the evidence','Identify the missing information','Choose a proportionate response'];
export const legacyChallengeQuestions=[
 {title:'Which provisions belong together?',options:['Only the S$200 routine-repair limit: the quote is lower.','Condition records, use and damage, and deposit / handover provisions; check repair scope separately.','Only the deposit amount.'],answer:'1',feedback:'Read condition, damage and deposit / handover provisions together. The S$200 arrangement applies only to eligible routine repairs; S$180 alone cannot allocate responsibility.'},
 {title:'What do these two photographs establish?',options:['The curtain was intact at move-in, so the tenant caused the tear.','The tear was already there at move-in.','A tear is visible at move-out; the obscured move-in hem cannot establish its earlier condition.'],answer:'2',feedback:'The move-out image shows a tear then. The clear but incomplete move-in image does not show the relevant hem, so it establishes neither an intact curtain nor an existing tear.'},
 {title:'What would help resolve the remaining uncertainty?',options:['An unobstructed dated handover record, any reports of damage, and an explanation of replacement rather than repair and the S$120 + S$60 costs.','A sharper copy of the same obscured photograph is enough.','No further information: S$180 is below S$200.'],answer:'0',feedback:'Ask for records that actually show the hem and help establish the timeline. Separately check why replacement is necessary and what the curtain and installation charges cover.'},
 {title:'What would you say to this landlord?',options:['I accept S$180 because it is below the minor-repair limit.','I can see the tear at move-out, but cannot establish when it arose. Please share comparison records and explain replacement and both costs before we discuss responsibility and an appropriate amount.','I reject the whole claim because the move-in photograph hides the hem.'],answer:'1',feedback:'Acknowledge the visible tear without inventing its cause. Request comparison records and a reasoned replacement / cost basis. Neither a low quote nor a hidden hem settles responsibility.'}
];
// Stable option IDs retain their meaning; older responses keep their original wording.
export const challengeQuestions=[
 {title:'Which provisions belong together?',options:[
 'Link use and damage to routine repairs; if replacement is reasonably priced below S$200, apply the tenant contribution before reviewing the handover record.',
 'Link condition records, use and damage, and deposit / handover terms; establish responsibility and check repair scope before applying an amount limit.',
 'Link condition records to deposit / handover terms; treat the obscured hem as insufficient support for any deduction without considering the damage provisions.'
 ],answer:'1',feedback:'Responsibility, the evidence comparison and the proposed deduction need to be considered together. A price threshold cannot replace that review, and an incomplete image does not make the damage provisions irrelevant.'},
 {title:'What do these two photographs establish?',options:[
 'The tear is visible only at move-out; that difference makes tenant-caused damage the best-supported conclusion, unless an earlier report is found.',
 'The move-in hem is hidden; the comparison therefore gives more support to a pre-existing defect than to tenant-caused damage.',
 'The tear is visible at move-out; the hidden move-in hem leaves its earlier condition and the cause unresolved.'
 ],answer:'2',feedback:'A difference in visibility is not a documented change in condition. The hidden hem supports neither an intact curtain nor an earlier tear; the move-out image establishes the visible condition then.'},
 {title:'What would help resolve the remaining uncertainty?',options:[
 'Request a dated view of the hem or relevant condition reports, plus reasons for replacement rather than repair and the basis of both quoted items.',
 'Request an itemised installer quotation and a repair estimate; use the difference between the photographs as the starting basis for responsibility.',
 'Request an unobstructed handover record and any damage reports; settle responsibility from those before asking why replacement and installation are needed.'
 ],answer:'0',feedback:'Check the timeline and the proposed remedy separately. An estimate cannot fill the missing condition history; clarifying responsibility also does not establish that replacement and both charges are justified.'},
 {title:'What would you say to this landlord?',options:[
 'I can see the tear at move-out. Please obtain a repair estimate; I am willing to cover the lower of repair and replacement costs, subject to an itemised quotation.',
 'I can see the tear at move-out, but the earlier hem is hidden. Please share comparison records and explain replacement and both costs so we can discuss responsibility and an appropriate amount.',
 'The earlier hem is hidden, so I cannot accept responsibility on these materials. Please put the entire S$180 claim aside unless a clear move-in photo shows it was intact.'
 ],answer:'1',feedback:'Acknowledge the visible condition, reserve the unresolved responsibility question and request both historical and cost support. Offering to pay first assumes responsibility; demanding one particular photograph can exclude other relevant records.'}
];
export const questionsForRun=(s:RunState)=>s.postQuestionVersion===1?legacyChallengeQuestions:challengeQuestions;
export function challengeFeedback(s:RunState,i:number,value:string){
 const q=questionsForRun(s)[i];if(s.postQuestionVersion===1||!value||value===q.answer)return q.feedback;
 const specific=[
 ['The price and repair provisions matter, but a reasonable quote below S$200 does not establish responsibility or repair eligibility. Compare condition and handover evidence first.','','An obscured hem is an evidence gap, not proof that the claim is invalid. Keep use and damage provisions in the review.'],
 ['A tear visible only in the later image is not necessarily new: the relevant earlier area was hidden. Seek a record that actually shows the hem.','An obscured area is not positive evidence of a pre-existing defect. Keep both timing and cause open until more records are available.',''],
 ['', 'The repair estimate helps assess cost, but does not establish who caused the tear. Ask for timeline records as well.', 'The timeline request is useful. Also ask why replacement and installation are necessary; responsibility and the amount need separate support.'],
 ['A repair estimate is useful, but the offer to pay assumes a responsibility the supplied materials have not established. Reserve that question while asking for records.','', 'Reserving responsibility is reasonable. Requiring a single type of proof is too narrow: dated reports or other handover records may help. Ask about the remedy and cost basis too.']
 ];return specific[i][Number(value)]||q.feedback;
}
export const preAnswers=['1','0','0','1'];
export type FinaleAction={type:'choose';index:number;value:string}|{type:'question';index:number}|{type:'submit';index:number}|{type:'complete'};
export function finaleReducer(s:RunState,a:FinaleAction):RunState{
 if(a.type==='complete')return allChallengeSubmitted(s)?{...s,completed:true}:s;
 const i=String(a.index);if(!Number.isInteger(a.index)||a.index<0||a.index>3)return s;
 if(a.type==='question')return {...s,postQuestionIndex:a.index};
 if(a.type==='choose'){if(!['0','1','2'].includes(a.value))return s;return {...s,postAssessment:{...s.postAssessment,[i]:a.value}}}
 const value=s.postAssessment[i]??'';const first=s.postFirstAssessment??{};
 return {...s,postFirstAssessment:Object.hasOwn(first,i)?first:{...first,[i]:value},postSubmittedIds:[...new Set([...(s.postSubmittedIds??[]),i])],postAttempts:{...s.postAttempts,[i]:(s.postAttempts?.[i]??0)+1},postLatestSubmitted:{...s.postLatestSubmitted,[i]:value}};
}
export const allChallengeSubmitted=(s:RunState)=>['0','1','2','3'].every(i=>s.postSubmittedIds?.includes(i));
export function comparison(s:RunState,i:number){const pre=s.preSubmitted?s.preAssessment[i]:undefined;const first=s.postFirstAssessment?.[i];const wasSubmitted=s.postSubmittedIds?.includes(String(i));const initial=pre===undefined?'Unanswered / not submitted':pre===preAnswers[i]?'Supported judgment':'Needs further reasoning';const final=!wasSubmitted||!first?'Unanswered / not submitted':first===questionsForRun(s)[i].answer?'Supported judgment':'Needs further reasoning';
 const advice=['Link condition, damage and handover terms before using an amount threshold.','Separate what an image directly shows from a claim about when damage arose.','Ask for a specific missing record and a separate explanation of the cost.','State what you accept as fact, what remains uncertain, and what you want checked next.'][i];
 const preReasons=[
 ['In the floor case, you focused on the deposit amount rather than the provisions governing condition and deductions.','In the floor case, you connected condition, damage and deposit / handover provisions.','In the floor case, you relied on the minor-repair amount without linking the condition and deduction provisions.'],
 ['In the floor case, you limited the photo’s claim to the scratch being present at move-out.','In the floor case, you inferred who caused the scratch from a move-out photo alone.','In the floor case, you treated the photo as evidence of Mr Tan’s acceptance of pre-existence.'],
 ['In the floor case, you identified the missing comparison of timing and location.','In the floor case, you asked for bank details, which would not establish the scratch’s history.','In the floor case, you treated a move-out photo as enough to determine responsibility.'],
 ['In the floor case, you accepted the deduction because records were not at hand.','In the floor case, you asked for comparison records and an explanation before taking a position.','In the floor case, you rejected every deduction before reviewing its supporting materials.']
 ];
 const supported=['For the curtain, you linked condition, damage and deduction terms while keeping repair scope separate.','For the curtain, you distinguished a visible tear at move-out from an unknown earlier condition.','For the curtain, you sought both timeline evidence and a basis for replacement and the two costs.','For the curtain, you acknowledged the visible tear, reserved responsibility and requested historical and cost support.'];
 const trend=(pre===undefined?`No submitted starting answer is available for ${abilities[i].toLowerCase()}.`:preReasons[i][Number(pre)])+' '+(!wasSubmitted||!first?`No independent curtain judgment was recorded for ${abilities[i].toLowerCase()}.`:first===questionsForRun(s)[i].answer?supported[i]:'For the curtain: '+challengeFeedback(s,i,first));
 return {initial,final,advice,trend,pre,first,wasSubmitted};}
export const checklist=[
 ['Before signing','Read condition, deposit, handover and repair provisions together. Check any amount limit’s scope. Keep agreed changes in writing.'],
 ['At handover','Inspect surfaces, lift bedding, test drawers, windows and fittings. Take dated context and close-up photos of the same item. Note observable facts.'],
 ['Save and send','Save your report, send only the intended records, and retain the exact attachments and date. Follow the reporting period in your own agreement.'],
 ['Confirm precisely','Ask for specific factual checks. Keep receipt, factual confirmation and responsibility separate.'],
 ['At move-out','Compare the same locations and items. Keep condition records and explanations of proposed deductions. Missing records do not settle liability.'],
 ['Respond item by item','Separate responsibility from cost. Ask about cause, repair versus replacement, necessary work and itemised charges. Record what remains unresolved.']
];
export const checklistText=()=>`RENT SMART — YOUR RENTAL CHECKLIST\n\n${checklist.map(([h,t])=>h+'\n'+t).join('\n\n')}\n\nTeaching guidance, not legal advice. Check your own tenancy terms and applicable requirements.`;
