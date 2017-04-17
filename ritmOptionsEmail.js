// Set reply to
email.setReplyTo(current.request.requested_for.email);
var gr = new GlideRecord("sc_req_item");
gr.addQuery("request", current.request.sys_id);
//gs.log("TM ===> Querying with REQ " + current.request.sys_id, "Q: REQ SYSID");
gr.query();
while(gr.next()) {
	template.print("<table style='border: 1px solid black; border-collapse:collapse;'>");
	template.print("<tr><td colspan='2' style='border: 1px solid black; padding: 5px;'><i>Summary of " + gr.number + ":  " + gr.cat_item.getDisplayValue() + "</i></td>");
	// Get Owned Variables for Requested Item and sort by Order
	var ownvar = new GlideRecord('sc_item_option_mtom');
	ownvar.addQuery('request_item.number', gr.number);
	ownvar.addQuery('sc_item_option.value','!=','');
	ownvar.addQuery('sc_item_option.value','!=','undefined');
	ownvar.orderBy('sc_item_option.order');
	ownvar.query();
	while(ownvar.next()) {
		var field = ownvar.sc_item_option.item_option_new;
		var fieldValue = ownvar.sc_item_option.item_option_new.name;
		template.print("<tr>");
		template.print("<td width='50%' style='border: 1px solid black; padding: 5px;'><b>" + field.getDisplayValue() + "</b></td><td width='50%' style='border: 1px solid black; padding: 5px;'> " + gr.variables[fieldValue].getDisplayValue() + "</td>");
		template.print("</tr>");
	}
	template.print("</table>");	
}
