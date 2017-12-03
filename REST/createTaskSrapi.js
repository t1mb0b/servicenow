(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	// Declare Data Object
	var oData = request.body.data;
	// Initialize Query to Tim Tasks table
	var oGr = new GlideRecord('u_tim_tasks');
	oGr.initialize();
	// Set values based on request data
	oGr.setValue('short_description', oData.short_description);
	oGr.work_notes = oData.work_notes;
	oGr.description = oData.description;
	oGr.assignment_group.setDisplayValue(oData.assignment_group);
	/* 
	   Function to check if the name sent in the request matches
	   something in the sys_user table. If not, set the
	   opened_by to 'SAP User' service account. As an added
	   bonus, let's also log the user name in the description 
	   of the task. 
	*/
	function setOpenedBy() {
		// Check if user exists in sys_user table
		var oUser = new GlideRecord('sys_user');
		if (!oUser.get('name', oData.opened_by)) {
			// if not, set to 'SAP User'
			oGr.opened_by.setDisplayValue('SAP User');
			oGr.description += "\n\n" + "Submitted by " + oData.opened_by;
		} else {
			// if yes, set to name sent in request
			oGr.opened_by.setDisplayValue(oData.opened_by);
			oGr.description += "\n\n" + "Submitted by " + oGr.opened_by.getDisplayValue();
		}
	}
	// Call the function to set the opened_by field
	setOpenedBy();
	// Insert the record
	oGr.insert();
	// Declare the response object
	var oResponseObj = {};
		oResponseObj.number = oGr.number;
		oResponseObj.sys_id = oGr.sys_id;
		// Return response with number and sys_id to be stored on the remote end for reference
		return oResponseObj;
	})(request, response);
