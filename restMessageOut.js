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


=====
  
 Object.keys(oResponse).forEach(function(key) {
gs.print(key + " -> " + oResponse[key]);
});

