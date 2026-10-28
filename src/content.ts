export const pages = ['The Deduction Notice','Initial Assessment','The Agreement','Before You Sign','Inspect Your Room','Build Your Inspection Report','Confirm With Your Landlord','Deposit Dispute Overview','Floor Dispute','Drawer Dispute','Mattress Dispute','Final Response','Final Challenge','Your Rental Toolkit'];
export const facts = {rent:1300,deposit:1300,minorRepair:200,lockExercise:110,start:'2027-01-01',end:'2027-12-31',notice:'2028-01-02',deductions:{floor:250,drawer:120,mattress:200},total:570,illustrativeBalance:730};
export const clauses = [
['Scope and term','You rent a furnished common room in a private condominium in Singapore directly from Mr Tan. You share the designated bathroom and shared areas. The fixed tenancy runs from 1 January 2027 to 31 December 2027. This agreement covers the room and agreed use of those shared facilities, not the whole apartment.'],
['Rent and deposit','Monthly rent is S$1,300 and the security deposit is S$1,300. Mr Tan may propose deductions for supported matters covered by this agreement, with an explanation and supporting materials. Under this simulated agreement, any remaining balance is to be dealt with within 14 days after handover, following review of proposed deductions.'],
['Move-in condition','Within 7 calendar days after moving in, you may submit dated photographs and written condition notes. Mr Tan will acknowledge receipt and check the specific items. Any corrections confirmed by both parties must be kept separately in writing alongside this agreement and Appendix A. Receipt alone does not confirm the facts reported.'],
['Use and damage','Use the room and furniture responsibly. Distinguish ordinary wear from normal use, pre-existing defects and damage caused by tenant misuse. Responsibility depends on the facts and this agreement; the presence of a defect alone does not identify who caused it.'],
['Routine minor repairs','For eligible routine minor repairs within this agreement’s scope, the tenant contributes up to S$200 per item per occasion. This arrangement does not automatically cover every kind of damage. A quote below S$200 does not, by itself, establish responsibility or whether this clause applies.'],
['Handover and deductions','At move-out, review the handover condition, move-out records and relevant supporting materials together. Compare proposed deductions with the available historical records. Ask for explanations and supporting photographs, quotations or other relevant documents before reaching a position on disputed items.'],
['Ending the fixed term early','Giving one month’s notice does not automatically entitle you to end this fixed tenancy. Any early ending must follow the agreement and any separate written arrangement reached with Mr Tan. Do not assume an informal conversation changes the signed obligations.']];
export const questions = [
['Which contract provisions would you review for the proposed floor deduction?',['Only the deposit amount','Condition records, use and damage, and deposit / handover provisions','Only the S$200 minor-repair limit']],
['What can a move-out photo showing a floor scratch establish on its own?',['The scratch was present at move-out','The tenant caused it','Mr Tan has accepted that it was pre-existing']],
['What is missing from a move-out photo alone?',['A basis for comparing when and where the scratch first appeared','The tenant’s bank details','Nothing else is needed to determine responsibility']],
['How would you respond at this point?',['Accept the deduction because I have no records to hand','Ask for the relevant comparison records and an explanation of this deduction','Reject every deduction without reviewing the materials']]];
export const clarifications = [
['Appendix A says “Good”. What if I find a problem after moving in?','Send me dated photos and notes within 7 calendar days of moving in. I’ll confirm they arrived, then check the items. We’ll keep any agreed corrections in writing.'],
['How will we distinguish existing defects, ordinary wear and new damage?','Let’s compare the move-in and move-out records, then look at what happened and the relevant terms for each item.'],
['Can I see photographs, quotations and explanations for proposed deductions?','Yes. I’ll share the photos, quotes and reasons behind any proposed deduction. Let me know what needs clarifying.'],
['Does the S$200 minor-repair arrangement apply to a fault that already existed?','Not just because it costs less than S$200. We’d need to check the earlier fault and whether that repair is covered.']];
export const tasks = [
{title:'Record the starting condition',prompt:'Link the provisions that let you supplement the preliminary furniture list after inspecting the room.',ids:['3','A'],role:'Dated records can support a written correction to the preliminary list.'},
{title:'Separate damage from repair limits',prompt:'Link the provisions needed before deciding whether the S$200 arrangement applies.',ids:['4','5'],role:'Check the facts and scope before applying an amount limit.'},
{title:'Review a proposed deduction',prompt:'Link the provisions that connect the deposit to handover and supporting materials.',ids:['2','6'],role:'Review the proposed deduction against records and supporting materials.'}];

export const contractOptions=[
 [tasks[0].role,'The initial inventory fixes the starting condition; later notes mainly identify repairs to arrange.','Dated records replace the initial inventory without needing a separate agreed correction.'],
 [tasks[1].role,'The repair clause allocates costs first; the damage clause matters when the quote exceeds the limit.','An existing fault rules out any tenant repair contribution, without checking the cause or repair scope.'],
 [tasks[2].role,'Handover records establish the condition, so a matching deduction can be accepted without supporting cost materials.','The deposit provision sets the amount available; the handover review only checks that the keys were returned.']
];
