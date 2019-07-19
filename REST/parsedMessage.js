var msg = '{"employees":[{"employeeid":"99999","lastname":"DOE","firstname":"JOHN","stores":{"1461":{"storename":"PITTSBURGH PA","storedist":"36"},"1340":{"storename":"COLUMBUS OH","storedist":"77"}},"regionNo":"3","rposition":"HC","empstatus":"AF"}]}';
var parsed = JSON.parse(msg);
for (i = 0; i <= parsed.employees.length - 1; i++) {

    for (j = 0; j <= Object.keys(parsed.employees[i].stores).length - 1; j++) {
        console.log(parsed.employees[i].employeeid + " " + parsed.employees[i].lastname + " " + parsed.employees[i].firstname + " " + Object.keys(parsed.employees[i].stores)[j]);

    }
}


'99999 DOE JOHN 1340'
'99999 DOE JOHN 1461'

var r = new sn_ws.RESTMessageV2('Profile', 'GET');

var response = r.execute();
var msg = response.getBody();


var parsed = JSON.parse(msg);
for (i = 0; i <= parsed.employees.length - 1; i++) {

    for (j = 0; j <= Object.keys(parsed.employees[i].stores).length - 1; j++) {
        gs.log("JCD LOG50: " + parsed.employees[i].employeeid + " " + parsed.employees[i].lastname + " " + parsed.employees[i].firstname + " " + Object.keys(parsed.employees[i].stores)[j]);

        var rec = new GlideRecord('u_import_store_user_data');
        rec.initialize();
        rec.u_employee_id = parsed.employees[i].employeeid;
        rec.u_last_name = parsed.employees[i].lastname;
        rec.u_first_name = parsed.employees[i].firstname;
        rec.u_store = Object.keys(parsed.employees[i].stores)[j].toString();
        rec.insert();
    }
}
