function getListCollectorValues(variable, refTable, returnField) {
	if (variable == '' || refTable == '' || returnField == '')
		return '';
	var listCollector = j2js(variable).split(',');
	var selectedOptions = [];
	for (var i = 0; i < listCollector.length; i++) {
		var gr = new GlideRecord(refTable);
		if (gr.get(listCollector[i]))
			selectedOptions.push(gr.getValue(returnField));
	}
	return selectedOptions.toString();
}