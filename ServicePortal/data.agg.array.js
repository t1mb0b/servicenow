(function() {
	/* populate the 'data' object */
	/* e.g., data.table = $sp.getValue('table'); */
	data.items = [];
	data.summary = {
		"incident": {
			"name": "Incident WOHOO",
			"true": 0,
			"false": 0
		},
		"sc_req_item": {
			"name": "ITEMS FTW",
			"true": 0,
			"false": 0
		},
		"change_request": {
			"name": "No one likes change",
			"true": 0,
			"false": 0
		}
	};
	data.summary2 = [
	{
		"agValue": "incident",
		"agName": "Incident",
		"agCount": "0",
		"agState": "active"
	},
	{
		"agValue": "incident",
		"agName": "Incident",
		"agCount": "0",
		"agState": "false"
	},
	{
		"agValue": "sc_req_item",
		"agName": "Requested Item",
		"agCount": "0",
		"agState": "false"
	},
	{
		"agValue": "sc_req_item",
		"agName": "Requested Item",
		"agCount": "0",
		"agState": "true"
	}
	]
	data.taskEncodeQuery = 'opened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORu_requested_forDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORcaller_idDYNAMIC90d1921e5f510100a9ad2572f2b477fe';
	data.fields = 'number,opened_by,u_requested_for,state,short_description';
	data.groupBy = 'sys_class_name';
	
	var gaSum = new GlideAggregate('task');
	gaSum.addEncodedQuery(data.taskEncodeQuery);
	gaSum.addQuery('sys_class_name', 'IN', 'incident,sc_req_item');
	gaSum.addQuery('active', 'IN', 'true,false');
	gaSum.addAggregate('COUNT');
	gaSum.setGroup(true);
	gaSum.groupBy(data.groupBy);
	gaSum.groupBy('active');
	gaSum.query();
	
	while (gaSum.next()) {
		var table = gaSum[data.groupBy].toString();
		var state = gaSum.getDisplayValue('active').toString();
		//data.summary[table][state] = parseInt(gaSum.getAggregate('COUNT'),10);
		for(var x = 0; x< data.summary2.length; x++){
			console.log('looking for table['+table+'] on table data.summary2[x].agValue['+data.summary2[x].agValue+']');
			if(data.summary2[x].agValue === table){
			console.log('  looking for '+table+'.state['+state+'] on table.state['+data.summary2[x].agState+']');
				if(data.summary2[x].agState === state){
					console.log('    setting count to ' + gaSum.getAggregate('COUNT'));
					data.summary2[x].agCount = parseInt(gaSum.getAggregate('COUNT'),10);
				}
			}
		}
	}
})();
