// Setup Query; all requests or requested items in state of requested older than 3 days
var eQuery = "state=requested^sysapproval.sys_class_name=sc_request^ORsysapproval.sys_class_name=sc_req_item^sys_created_onRELATIVELE@dayofweek@ago@3";
// ^sys_updated_onRELATIVELE@dayofweek@ago@2
// Create Glide Record Instance
var app = new GlideRecord('sysapproval_approver');
// Add Query
app.addEncodedQuery(eQuery);
// Execute Query
app.query();
// step through the approvals one by one
while (app.next()) {
	// if the reminders haven't reached the max (4)
	if (app.u_reminders < 3) {
		// Fire off the event which triggers the notification
		if (app.sysapproval.sys_class_name == 'sc_req_item') {
			gs.eventQueue('requested.item.approval.reminder', app, app.approver.sys_id);
		} else if (app.sysapproval.sys_class_name == 'sc_request') {
			gs.eventQueue('request.approval.reminder', app, app.approver.sys_id);
		}
		// Increment the Reminders Int and update the record
		app.comments = "Incrementing reminders and sending approval reminder to " + app.approver.name;
		app.u_reminders++;
		app.update();
		// Else if the reminders have maxed out
	} else if (app.u_reminders > 3) {
		if (app.sysapproval.sys_class_name == 'sc_req_item') {
			// Process actions for Requested Items
			ritm = new GlideRecord('sc_req_item');
			ritm.addQuery('request', app.sysapproval.request.sys_id);
			ritm.query();
			// Get the number of items returned
			var numRitms = ritm.getRowCount();
			if (ritm.get(app.sysapproval.sys_id)) {
				var itemReq = new GlideRecord('sc_request');
				if (itemReq.get(ritm.request.sys_id)) {
					if (numRitms > 1) {
						// If the Parent REQ has more than one item, we may not want to cancel it. So, we create a task for SD to look at
						var gTask = new GlideRecord('u_gtasks');
						gTask.initialize();
						gTask.short_description = "Please investigate outstanding approval for " + ritm.number;
						gTask.u_description_html = ritm.number + " belongs parent request " + itemReq.number;
						gTask.u_description_html += " which has other items included." + "\n\n";
						gTask.u_description_html += "Please investigate why " + ritm.number;
						gTask.u_description_html += " still has yet to be approved despite numerous reminders";
						gTask.assignment_group.setDisplayValue('Service Desk');
						gTask.opened_by = ritm.request.opened_by;
						gTask.insert();
					} else {
						// Otherwise, close the parent request
						app.comments = "We've sent enough reminders to " + app.approver.name + ". Cancelling " + ritm.number;
						app.update();
						itemReq.request_state = 'closed_cancelled';
						itemReq.stage = 'closed_complete';
						itemReq.update();
						
					}
				}
			}
		} else if (app.sysapproval.sys_class_name == 'sc_request') {
			// Process actions for Requests
			req = new GlideRecord('sc_request');
			if (req.get(app.sysapproval.sys_id)) {
				app.comments = "We've sent enough reminders to " + app.approver.name + ". Cancelling " + req.number;
				app.update();
				req.request_state = 'closed_cancelled';
				req.stage = 'closed_complete';
				req.update();
				
				
			}
		}
	}
}
