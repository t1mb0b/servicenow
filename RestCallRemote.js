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
