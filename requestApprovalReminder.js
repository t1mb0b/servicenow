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



/************************************************************************************************
************************************************************************************************/

{
	// Instantiate the Utils Library
	var oAru = new ApprovalReminderUtils();
	// Get the properties
	var iNumReminders = parseInt(gs.getProperty("approval.reminder.number"));
	var bCancel = gs.getProperty("approval.reminder.cancel");
	var oSchedule = gs.getProperty("approval.reminder.schedule");
	var oRelDur = gs.getProperty("approval.reminder.relduration");
	// Instantiate DurationCalculator Object
	var oDc = new DurationCalculator();
	// Add schedule to the durationcalculator
	oAru.addSchedule(oDc);
	// Initiate the query to the Approval table
	var oApproval = new GlideRecord("sysapproval_approver");
	oApproval.addQuery("state", "requested");
	oApproval.addQuery("sysapproval.sys_class_name", "sc_req_item");
	// Debug - set limit for now
	oApproval.setLimit(10);
	oApproval.query();
	while(oApproval.next()){
		// Get the event based on the task type
		//var sEvent = oAru.getEvent(oApproval.sysapproval.sys_class_name.toString());
		var sEvent = "approval.reminder";
		var sApprover = oApproval.getValue('approver');
		// Check if we have existing reminder records
		var oReminder = new GlideRecord('u_approval_reminders');
		oReminder.addQuery('u_approval_for.sysapproval', oApproval.sysapproval);
		oReminder.query();
		// If we do, we want to iterate through those; no need to create a new one
		if (oReminder.next()) {
			// Check if Active
			var bReminder = oReminder.getDisplayValue('u_active');
			if (bReminder == 'false') {
				continue;
			}
			// Get the current reminder value
			var iReminder = oReminder.getValue('u_reminder');
			// Get the updated date; determines start date of next duration
			var dReminder = new GlideDateTime(oReminder.u_test_date);
			// Set the Start Date on the duration calculator
			oAru.setStart(oDc,dReminder,oRelDur);
			// Check to see if we have any left to send
			 if (parseInt(iReminder) < iNumReminders && gs.nowDateTime() > oDc.getEndDateTime()) {
				iReminder = parseInt(iReminder) + 1;
				oReminder.setValue('u_reminder', iReminder.toString());
				oReminder.update();
				gs.print("Reminder " + iReminder + " for " + oApproval.sysapproval.number + " ending at " + oDc.getEndDateTime());
				gs.eventQueue(sEvent, oApproval, sApprover, oReminder.u_reminder.getChoiceValue());
			// If we've reached the max number of reminders, we'll set the final	 
			} else if (parseInt(iReminder) == iNumReminders && gs.nowDateTime() > oDc.getEndDateTime()) {
				gs.print("Setting final reminder for " + oApproval.sysapproval.number);
				oReminder.setValue('u_reminder', 'final');
				oReminder.update();
				gs.eventQueue(sEvent, oApproval, sApprover, oReminder.u_reminder.getChoiceValue());
			// If we've sent the final reminder, we can perform the final action
			} else if (iReminder == 'final' && gs.nowDateTime() > oDc.getEndDateTime()) {
				// Check if we need to cancel
				if (bCancel == "true") {
					//oApproval.setValue('state', 'rejected');
					oApproval.comments = "Approval automatically rejected after " + (iNumReminders+1) + " reminders sent to the approver";
					oApproval.update();
					oReminder.setValue('u_active', 'false');
					oReminder.setValue('u_reminder', 'rejected');
					oReminder.update();
					gs.print("Rejecting Approval");
				}
			}
		// We have no reminder records, so let's create the first one	
		} else 	{
			// Get the created date of the approval record
			var dApproval = new GlideDateTime(oApproval.sys_created_on);
			// Set the Start Time of the duration calculator for the approval record
			oAru.setStart(oDc,dApproval,oRelDur);
			// If now is greater than the calculated duration
			if (gs.nowDateTime() > oDc.getEndDateTime()) {
				gs.print("Inserting for " + oApproval.sysapproval.number + " ending " + oDc.getEndDateTime());
				oReminder.initialize();
				oReminder.setValue('u_approval_for', oApproval.sys_id);
				oReminder.setValue('u_reminder', '1');
				oReminder.setValue('u_active', 'true');
				oReminder.insert();
				gs.eventQueue(sEvent, oApproval, sApprover, oReminder.u_reminder.getChoiceValue());
			}
		}
	}
})();


=====================================================
	
