// RelativePath: /tTasks/{parentId}


(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	oParentId = request.pathParams.parentId;
	var oResBody = {};
	var oGr = new GlideRecord('u_graham_tasks');
	if(oGr.get(oParentId)) {
		oResBody.parentState = oGr.getDisplayValue('state');
		oResBody.parentNum = oGr.getValue('number');
		oResBody.children = [];
		var oChildGr = new GlideRecord('u_graham_tasks');
		oChildGr.query('parent', oParentId);
		while(oChildGr.next()) {
			oResBody.children.push({
				Number: oChildGr.getValue('number'), 
				State: oChildGr.getDisplayValue('state'),
				Group: oChildGr.getDisplayValue('assignment_group')
			});
		}
	}
	
	return oResBody;
	
})(request, response);
