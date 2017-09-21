gs.log("Current SC_TASK is: " + workflow.scratchpad.taskNum, "Q: Task Number at this point of WF");
var ac = new GlideRecord('sysapproval_approver');
ac.addQuery('sysapproval', current.sys_id);
ac.addQuery('comments','!=',''); // only find approvals that have comments on them
ac.query();
while (ac.next()) {
	var apprComm = ac.comments.getJournalEntry(-1);
	var ta = new GlideRecord('sc_task');
	ta.get('number', workflow.scratchpad.taskNum);
	ta.work_notes = apprComm;
	gs.log("TM ==> Updating " + ta.number + "with comments: " + apprComm, "Q: Grab Approval Comments Activity");
	ta.update();
	workflow.scratchpad.apprComments = apprComm;
}

====================================
	
task.short_description = "Process " + current.cat_item.name + " for " + current.request.requested_for.name;
/*

Paste the worknotes and approval comments in the task if they exist

*/
if (JSUtil.notNil(workflow.scratchpad.wkNotes)) {
	task.work_notes = "\n---\nComments from Review Task: " + workflow.scratchpad.wkNotes;
}
if (JSUtil.notNil(workflow.scratchpad.calcWorkNotes)) {
	task.work_notes = "\n----\nComments from Rate Calculation Task: " + workflow.scratchpad.calcWorkNotes;
}
if (JSUtil.notNil(workflow.scratchpad.apprComments)) {
	task.work_notes = "\n---\nComments from Rate Calculation Approval: " + workflow.scratchpad.apprComments;
}
/*

Get Approval Comments from Approved Rate Change

*/
var apv = new GlideRecord('sysapproval_approver');
apv.addQuery('sysapproval',current.sys_id);
apv.addQuery('comments','!=','');
apv.query();
while (apv.next()) { 
task.work_notes = "\n---\nApproval Comments: from " + apv.approver.name + "\n" + apv.comments.getJournalEntry(1); 
}
