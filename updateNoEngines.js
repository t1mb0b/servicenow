updateMyInc();
function updateMyInc(){
var rec = new GlideRecord('incident');
rec.addQuery('u_business_line', 'Amazon'); 
rec.query();

while (rec.next()) {
	rec.setValue('u_ref_business_line','67f733eadb2bf6001810fb37bf961930'); 
	rec.setWorflow(false);
	rec.autoSysFields(false);
	rec.setRunEngines(false);
	rec.update();
}
}


=====
	
updateMyInc();
function updateMyInc(){
var ihatethis = new GlideRecord('incident');
ihatethis.addQuery('u_business_line', 'Amazon');
ihatethis.query();
ihatethis.setWorkflow(false);
ihatethis.setUseEngines(false);

while (ihatethis.next()) {
	ihatethis.setValue('u_ref_business_line','b938f3eadb2bf6001810fb37bf9619c6'); 
	ihatethis.update();
	gs.info(ihatethis.getLastErrorMessage());
}
}
