var r = new sn_ws.RESTMessageV2('Hana', 'get');
var response = r.execute();
var responseBody = response.getBody();
var parsed = JSON.parse(responseBody);
var el = parsed.d.EntitySets.length;
//gs.print(parsed.d.EntitySets[0]);
gs.print(el);


var r = new sn_ws.RESTMessageV2('Hana', 'get');
var response = r.execute();
var responseBody = response.getBody();
var parsed = JSON.parse(responseBody);
var prnr = parsed.d.results.Objid;
gs.print(prnr);
//var el = parsed.d.EntitySets.length;
//gs.print(parsed.d.EntitySets[0]);
//var es = parsed.d.EntitySets;
//gs.print(el);
// for (var i=0; i<el; i++) {
// 	gs.print(es[i]);
// }


=====================

var r = new sn_ws.RESTMessageV2('Hana', 'get');
var response = r.execute();
var responseBody = response.getBody();
var parsed = JSON.parse(responseBody);
var prnr = parsed.d.results[0].Objid;
var res = parsed.d.results;
var el = parsed.d.EntitySets.length;
gs.print(res.length);

for (var i=0; i<res.length; i++) {
 	gs.print(res[i].Objid);
}

var r = new sn_ws.RESTMessageV2('Hana', 'get');
var response = r.execute();
var responseBody = response.getBody();
var parsed = JSON.parse(responseBody);
var obj = parsed.d.results;
var arr = [];
for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        arr.push(key + '=' + obj[key]);
    }
};
var result = arr.join(',');
gs.print(obj);


======
 
 var r = new sn_ws.RESTMessageV2('HRWF', 'get');

r.setAuthentication('basic', 'oData Service Account');

var response = r.execute();
var responseBody = JSON.parse(response.getBody());
var httpStatus = response.getStatusCode();
var oResponse = responseBody.d;
for (var key in oResponse) {
  if (oResponse.hasOwnProperty(key)) {
    gs.print(key + " -> " + oResponse[key]);
  }
}


+++++
  
 Object.keys(oResponse).forEach(function(key) {
gs.print(key + " -> " + oResponse[key]);
});


======
 
 
 try { 
 var r = new sn_ws.RESTMessageV2('Connect@Plant', 'get');

//override authentication profile 
//authentication type ='basic'/ 'oauth2'
//r.setAuthentication(authentication type, profile name);

 var response = r.execute();
 var responseBody = response.getBody();
 var httpStatus = response.getStatusCode();
}
catch(ex) {
 var message = ex.getMessage();
}
var parser = new JSONParser();
	var parsedResponse = parser.parse(responseBody);
	
	for (var i = 0 ; i < parsedResponse.length; i++) {
		var myObject = parsedResponse[i];
		
		var title = parsedResponse[i].title;
		var type = parsedResponse[i].type;
		var description = parsedResponse[i].description;
		var appGroup = parsedResponse[i].appGroup;
		
				
		var gr = new GlideRecord('u_imp_connectatplant');
		gr.initialize();
		gr.u_description = description;
		gr.u_name = title;
		gr.u_type = type;
		gr.u_appgroup = appGroup;
		gr.sys_import_set =  '9c75f6030ff776003867715ce1050ee0';
		gr.insert();
		
		
		}
