// Note: current.opened_by is already set to the first UserID that matches the From: email address
//This came with the original email template as well as the "else" pieces below
current.caller_id = gs.getUserID();
current.comments = "received from: " + email.origemail + "\n\n" + email.body_text;
current.short_description = email.subject;
current.contact_type = "email";
current.u_contact_details = email.origemail;
current.description = email.body_text;
var add_watchList = true;
var delete_attachement = false;
var wList = current.watch_list;
//This is for SalesForce emails: it's the parsing of the SEV level and Salesforce Case number
//This piece is to pick out the CMDB References to identify the client environment
if (email.body.environment != undefined)
{
var cmsenv = GetIDValue("cmdb_ci_environment", email.body.environment);
current.u_environment =  cmsenv; 
var env = new GlideRecord("cmdb_ci_environment");
if(env.get(cmsenv)){
   current.u_datacenter = env.u_datacenter;
   current.u_client = env.u_client;
   current.u_product = env.u_product;
} 
}

//This fills out the SN ticket for salesforce
if (email.subject.indexOf("CMS") !=-1)
{
var email_subject = email.subject;
var a = email.subject.indexOf("Severity");
var sev = email_subject.substr((parseInt(a)+9), 1);
var b = email.body_text.indexOf("Case Number:");
var caseno = email.body_text.substr((parseInt(b)+13), 5);

current.u_source="SalesForce";
current.correlation_id = caseno;
current.category = "Platform";
current.subcategory = "Support";
//var kccontactprefex = "KC Point of Contact";
//var kccontactPos = email.body_text.indexOf("KC Point of Contact: ");
//var kccontact = email.body_text.substr((parseInt(kccontactPos)+21), 12);
var kccontact = email.body.KC_Point_of_Contact;
//if (email.body.KC_Point_of_Contact != undefined) {
  //var kccontact = email.body.KC_Point_of_Contact;
//}
var impactPos = email.body_text.indexOf("Impact:");
var impact = email.body_text.substr((parseInt(impactPos)+7), 7);
var urgencyPos = email.body_text.indexOf("Urgency:");
var urgency = email.body_text.substr((parseInt(urgencyPos)+8), 7);
if (impact.indexOf("High")!=-1)
{
  current.impact=1;
}
if (impact.indexOf("Medium")!=-1)
{
  current.impact=2;
}
if (impact.indexOf("Low")!=-1)
{
  current.impact=3;
}
if (urgency.indexOf("High")!=-1)
{
  current.urgency=1;
}
if (urgency.indexOf("Medium")!=-1)
{
  current.urgency=2;
}
if (urgency.indexOf("Low")!=-1)
{
  current.urgency=3;
}
//Find KC Point of Contact by name for Salesforce Incident

//kccontact = 'Naomi Gordon';
var grUser = new GlideRecord('sys_user');
  grUser.addQuery('name', kccontact);
  grUser.query();
  if (grUser.next()) {
   //Found contact
   wList = grUser.sys_id;
   current.watch_list = wList;
  }
  
gs.log("Salesforce Contact " + kccontact + " EMAIL." + sys_email.sys_id);

// Do Not use Normal code to find WatchList Contacts so set to false

add_watchList = false;

/*
var sf_created_date_e = email.body_text.indexOf("\n",parseInt(sf_created_date_p));
var sf_created_date = email.body_text.substr(parseInt(sf_created_date_p)+13,parseInt(sf_created_date_e)-parseInt(sf_created_date_p)-13);
var pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
var arrayDate = sf_created_date.match(pattern);
*/
//var dt = new Date(arrayDate[2], arrayDate[1], arrayDate[0],0,0,0);
//current.correlation_id = sf_created_date;
//current.u_sf_created_date = dt;

//current.description = sev + "\n\n" + b + "\n\n" + email.body.environment+ "\n\n" + caseno;
  //Setting an Impact & Urgency based on SEV level

//for salesforce parsing the urgency and impact value from the email directly
/*
switch (parseInt(sev)) {
    case 1:
        current.urgency = 1;
  current.impact = 1;
        break;
    case 2:
        current.urgency = 1;
  current.impact = 2;
        break;
    case 3:
        current.urgency = 2;
  current.impact = 2;
        break;
    case 4:
        current.urgency = 3;
  current.impact = 3;
        break;
    } 
*/
}
else if (email.subject.indexOf("In & Out") !=-1 || email.subject.indexOf("IN & OUT") !=-1)
{
current.u_source="in_n_out";
current.category = "server";
current.subcategory = "AD";
current.urgency = 3;
current.impact = 3;
add_watchList = false;
delete_attachement = true;
}
else if (email.origemail == "splunk@ops.rms.com")
{
current.u_source='Splunk';
current.caller_id = "SplunkUser";
gs.log("The Splunk ticket","EMAIL."+sys_email.sys_id);
if (email.body.severity != undefined)
{
  var sev = email.body.severity;
  gs.log("The serverity is "+sev + "###", "EMAIL." + sys_email.sys_id);
  if (sev == "1")
  {
   current.impact = 1;
   current.urgency = 1;
  }
  else if (sev == "2")
  {
   current.impact = 1;
   current.urgency = 2;
  }
  else if (sev == "3")
  {
   current.impact = 2;
   current.urgency = 2;
  }
  else
  {
   current.impact =3;
   current.urgency = 3;
  }
}
//The splunk ticket default severity will be SEV4
  
if (email.body.category != undefined)
  current.category=email.body.category;
if (email.body.subcategory != undefined)
  current.subcategory=email.body.subcategory;
if (email.body.datacenter != undefined)
  current.u_datacenter=email.body.datacenter;
if (email.body.client != undefined)
  current.u_client=email.body.client;
if (email.body.product != undefined)
  current.u_product=email.body.product;
}
else if (email.origemail == "lrzenoss@rms.com")
{
current.u_source = 'Zenoss';
current.caller_id = 'Zenoss User';
current.category = 'platform';
current.subcategory = 'Support';
current.u_environment.setValue('Liferisks');
gs.log("The serverity is "+email.body.severity, "EMAIL." + sys_email.sys_id);
var sev = email.body.severity;
gs.log("The serverity is "+sev + "###", "EMAIL." + sys_email.sys_id);
if (email.body.severity != undefined)
{
  if (sev == "4")
  {
   current.impact = 2;
   current.urgency = 2;
  }
  else if (sev == "5")
  {
   current.impact = 1;
   current.urgency = 1;
  }
  else
  {
   current.impact =3;
   current.urgency = 3;
  }
}
/*
var severityPos = email.body_text.indexOf("Severity:");
var severity = email.body_text.substr(parseInt(severityPos)+10,1);
if (severity == "4")
{
  current.impact = 2;
  current.urgency = 2;
}*/
}
else if (email.origemail.indexOf("prometheus") !=-1)
{
current.u_source = 'Prometheus';
current.caller_id = 'Prometheus';
if (email.body.category != undefined)
  current.category = email.body.category;
else
{
  current.category = 'platform';
  current.subcategory = 'Support';
}
if (email.body.subcategory != undefined)
  current.subcategory = email.body.subcategory;
//current.subcategory = 'support';
//current.u_environment.setValue('MRe - RMS(one) RM');

//set the default datacenter/client/product information if enviroment is not set
if (email.body.environment == undefined)
{
   current.u_datacenter = "Azure";
   current.u_client = "Not Applicable";
   current.u_product ="RMS(One) Risk Modeler";
}
gs.log("The serverity is "+email.body.severity, "EMAIL." + sys_email.sys_id);
if (email.body.severity != undefined)
{
  var sev = email.body.severity;
  if (sev.toLowerCase() == "critical")
  {
   current.impact = 1;
   current.urgency = 1;
  }
  else if (sev.toLowerCase() == "warning")
  {
   current.impact = 2;
   current.urgency = 2;
  }
  else
  {
   current.impact =3;
   current.urgency = 3;
  }
}
}
else
{
current.category = "request";
current.incident_state = 1;
current.notify = 2;
current.description = email.body_text;
if (email.body.assign != undefined)
    current.assigned_to = email.body.assign;
if (email.importance != undefined) {
    if (email.importance.toLowerCase() == "high")
    current.priority = 1;
}

if (email.body.priority != undefined) 
    current.priority = email.body.priority;
}
 
