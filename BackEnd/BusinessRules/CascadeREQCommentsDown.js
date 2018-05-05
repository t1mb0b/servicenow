// When: after
// on: update
// filter conditions: active is true, additional comments changes
// script conditon: gs.getUserID() == current.opened_by || gs.getUserID() == current.requested_for
//

(function executeRule(current, previous /*null when async*/) {
	// Regex to strip header info from journal entries
	var headerRE = /.+\n/;
	// Get the latest comment in the record; strip out the header
	var sComment = "Comment added from " + current.number + "\n\n";
	sComment += current.comments.getJournalEntry(1).replace(headerRE, '');
	// Declare Items Array
	var aItems = [];
	// Get the RITMS for the REQ
	var oRitms = new GlideRecord("sc_req_item");
	oRitms.addActiveQuery();
	oRitms.addQuery("request", current.sys_id);
	oRitms.query();
	while(oRitms.next()) {
		// Set the temp flag attribute so the RITM BR
		// has a reference to it in the 'current' object
		oRitms.temp_flag = "REQ";
		// Push the sys_id to the array
		aItems.push(oRitms.sys_id.toString());
		// Update the record with the comment
		oRitms.comments = sComment;
		oRitms.update();
	}
	//gs.log("TM===>Items are " + aItems, "Q:Cascade Comments BR");
	// Loop through Tasks and add comment
	aItems.forEach(function(oItem) {
		var oTask = new GlideRecord("sc_task");
		//oTask.addActiveQuery();
		oTask.addQuery("request_item", oItem);
		oTask.addActiveQuery();
		oTask.query();
		while(oTask.next()) {
			//gs.log("TM===>Updating " + oTask.number, "Q: Cascade Comments BR");
			oTask.comments = sComment;
			oTask.update();
		}
	});
})(current, previous);