FAIApprovalReminders.prototype = {
	initialize: function() {
		this.oSchedule = gs.getProperty("fai.approval_reminder.schedule");
		this.oSchedId = gs.getProperty("fai.approval_reminder.scheduleId");
		this.iBusinessHours = parseInt(gs.getProperty("fai.approval_reminder.interval"));
		this.iNumReminders = parseInt(gs.getProperty("fai.approval_reminder.number"));
		this.bCancel = gs.getProperty("fai.approval_reminder.cancel");
		this.sEvent = "fai.approval.reminder";
	},
	
	insertReminder : function (oReminderInsert) {
		var sAppSysId = oReminderInsert.sa_sys_id.toString();
		var dAppStart = new GlideDateTime(oReminderInsert.sa_sys_created_on);
		var oReminder = new GlideRecord('u_approval_reminders');
		oReminder.initialize();
		oReminder.setValue('u_approval_for', sAppSysId);
		oReminder.setValue('u_reminders_sent', '0');
		oReminder.setValue('u_active', 'true');
		oReminder.setValue('u_send_next_reminder', this._calcNextReminder(dAppStart));
		gs.print("Inserting for " + oReminderInsert.sa_sysapproval.number + " | " + dAppStart + " | " + this._calcNextReminder(dAppStart));
		oReminder.insert();
	},
	
	sendReminder : function (sReminder,sApproval) {
		var oReminder = new GlideRecord('u_approval_reminders');
		if (oReminder.get(sReminder)) {
			var iReminder = parseInt(oReminder.getValue('u_reminders_sent')) + 1;
			var dReminder = new GlideDateTime(oReminder.u_send_next_reminder);
			oReminder.setValue('u_reminders_sent', iReminder.toString());
			// If we're at the maximum number of reminders, we need to the cancel date
			if (iReminder == this.iNumReminders) {
				oReminder.setValue('u_send_next_reminder', '');
				oReminder.setValue('u_cancel_approval', this._calcNextReminder(dReminder));
			} else {
				oReminder.setValue('u_send_next_reminder', this._calcNextReminder(dReminder));
			}
			gs.print("Sending Reminder" + iReminder + " for " + oReminder.u_approval_for.sysapproval.number + " | " + this._calcNextReminder());
			oReminder.update();
			// We need to approval object to pass to the event
			var oApproval = new GlideRecord("sysapproval_approver");
			oApproval.get(sApproval);
			// Trigger the event
			gs.eventQueue(this.sEvent, oApproval, oApproval.approver, oReminder.u_reminders_sent);
		}
	},
	
	deactivateReminder : function (sReminder) {
		gs.print("Deactivating SysId " + sReminder);
		var oReminder = new GlideRecord('u_approval_reminders');
		if (oReminder.get(sReminder)) {
			// Clear all of the values on the record
			oReminder.setValue('u_send_next_reminder', '');
			oReminder.setValue('u_cancel_approval', '');
			oReminder.setValue('u_active', 'false');
			oReminder.update();
			gs.print("Deactivating reminder for " + oReminder.u_approval_for.sysapproval.number);
		}
	},
	
	cancelApproval : function (sReminder,sApproval) {
		gs.print("Cancelling SysId " + sReminder + " | " + sApproval);
		var oReminder = new GlideRecord('u_approval_reminders');
		if (this.bCancel == 'true') {
			var oApproval = new GlideRecord('sysapproval_approver');
			if(oApproval.get(sApproval)) {
				gs.print("Cancelling " + oApproval.sysapproval.number);
				oApproval.setValue('state','rejected');
				oApproval.update();
			}
		}
		if (oReminder.get(sReminder)) {
			this.deactivateReminder(sReminder);
		}
	},
	
	getDurationHours : function (dStartDate) {
		var oSched = new GlideSchedule(this.oSchedId);
		var dStart = new GlideDateTime(dStartDate);
		var oDur = oSched.duration(dStart, new GlideDateTime());
		return oDur.getNumericValue()/3600000;
		//var iHours = oDur.getNumericValue()/3600000;
		//return iHours;
	},
	
	getStartDateTime : function(endDateTime, hoursAgo) {
		endDateTime = endDateTime || new GlideDateTime();
		hoursAgo = Math.abs(parseInt(hoursAgo)) || 0;
		var oDurCalc = new DurationCalculator();
		var startDateTime = new GlideDateTime(endDateTime);
		// Start with hoursAgo and subtract from there
		startDateTime.addSeconds(hoursAgo * -3600);
		this.addSchedule(oDurCalc);
		while (oDurCalc.calcScheduleDuration(startDateTime, endDateTime) < hoursAgo * 3600) {
			// Subtract an hour
			startDateTime.addSeconds(-3600);
			oDurCalc.setStartDate(startDateTime);
		}
		return startDateTime;
	},
	
	
	addSchedule : function (oDuration) {
		// Load the schedule into our duration calculator.
		var sScheduleName = this.oSchedule;
		var oSched = new GlideRecord('cmn_schedule');
		oSched.addQuery('name', sScheduleName);
		oSched.query();
		if(!oSched.next()){
			gs.log('*** Could not find schedule "'+ sScheduleName +'"');
			return;
		}
		// Don't pass the timezone value, we get that from the schedule itself
		oDuration.setSchedule(oSched.getUniqueValue());
	},
	
	/*
 	*
 	* Internal Functions; called only within SI
 	*
 	*/
	
	_calcNextReminder : function(dStart) {
		dStart = new GlideDateTime(dStart) || new GlideDateTime();
		var oSched = new GlideSchedule(this.oSchedId);
		var oDuration = new GlideDuration(60 * 60 * 1000 * this.iBusinessHours);
		return oSched.add(dStart, oDuration);
	},
	
	type: 'FAIApprovalReminders'
};

=============================
	
var scReqItemAR = new FAIApprovalReminders('sc_req_item');
scReqItemAR.insertReminders();
scReqItemAR.cancelReminders();
scReqItemAR.sendReminders();
scReqItemAR.cancelApprovals();
