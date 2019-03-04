var incidentSysID = 'PUT INCIDENT SYSID IN HERE';

var incidentRec = new GlideRecord('incident');
incidentRec.addQuery('sys_id', incidentSysID);
incidentRec.query();
while (incidentRec.next()) {
  incidentRec.state = 2; // 2 = In Progress, 6 = Resolved
  incidentRec.active = true;
  incidentRec.autoSysFields(false); // Do not update sys_updated_on, sys_updated_by, and sys_mod_count
  incidentRec.setWorkflow(false); // Do not run any other business rules
  incidentRec.update();
}
