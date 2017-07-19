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
