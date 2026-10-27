import {tasks} from './content';
export interface ContractAnswer{ids:string[];role:string;correct:boolean;hintUsed:boolean;answerRevealed:boolean}
export interface ContractReview{ids:string[];role:string;checked:boolean;attemptCount?:number;incorrectCount?:number;firstAnswer?:ContractAnswer;finalAnswer?:ContractAnswer;attempts?:ContractAnswer[];hintUsed?:boolean;answerRevealed?:boolean;feedback?:string;legacySubmitted?:boolean}
export const hasContractSubmission=(v?:ContractReview)=>!!v&&(!!v.attemptCount||!!v.legacySubmitted||v.checked);
const firstFeedback=['Check how an initial inventory can be supplemented.','Check responsibility before applying a repair limit.','Check what makes a proposed deduction supported.'];
export const contractHints=[
 'Look for the procedure for recording condition and the document it can supplement.',
 'One provision distinguishes kinds of damage; another defines which repairs the amount arrangement covers.',
 'Find the deposit provision and the review procedure. Ask what records and supporting materials each contributes.'
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
 const feedback=correct?'Connection saved.':firstFeedback[index]+(incorrectCount>=2?' Revisit the purpose as well as your clause selection.':' You can retry or view the answer.');
 return {...v,checked:correct,attemptCount:(v.attemptCount??0)+1,incorrectCount,firstAnswer:v.firstAnswer??{...answer,ids:[...answer.ids]},finalAnswer:answer,attempts:[...(v.attempts??[]),answer],hintUsed,feedback};
}
// Earlier versions only stored a saved-correct flag. Preserve that known submission without inventing its first answer or attempt count.
export function restoreContractReview(v:ContractReview):ContractReview{return v.checked&&v.attemptCount===undefined?{...v,legacySubmitted:true,finalAnswer:v.finalAnswer??{ids:[...v.ids],role:v.role,correct:true,hintUsed:false,answerRevealed:false}}:v}
