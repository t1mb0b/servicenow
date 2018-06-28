(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
    data.items = [];
    data.summary = {
        "incident": {
            "true": 0,
            "false": 0
        },
        "sc_req_item": {
            "true": 0,
            "false": 0
        },
        "change_request": {
            "true": 0,
            "false": 0
        }
    };
    data.summary2 = [];
    data.taskEncodeQuery = 'opened_byDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORu_requested_forDYNAMIC90d1921e5f510100a9ad2572f2b477fe^ORcaller_idDYNAMIC90d1921e5f510100a9ad2572f2b477fe';
    data.fields = 'number,opened_by,u_requested_for,state,short_description';
    data.groupBy = 'sys_class_name';
    
    var gaSum = new GlideAggregate('task');
    gaSum.addEncodedQuery(data.taskEncodeQuery);
    gaSum.addQuery('sys_class_name', 'IN', 'incident,sc_req_item,change_request');
    gaSum.addQuery('active', 'IN', 'true,false');
    gaSum.addAggregate('COUNT');
    gaSum.setGroup(true);
    gaSum.groupBy(data.groupBy);
    gaSum.groupBy('active');
    gaSum.query();
    
    while (gaSum.next()) {
        var table = gaSum[data.groupBy].toString();
        var state = gaSum.getDisplayValue('active').toString();
            data.summary[table][state] = parseInt(gaSum.getAggregate('COUNT'),10);
            data.summary2.push({
                agName: gaSum[data.groupBy].getDisplayValue() || 'None',
                agValue: gaSum[data.groupBy].toString(),
                agState: gaSum.getDisplayValue('active').toString(),
                agCount: gaSum.getAggregate('COUNT') || '0'
            });
        }
    })();
