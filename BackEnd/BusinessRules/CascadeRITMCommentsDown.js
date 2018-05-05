// when: after, 120
// on: update
// filter conds: active is true, add comments changes
// script conds: gs.getUserID() == current.opened_by || gs.getUserID() == current.request.requested_for
//

(function executeRule(current, previous /*null when async*/) {
	//gs.log("TM===> Temp Var " + current.temp_flag, "Q: RITM BR");
	// Check for the 'temp_flag' in the 'current' object
	// If it exists, we don't need to trigger this BR
	if (current.temp_flag == "REQ"){
		return;
	} 
	// Regex to strip header info from journal entries
	var headerRE = /.+\n/;
	// Get the latest comment in the record; strip out the header
	var sComment = "Comment added from " + current.number + "\n\n";
	sComment += current.comments.getJournalEntry(1).replace(headerRE, '');
	var oTask = new GlideRecord("sc_task");
		//oTask.addActiveQuery();
		oTask.addQuery("request_item", current.sys_id);
		oTask.addActiveQuery();
		oTask.query();
		while(oTask.next()) {
			//gs.log("TM===>Updating " + oTask.number, "Q: Cascade Comments BR");
			oTask.comments = sComment;
			oTask.update();
		}
})(current, previous);
