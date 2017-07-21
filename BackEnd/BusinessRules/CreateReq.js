/*
before, 1,000


*/
(function executeRule(current, previous /*null when async*/) {
	// Set sRequestedFor variable
	var sRequestedFor = !current.requested_by ? gs.getUserID() : current.getValue('requested_by');
	// Create the Cart object and Item
	var oCart = new Cart();
	var oItem = oCart.addItem('3bcfdc3cdbefb2009d2d572e5e961982');
	oCart.setVariable(oItem, 'requested_for', sRequestedFor);
	oCart.setVariable(oItem, 'req_type', 'New');
	oCart.setVariable(oItem, 'device_name', current.u_not_listed_ci.toString());
	oCart.setVariable(oItem, 'assigned_to', current.assigned_to.toString());
	oCart.setVariable(oItem, 'support_group', current.assignment_group.toString());
	oCart.setVariable(oItem, 'item_details', current.number.toString() + " : " + current.short_description.toString());
	// Submit the order
	var rc = oCart.placeOrder();
	var sMessage = "Created New CI Request " + rc.number;
	// Update Record with note regarding Request Creation
	gs.addInfoMessage(sMessage);
	current.work_notes = sMessage;
})(current, previous);
