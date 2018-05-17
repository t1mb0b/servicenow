(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
	var oArticles = [];
	//get articles in each news category
	var oKnowledge = new GlideRecord("kb_knowledge");
	oKnowledge.addQuery("topic", "News");
	oKnowledge.addQuery("workflow_state", "published");
	oKnowledge.query();
	while(oKnowledge.next()) {
		oArticles.push({
			sDesc: oKnowledge.getValue("short_description"),
			sId: oKnowledge.getValue("sys_id")
		});
	}
		return oArticles;
})(request, response);
