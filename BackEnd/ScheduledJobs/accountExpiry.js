//
var iFirstReminder = -14;
var iFinalReminder = -7;
//
var userGr = new GlideRecord("sys_user");
userGr.addActiveQuery();
userGr.addNotNullQuery("u_account_expires");
userGr.addQuery('source','CONTAINS','OU=Contractor').addOrCondition('source','CONTAINS','OU=Temporary Employee');
userGr.query();
while(userGr.next()){
	var dExpire = new GlideDateTime(userGr.u_account_expires.split(' ')[0]);
	var dFirst = new GlideDateTime(gs.daysAgo(iFirstReminder).split(' ')[0]);
	var dFinal = new GlideDateTime(gs.daysAgo(iFinalReminder).split(' ')[0]);
	var userEvent = userGr.preferred_language == "fq" ? "account.expiry.reminder.fr" : "account.expiry.reminder.en";
	if(dExpire.equals(dFirst)) {
		gs.eventQueue(userEvent, userGr, userGr.sys_id);
	}
	if(dExpire.equals(dFinal)) {
		var oCart = new Cart();
		var oItem = oCart.addItem('9c0bd819db76fa40a407d92b5e961920');
		oCart.setVariable(oItem, 'requested_for', userGr.sys_id);
		oCart.setVariable(oItem, 'opened_by', userGr.sys_id);
		oCart.setVariable(oItem, 'extend_date', gs.daysAgo(-90));
		// Submit the order
		var rc = oCart.placeOrder();
	}
}
