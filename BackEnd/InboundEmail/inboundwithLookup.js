(function(){
	var oGeu = new EmailUtil();
	var sCleanText = oGeu.removeSecurityText(email.body_html);
	var sCleanerText = oGeu.removeVarText(sCleanText);
	var aEmails = email.direct.toLowerCase().split(",");
	var oTable = current.getTableName();
	// Set Values based on email object parameters
	current.u_description_html = sCleanerText;
	current.short_description = email.subject.toString();
	current.contact_type = "email";
	/* Check for Workflow ID in Body */
	if(email.body.workflowid !== undefined) {
		current.u_tbox_wkflow_id = email.body.workflowid;
	}
	/** Loop through aEmails array and determine assignment group **/
	aEmails.forEach(function(sEmail) {
		//gs.log("TM===> Address is " + sEmail);
		if (email.body.assignment_group !== undefined) {
			//gs.log("TM===> Email Body has " + email.body.assignment_group);
			current.assignment_group.setDisplayValue(email.body.assignment_group);
			/** Insert Record **/
			current.insert();
			event.state="stop_processing";
		} else {
			/** Query DB **/
			//gs.log("TM===>No ass grp found, querying DB for " + sEmail, "Q: Inbound Action");
			var oGr = new GlideRecord("u_incoming_addresses");
			oGr.addQuery("u_email_address", sEmail);
			oGr.addQuery("u_table", "u_tim_tasks");
			oGr.query();
			if(oGr.next()){
				//gs.log("TM===> Queried to " + oGr.u_group.name, "Q: Inbound Action");
				/** If we match, set the assignment group **/
				current.assignment_group.setDisplayValue(oGr.u_group);
				if(oGr.u_send_automated_reply == true  && gs.getUserID() == '5136503cc611227c0183e96598c4f706'){
					gs.eventQueue("incoming.address.response", oGr, email.from, gs.getUserID());
				}
				/** Insert Record **/
				current.insert();
				event.state="stop_processing";
			}
		}
		
	});
	
})();
