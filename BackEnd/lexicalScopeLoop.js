var answer = [];
var appsArr = String(current.variables.pdi_focal_roles).split(',');
var pdiGr = new GlideRecord('u_pdi_access_roles');
pdiGr.addQuery('sys_id', 'IN', appsArr);
pdiGr.query();
while (pdiGr.next()) {
  answer.push(pdiGr.getValue('u_module_approver'));
  if (pdiGr.getValue('u_additional_approvers')) {
    !function pushApprovers() {
      pdiGr.getValue('u_additional_approvers').split(',').forEach(function (approver) {
        answer.push(approver);
      });
    }();
  }
}
