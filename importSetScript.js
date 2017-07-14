var importSet = importData();
processData(importSet);

function importData() {

	var rec_id = current.sys_id;
	var file_type = 'Excel';

	//insert data source
	var ds = new GlideRecord('sys_data_source');
	ds.initialize();
	ds.name = 'Universal_Relief_Request_uploader';
	ds.import_set_table_label = 'Universal Relief Request Import';
	ds.import_set_table_name = 'u_universal_relief_request_import';
	ds.header_row = 2;
	ds.type = 'File';
	ds.format = file_type;
	ds.file_retrieval_method = 'Attachment';
	ds.insert();

	//in this example I'm moving the attachment to the data source record, but you can copy it so it stays on the original record which is probably better!
	var table_name = ds.getTableName();
	var table_sys_id = ds.sys_id;
	var att = new GlideRecord('sys_attachment');
	att.addQuery('table_sys_id', rec_id+'');
	att.addQuery('table_name', 'sc_req_item');
	att.addEncodedQuery('file_nameENDSWITH.xlsx^ORfile_nameENDSWITH.xls');
	att.orderByDesc('sys_created_on');
	att.query();
	if (att.next()) {
		att.table_name = table_name;
		att.table_sys_id = table_sys_id;
		att.update();
	} else {
		return 'ERROR';	
	}

	//create the import set
	var iset = new GlideRecord('sys_import_set');
	iset.initialize();
	iset.short_description = ds.name;
	iset.mode = 'asynchronous';
	iset.state = 'loaded';
	iset.data_source = ds.sys_id;
	iset.table_name = ds.import_set_table_name;
	var importSetID = iset.insert();

	//load the data into the import set
	var isl = new GlideImportSetLoader();
	isl.loadImportSetTable(iset, ds);

	return importSetID+'';

}
function processData(importSetID) {
	var import_id = importSetID;
	//start the transform
	var transformWorker = new GlideImportSetTransformerWorker(import_id+'', '82577941139a36009317b1e32244b04c'); //transform map
	transformWorker.setBackground(false);
	transformWorker.start();
	return true;
}