// Add All Email Recipients to Watch List
// for In & Out, no watch list
if (add_watchList)
{
var rarray = email.recipients_array;
var instanceEmail = gs.getProperty('glide.email.user');

for (var i = 0; i < rarray.length; i++) {
  var recipient = rarray[i];
  //It's not a group address...so check to see if it's a user
  var gr = new GlideRecord('sys_user');
  gr.addQuery('email', recipient);
  gr.query();
  if (gr.next()) {
   // It's a user 
   var user_name = gr.first_name;
   if(user_name.indexOf('ServiceNow')==-1)
   {
    if(wList != "") {
     wList = (wList + "," + gr.sys_id);
    } else {
     wList = gr.sys_id;
    }
   }
  } else {
   //It's not a user either...so just add the address to the list...except instance email address 
   if (recipient != instanceEmail && recipient.indexOf('ServiceNow')==-1) {
    if(wList != "") {
     wList = (wList + "," + recipient);
    } else {
     wList = recipient;
    }     
   }
  }   

}
current.watch_list = wList;
}
/*
if(delete_attachement)
{
var attachment = new Packages.com.glide.ui.SysAttachment();  
var agr = attachment.getAllAttachments("incident", current.sys_id); 
while(agr.next()) {
  attachment.deleteAttachment(agr.getValue("sys_id"));
}
}*/
current.insert();
