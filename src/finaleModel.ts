import type {RunState} from './state';
export const abilities=['Connect the contract','Interpret the evidence','Identify the missing information','Choose a proportionate response'];
export const challengeQuestions=[
 {title:'Which provisions belong together?',options:['Only the S$200 routine-repair limit: the quote is lower.','Condition records, use and damage, and deposit / handover provisions; check repair scope separately.','Only the deposit amount.'],answer:'1',feedback:'Read condition, damage and deposit / handover provisions together. The S$200 arrangement applies only to eligible routine repairs; S$180 alone cannot allocate responsibility.'},
 {title:'What do these two photographs establish?',options:['The curtain was intact at move-in, so the tenant caused the tear.','The tear was already there at move-in.','A tear is visible at move-out; the obscured move-in hem cannot establish its earlier condition.'],answer:'2',feedback:'The move-out image shows a tear then. The clear but incomplete move-in image does not show the relevant hem, so it establishes neither an intact curtain nor an existing tear.'},
 {title:'What would help resolve the remaining uncertainty?',options:['An unobstructed dated handover record, any reports of damage, and an explanation of replacement rather than repair and the S$120 + S$60 costs.','A sharper copy of the same obscured photograph is enough.','No further information: S$180 is below S$200.'],answer:'0',feedback:'Ask for records that actually show the hem and help establish the timeline. Separately check why replacement is necessary and what the curtain and installation charges cover.'},
 {title:'What would you say to this landlord?',options:['I accept S$180 because it is below the minor-repair limit.','I can see the tear at move-out, but cannot establish when it arose. Please share comparison records and explain replacement and both costs before we discuss responsibility and an appropriate amount.','I reject the whole claim because the move-in photograph hides the hem.'],answer:'1',feedback:'Acknowledge the visible tear without inventing its cause. Request comparison records and a reasoned replacement / cost basis. Neither a low quote nor a hidden hem settles responsibility.'}
];
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
export function comparison(s:RunState,i:number){const pre=s.preSubmitted?s.preAssessment[i]:undefined;const first=s.postFirstAssessment?.[i];const wasSubmitted=s.postSubmittedIds?.includes(String(i));const initial=pre===undefined?'Unanswered / not submitted':pre===preAnswers[i]?'Supported judgment':'Needs further reasoning';const final=!wasSubmitted||!first?'Unanswered / not submitted':first===challengeQuestions[i].answer?'Supported judgment':'Needs further reasoning';
 const advice=[ 'Link condition, damage and handover terms before using an amount threshold.', 'Separate what an image directly shows from a claim about when damage arose.', 'Ask for a specific missing record and a separate explanation of the cost.', 'State what you accept as fact, what remains uncertain, and what you want checked next.' ][i];
 const trend=final==='Supported judgment'?(initial==='Supported judgment'?'Your first responses in both scenarios use the relevant reasoning.':initial==='Needs further reasoning'?'Your first curtain response addresses a gap in your initial floor judgment.':'Your first curtain response uses the relevant reasoning; there is no submitted starting answer to compare.'):(final==='Unanswered / not submitted'?'No independent curtain judgment was recorded for this dimension.':initial==='Supported judgment'?'Your initial floor response used the relevant reasoning; the first curtain response still needs care.':'The first curtain response still needs development.');
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
