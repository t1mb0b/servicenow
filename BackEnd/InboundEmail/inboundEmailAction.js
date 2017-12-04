var alias = email.to; //a comma-separated list of email addresses in the "to" and "cc" fields.
alias = alias.toLowerCase();
if (alias.indexOf("it-helpdesk@yourcompany.com") >= 0) {
    //do a thing
} else if (alias.indexOf("hr-support@yourcompany.com") >= 0) {
    //do a different thing
}
