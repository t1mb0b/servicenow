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

=====
	
//Name: push comments to ritm
//Table: Catalog Task
//When: Before
//Insert: false
//Author: 'jace'
//Update:true
// https://jace.pro/post/2017-09-06-syncing-comments/
(function executeRule(current, previous /*null when async*/) {
    try{
        var sc_req_item = new GlideRecord('sc_req_item');
        if(sc_req_item.get(current.request_item)){
            sc_req_item.comments = current.comments;
            sc_req_item.setUseEngines(false);
            // Tells the system not to run anything
            // with "engine" in the name from this list.
            // https://is.gd/gsNiQZ
            sc_req_item.update();
            var email = {};
            email.sys_id = sc_req_item.u_requested_for.sys_id;
            email.name = sc_req_item.u_requested_for.getDisplayValue();
            gs.eventQueue("custom.catalog.ritm.commented",
                          sc_req_item,
                          email.sys_id,
                          email.name);
        }
    } catch (error) {
        var log = 'Push comments to ritm';
        gs.log('Error: ' + error, log);
    }
})(current, previous);
