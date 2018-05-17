(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	// Declare Data Object
	var oData = request.body.data;
	// Declare the response object
	var oResponseObj = {};
	// Initialize Query to Incident table
	var oInc = new GlideRecord('incident');
	oInc.initialize();
	oInc.setValue('short_description', oData.short_description);
	oInc.description = oData.description;
	oInc.assignment_group.setDisplayValue(oData.assignment_group);
	oInc.setValue('caller_id', _getUser(oData.opened_by));
	oInc.setValue('opened_by', _getUser(oData.opened_by));
	oInc.setValue('category', "Service Request");
	oInc.setValue('contact_type', "email");
	oInc.setValue('location', gs.getUser().getUserByID(oData.opened_by).getLocation());
	// Insert the record
	oInc.insert();
	// Populate Response Object
	oResponseObj.number = oInc.number;
	oResponseObj.sys_id = oInc.sys_id;
	// Return response with number and sys_id to be stored on the remote end for reference
	return oResponseObj;
	/*
	* Helper Functions 
	*/
	// Returns sys_id from username passed in POST request
	function _getUser(userName) {
		var gr = new GlideRecord("sys_user");
		gr.addQuery("user_name", userName);
		gr.query();
		if(gr.next()) {
			return gr.sys_id;
		} else {
			// Return Generic WebSVC User SysId if not match is found
			return '99420aff6f7d92008212a4e44b3ee4ea';
		}
	}
})(request, response);
