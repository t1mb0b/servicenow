	checkAccess: function(userId, groupName){
		var gr = new GlideRecord("sys_user_grmember");
		gr.addQuery("user", userId);
		gr.addQuery("group.name", groupName);
		gr.query();
		if(gr.next()){
			return true;
		} else {
			return false;
		}
	},



+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// Check if incident is part of restricted group
if(current.assignment_group.u_restricted_access == true) {
// If yes, check if user is part of service desk
	var user = gs.getUserID();
    var cga = new checkGroupAccess();
	if(cga.checkAccess(user, "Service Desk")){
		answer = true;
	} else {
		// If not part of service desk then check if user is part of restricted group
		if(cga.checkAccess(user, current.assignment_group.name)){
			answer = true;
		} else {
			answer = false;
		}
	}
} else {
   answer = true;	
}
