// get the OG vars by querying the ritm table
var ogReq = new GlideRecord("sc_req_item");
if (ogReq.get("request", current.sys_id)) {
var opProj = ogReq.variables.project;
}
// Run the ifScript
answer = ifScript();
function ifScript() {
	// Set the vars
	var oBy = current.opened_by;
	var projMan = '';
	//gs.log("===>TM Opened by is " + oBy + " for " + opProj,"WF: SC Req WF");
	// Get the Project Record
	var pGr = new GlideRecord('u_active_projects');
	if(pGr.get(opProj)) {
		// Set the var for the manager 
		projMan = pGr.u_project_manager;
		//gs.log("===>TM: Proj Manager is " + projMan, "WF: SC Req WF");
	}
	// if opened by does not match cost centre manager, we need approval
	if (projMan != oBy) {
		//gs.log("===>TM: " + projMan + " does not match " + oBy, "WF: SC Req Requires Approval");
		return 'yes';
	}
	//gs.log("===>TM: " + projMan + " matches  " + oBy,"WF: SC Req WF Does not Require Approval");
	return 'no';
	
}
