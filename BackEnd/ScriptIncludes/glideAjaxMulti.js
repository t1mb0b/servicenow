/* SI */

	getIncValues: function() {
		var incObj = {};
		var sysId = this.getParameter('sysparm_sys_id');	
		var oInc = new GlideRecord("incident");
		oInc.addQuery('sys_id', sysId);
		oInc.query();
		if(oInc.next()) {
			incObj.description = oInc.description.toString();
			incObj.short_description = oInc.getValue("short_description");
			incObj.caller = oInc.getValue("caller_id");
  		 }
		 var encObj = JSON.stringify(incObj);
		 //gs.log('encObj is: ' + encObj);
		 return encObj;
	},
  
  /* Client Script */
  
 function onLoad() {
	// Get the URL Parameter Values
	var sIncident = getParameterValue('sysparm_sys_id');
	var sUser = getParameterValue('sysparm_user');
	// Instantiate the GlideAjax Call; check if parms exist first
	if (sIncident && sUser) {
		var oGa = new GlideAjax('FAIAjaxUtils');
		oGa.addParam('sysparm_name','getIncValues');
		oGa.addParam('sysparm_sys_id', sIncident);
		oGa.getXML(populateVars);
	}
	// Function to populate the form vars
	function populateVars(res) {
		var answer = JSON.parse(res.responseXML.documentElement.getAttribute("answer"));
		g_form.setValue('requested_for', sUser);
		g_form.setValue('summary_req', answer.short_description);
		g_form.setValue('request_details', answer.description);
	}
}

function getParameterValue(name) {
	var url = document.URL.parseQuery();
	if (url[name]) {
		return decodeURI(url[name]);
	} else {
		return;
	}
}

/* UI Action */

var sItem = '7c0c7a56db823600ad75ffa31d9619f0';
var sSysId = current.getValue('sys_id');
var sUser = current.getValue('caller_id');
// Build the URL and redirect to user to the cat item
var sUrl = 'com.glideapp.servicecatalog_cat_item_view.do?sysparm_id='+sItem+'&sysparm_sys_id='+sSysId+'&sysparm_user='+sUser;
action.setRedirectURL(sUrl);
