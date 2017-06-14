<mail_script>
var chRej = new GlideRecord("sysapproval_approver");
chRej.addQuery("sysapproval", current.sys_id);
chRej.query();
while (chRej.next()) {
var comments = chRej.comments.getJournalEntry(1);
template.print("<b>Comments:</b>" + comments + "\n");     // shows full comment entry with header}
template.print("<b>Comments:</b>" + comments.substring(comments.indexOf("\n")+1) + "\n");     // shows comment only with no header
}
</mail_script>
