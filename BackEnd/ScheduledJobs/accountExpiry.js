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
	var dExpire = new GlideDateTime(userGr.u_account_expires).getLocalDate();
	var dFirst = new GlideDateTime(gs.daysAgo(iFirstReminder)).getLocalDate();
	var dFinal = new GlideDateTime(gs.daysAgo(iFinalReminder)).getLocalDate();
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

/****/

var byManager = {};
var mgrGr = new GlideRecord('sys_user');
var count = 0;
var logSource = 'FAI/TM - Account Expiry Check';
var logOutput = [];
var resultArr = [];
var stopWatch = new GlideStopWatch();
var now, fourWeeks;
//
// Query for all users in specific OUs whose account is expiring
// Will not return results if 'u_account_expiry' is empty, or the account expiry is prior to today
var userGr = new GlideRecord("sys_user");
userGr.addActiveQuery();
userGr.addNotNullQuery("u_account_expires");
userGr.addQuery('u_account_expires', '>', gs.nowDateTime());
userGr.addQuery('source','CONTAINS','OU=Contractor').addOrCondition('source','CONTAINS','OU=Temporary Employee');
userGr.query();
while(userGr.next()){
	now = new GlideDateTime();
	fourWeeks = now.addDays(28);
	// Check if account expiry date is within 28 days/4 weeks
	if(now.getDate() > new GlideDateTime(userGr.u_account_expires)) {
		// Increment Count
		count ++;
		// Clear userObj
		userObj = {};
		// Log
		logOutput.push('Pushing ' + getOutput(userGr));
		// Set values into object
		userObj.manager = userGr.getValue('manager');
		userObj.employeeId = userGr.getValue('user_name');
		userObj.employeeName = userGr.getValue('name');
		userObj.employeeExpires = new GlideDateTime(userGr.u_account_expires).getLocalDate().toString();
		userObj.daysTillExpire = calcDays(new GlideDateTime(), new GlideDateTime(userGr.u_account_expires), true);
		// Push object into array
		resultArr.push(userObj);
	}
}
// Create a new object grouped by manager
resultArr.forEach(function (x) {
	var found = byManager[x.manager];
	if (!found) {
		byManager[x.manager] = [];
		found = byManager[x.manager];
	}
	found.push({
		employeeId: x.employeeId,
		employeeName: x.employeeName,
		employeeExpires: x.employeeExpires,
		daysTillExpire: x.daysTillExpire
	});
});
// Loop through the new object and trigger the event
for (var manager in byManager) {
	// Get the manager user record- use this to determine language in the notification template
	mgrGr.get(manager);
	gs.eventQueue('account.expiry.reminder', mgrGr, mgrGr.getUniqueValue(), JSON.stringify(byManager[manager])); 
}
gs.log('Processed ' + count + ' expiring user accounts ' + ' (' + stopWatch.toString() + ' )', logSource);
gs.log('Accoung expiry data: ' + logOutput, logSource);
/*
* Calculates duration between two dates in days
* @param {object/date} now - the current date
* @param {object/date} expires - expiry date
* @return {number} date difference in number of days
*/
function calcDays(now,expires) {
	var seconds = gs.dateDiff(now, expires, true);
	if(Math.floor(seconds / 86400)>1 || Math.floor(seconds / 86400)==0.0) {
		return   Math.floor((seconds / 86400)+1);
	} else {
		return   Math.floor((seconds / 86400)-1);
	}
}
/*
* Returns a formatted output of record data/fields
* @param {object} userGr - user object record
* @return {string} formatted string output
*/
function getOutput(userGr) {
	return userGr.getValue('user_name') + ' | ' + userGr.getDisplayValue('manager') + ' | ' + new GlideDateTime(userGr.u_account_expires).getLocalDate() + ' | ' + now.getDate().toString() + ' | ' + calcDays(new GlideDateTime(), new GlideDateTime(userGr.u_account_expires), true);
}
