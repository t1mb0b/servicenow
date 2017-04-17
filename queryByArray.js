var arrayOfSysIDs = [‘sysID1’, ‘sysID2’];
var gr = new GlideRecord('incident');
gr.addQuery('sys_id', arrayOfSysIDs)
gr.query();
