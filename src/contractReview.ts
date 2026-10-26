import {tasks} from './content';
export interface ContractAnswer{ids:string[];role:string;correct:boolean;hintUsed:boolean;answerRevealed:boolean}
export interface ContractReview{ids:string[];role:string;checked:boolean;attemptCount?:number;incorrectCount?:number;firstAnswer?:ContractAnswer;finalAnswer?:ContractAnswer;attempts?:ContractAnswer[];hintUsed?:boolean;answerRevealed?:boolean;feedback?:string;legacySubmitted?:boolean}
export const hasContractSubmission=(v?:ContractReview)=>!!v&&(!!v.attemptCount||!!v.legacySubmitted||v.checked);
const firstFeedback=[
 'A preliminary “Good” entry does not replace an inspection. Connect the move-in recording procedure with the furniture list.',
 'The amount alone does not settle responsibility. Link the distinction between wear, existing defects and misuse with the scope of routine repairs.',
 'Connect the deposit arrangement with the handover review and supporting materials. The damage clause can also help assess the basis of a deduction.'
];
export const contractHints=[
 'Read clause 3 alongside Appendix A. One explains how to submit dated records; the other is the preliminary list those records can supplement.',
 'Read clauses 4 and 5 together: first consider the facts and responsibility, then check whether the routine-repair arrangement applies.',
 'Read clauses 2 and 6 together. Clause 4 is also relevant to distinguishing wear, existing defects and tenant-caused damage. Choose the purpose about reviewing records and supporting materials.'
];
export const contractExplanations=[
 'Clause 3 + Appendix A: dated photos and notes support written corrections to the preliminary “Good” inventory. The initial label is not a final confirmation of condition.',
 'Clauses 4 + 5: distinguish the type and cause of damage before deciding whether the eligible routine minor-repair arrangement applies. The S$200 amount does not determine responsibility on its own.',
 'Clauses 2 + 4 + 6: clause 2 covers the deposit and supported deductions, clause 4 helps assess the basis of responsibility, and clause 6 connects review to handover records and supporting materials. Linking 2 + 6 alone also answers the narrower deposit-to-handover connection asked here.'
];
export function submitContract(v:ContractReview,index:number):ContractReview{
 const t=tasks[index];const sorted=[...v.ids].sort().join(',');const validSets=index===2?['2,6','2,4,6']:[t.ids.join(',')];
 const correct=validSets.some(ids=>ids.split(',').sort().join(',')===sorted)&&v.role===t.role;
 const incorrectCount=(v.incorrectCount??0)+(correct?0:1);const hintUsed=!!v.hintUsed||(!correct&&incorrectCount>=2);
 const answer:ContractAnswer={ids:[...v.ids],role:v.role,correct,hintUsed,answerRevealed:!!v.answerRevealed};
 const feedback=correct?'Connection saved. '+t.role:(!v.role||v.role!==t.role?'The selected purpose does not explain how these provisions work together. ':'')+firstFeedback[index]+(incorrectCount>=2?' '+contractHints[index]:' You can retry or view the answer and explanation.');
 return {...v,checked:correct,attemptCount:(v.attemptCount??0)+1,incorrectCount,firstAnswer:v.firstAnswer??{...answer,ids:[...answer.ids]},finalAnswer:answer,attempts:[...(v.attempts??[]),answer],hintUsed,feedback};
}
// Earlier versions only stored a saved-correct flag. Preserve that known submission without inventing its first answer or attempt count.
export function restoreContractReview(v:ContractReview):ContractReview{return v.checked&&v.attemptCount===undefined?{...v,legacySubmitted:true,finalAnswer:v.finalAnswer??{ids:[...v.ids],role:v.role,correct:true,hintUsed:false,answerRevealed:false}}:v}
