(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	
	var sInstance = gs.getProperty('glide.servlet.uri');
	var oResBody = [];
	//
	var sQuery = _getParamAsString("query");
	var kGr = new GlideRecordSecure('kb_knowledge');
	kGr.addQuery('kb_knowledge_base.title', 'Tim Knowledge');
	kGr.addQuery("workflow_state", "published");
	if (sQuery != '') {
		kGr.addQuery("123TEXTQUERY321", sQuery);
	}
	kGr.query();
	while(kGr.next()) {
		oResBody.push({
			id : kGr.getValue("sys_id"),
			number : kGr.getValue("number"),
			short_description : kGr.getValue("short_description"),
			text: kGr.getValue('text'),
			url : sInstance + "tim/?id=kb_article2&number=" + kGr.getValue("number")
		});
	}
	// Let's disable caching
	response.setHeader("Cache-Control", "no-cache,no-store,must-revalidate,max-age=-1");
	response.setHeader("Pragma", "no-store,no-cache");
	response.setHeader("Expires","Thu, 01 Jan 1970 00:00:00");
	// Return Result
	return oResBody;
	/* ~~ */
	// make sure we always get strings from the parameter map
	function _getParamAsString(paramName) {
		if (request.queryParams.hasOwnProperty(paramName))
			return request.queryParams[paramName] + '';
		
		return '';
	}
	
})(request, response);
