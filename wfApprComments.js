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
