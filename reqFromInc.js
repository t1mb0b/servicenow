// Execute Function
/* createReq();
// Function Declaration
function createReq() {
	var oCart = new Cart();
	var oItem = oCart.addItem('7c0c7a56db823600ad75ffa31d9619f0');
	oCart.setVariable(oItem, 'requested_for', current.caller_id.sys_id.toString());
	oCart.setVariable(oItem, 'summary_req', current.short_description);
	oCart.setVariable(oItem, 'request_details', 'Converted to Request from: ' + current.number + '\n\n' + "Incident Description: " + current.description + '\n\n');
	// Submit the order
	var rc = oCart.placeOrder();
	// Update Incident with note regarding Request Creation
	current.work_notes = "Created Request " + rc.number + " from this Incident";
	current.update();
	// Redirect to the Request Record
	action.setRedirectURL(rc);
	// Display a message
	gs.addInfoMessage("Created Request from " + current.number);
} */
	/*	current.close_code = 'Not Solved (is a Request)';
	current.close_notes = 'Opened in Error, converting to Misc Request';
	current.comments = 'Converted Incident to Request: ' + rc.number;
	//sets the REQ on the parent INC
	current.u_request = rc.sys_id.toString();
	current.reassignment_count = 1;
	current.state = 6;
	
	GlideSysAttachment.copy('incident', current.sys_id, 'sc_request', rc.sys_id);
	//Update saves incidents before going to the catalog homepage
	
	+ current.comments.getJournalEntry(3) + '\n\n' + current.work_notes.getJournalEntry(3));
	
	current.update();
 	*/
  
  
  ======
  
  var sDesc = current.description;
var sShortDesc = current.short_description;
var sUser = current.caller_id.toString();
gs.addInfoMessage(sUser + " | " + sShortDesc + " | " + sDesc);

var url = 'com.glideapp.servicecatalog_cat_item_view.do?sysparm_id=7c0c7a56db823600ad75ffa31d9619f0&sysparm_sdesc='+sShortDesc+'&sysparm_user='+sUser+'&sysparm_desc='+sDesc;
action.setRedirectURL(url);
function onLoad() {
	//Use the 'getParameterValue' function below to get the parameter values from the URL
	var sUser = getParameterValue('sysparm_user');
	var sShortDesc = getParameterValue('sysparm_sdesc');
	var sDesc = getParameterValue('sysparm_desc');
	if (sUser) {
		g_form.setValue('requested_for', sUser);
	}
	if (sShortDesc) {
		g_form.setValue('summary_req', sShortDesc);
	}
	if (sDesc) {
		g_form.setValue('request_details', sDesc);
	}
}

function getParameterValue(name) {
	var url = document.URL.parseQuery();
	if (url[name]) {
		return decodeURI(url[name]);
	} else {
		return;
	}
}

=====
/* Client Script on Cat Item */
