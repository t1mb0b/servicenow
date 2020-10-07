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

//Name: push comments to tasks
//Table: Request Item
//When: Before
//Insert: false
//Author: 'jace'
//Update:true
(function executeRule(current, previous /*null when async*/) {
    try{
        var sc_task = new GlideRecord('sc_task');
        sc_task.addQuery('request_item', current.sys_id);
        sc_task.addQuery('active','true');
        sc_task.query();
        while(sc_task.next()){
            sc_task.comments = current.comments;
            sc_task.setUseEngines(false);
            // Tells the system not to run anything
            // with "engine" in the name from this list.
            // https://is.gd/gsNiQZ
            sc_task.update();
            var email = {};
            if(sc_task.assigned_to){
                email.sys_id = sc_task.getValue('assigned_to');
                email.name = sc_task.assigned_to.getDisplayValue();
            } else {
                email.sys_id = sc_task.getValue('assignment_group');
                email.name = sc_task.assignment_group.getDisplayValue();
            }
            gs.eventQueue("custom.catalog.ritm.commented",
                          sc_task,
                          email.sys_id,
                          email.name);
        }
    } catch (error) {
        var log = 'Push comments to tasks';
        gs.log('Error: ' + error, log);
    }
})(current, previous);
