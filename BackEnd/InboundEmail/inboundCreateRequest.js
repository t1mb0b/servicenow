// Some user-specific stuff
var ourUser = gs.getUser();
var isVIP = gs.getUser().getRecord().getValue('vip');
var catItem = "2b7e060237e3ae0053856ec2b3990e6f"; //Default catalog item is question
//gs.log("TM===> Email From is " + email.from + " and email.direct is " + email.direct, "Q: Inbound Action");

//current.location = ourUser.getLocation();
//Script to remove security text from emails
var geu = new EmailUtil();
var cleanBody = geu.removeSecurityText(email.body_text);
var cleanText = "Subject: " + email.subject + "\n";
cleanText += "From: " + email.from + "\n";
cleanText += "To: " + email.direct + "\n";
if (email.copied) {  
  cleanText += 'CC: ' + email.copied + '\n\n';  
}  
cleanText += "\n" + cleanBody;
var checkAddresses = email.direct.toLowerCase().split(",");

var oEmails = checkAddresses.forEach(function(address) {
	var emailAddress = address;
	//Get catalog item information
	var objIncomingMap = new GlideRecord("u_incoming_addresses");
	objIncomingMap.addQuery("u_email_address", emailAddress);
	objIncomingMap.addQuery("u_table", "request");
	objIncomingMap.query();
	if(objIncomingMap.next()){
		catItem = objIncomingMap.u_catalog_item.sys_id;
	}
	
});

//Check is user is VIP
//if (isVIP == true) {
	//	gs.log("TM ===> " + ourUser.getFullName() + " has been identified as a VIP", "Q: Inbound Action isVIP");
	//	current.urgency = 1;
	//}
	
gs.include('Cart');
//create a cart
var catCart = new Cart();
var item = catCart.addItem(catItem, 1);
catCart.setVariable(item, 'requested_for', ourUser);
catCart.setVariable(item, 'comments', cleanText);
var placeOrder = catCart.placeOrder();

// Add attachments to RITM  
var ritmRec = new GlideRecord("sc_req_item");  
ritmRec.addQuery("request", placeOrder.getValue('sys_id'));
gs.log("TM===> Cart is " + placeOrder.getValue('sys_id'), "Q: HR Inbound Action");
ritmRec.query();  
if(ritmRec.next()){
	gs.log("TM===> Item returned " + ritmRec.sys_id + " | " + ritmRec.number + " | " + ritmRec.cat_item, "Q: Inbound Action");
	var ritmSysID = ritmRec.sys_id;
}  

// Query Email Table
var emailRec = new GlideRecord("sys_email");  
emailRec.addQuery("uid", email.uid);  
emailRec.orderByDesc("sys_created_on");  
emailRec.query();  
if(emailRec.next()){ 
  gs.log("TM===> Attachment " + emailRec.sys_id + " from email " + email.uid, "Q: Inbound Action");
  GlideSysAttachment.copy("sys_email", emailRec.sys_id, "sc_req_item", ritmRec.sys_id);  
}  

// Update Task Record to set Subject and Description fields

var task = new GlideRecord("sc_task");
task.addQuery("request_item", ritmSysID);
task.query();
if(task.next()) {
	task.description = cleanText;
	task.short_description = email.subject;
	task.update();
}

// Stop Further Processing
event.state="stop_processing";
