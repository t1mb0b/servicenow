function onAfter(current, previous) {
   GlideSysAttachment.copy('sc_task', current.sysapproval.sys_id, 'sysapproval_approver', current.sys_id);
}
