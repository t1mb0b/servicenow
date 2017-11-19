function onAfter(current, previous) {
   GlideSysAttachment.copy('sc_task', current.sysapproval.sys_id, 'sysapproval_approver', current.sys_id);
}

var attachment = new GlideSysAttachment();
attachment.deleteAttachment(gr.sys_id);

var gr = new GlideRecord('sys_attachment');
gr.addQuery('u_record', '4cf6c9e4dbaec3009d2d572e5e9619e0');
gr.query();
gr
  while(gr.next()) {
    gr.addInfoMessage(gr.file_name);
  }

  function _checkAttachments() {
		var attach = new GlideRecord('sysapproval_approver');
		attach.get(current.sys_id);
		if(attach.hasAttachments()) {
			gs.info("TM======>Has attachments");
			return true;
		}
		gs.info("TM======>No attachments");
		return false;
	}