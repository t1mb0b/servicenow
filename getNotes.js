/*jslint sloppy: true, vars: true*/
/*global GlideRecord, current, paddAndLinkRefs*/
function onAfter(current, previous) {
    //This function will be automatically called when this rule is processed.
    //if dict.type is journal... rewrite teh notes
    var dict = new GlideRecord('sys_dictionary');
    dict.addEncodedQuery('internal_type=journal^ORinternal_type=journal_input^name=' + current.name + '^element=' + current.element);
    dict.query();
    while (dict.next()) {
        var newValue = paddAndLinkRefs(current.value);
        current.value = newValue; //update audit record
        current.setWorkflow(false);
        current.autoSysFields(false);
        current.update();
        var audit = new GlideRecord('sys_audit');
        audit.addEncodedQuery('documentkey=' + current.element_id + '^fieldname=' + current.element + '^ORDERBYDESCrecord_checkpoint');
        audit.query();
        if (audit.next()) {
            audit.newvalue = newValue;
            audit.setWorkflow(false);
            audit.autoSysFields(false);
            audit.update();
        }
    }
}

function paddAndLinkRefs(text) {
    var num = new GlideRecord('sys_number');
    num.addEncodedQuery('category!=sc_ic_task_defn_staging^category!=task^category!=ts_index_name');
    num.query();
    var tables = [];
    while (num.next()) {
        tables.push({
            'name': num.category.toString(),
            'prefix': num.prefix.toString(),
            'digits': num.maximum_digits.toString()
        });
    }
    var x;
    for (x = 0; x < tables.length; x = x + 1) {
        var table = tables[x].name;
        var prefix = tables[x].prefix;
        var digits = parseInt(tables[x].digits, 10);
        var re = new RegExp("(\\s|^)(" + prefix + ")(\\d+)", "gi"); //find

        text = text.replace(re, function (m) {
            var result = "";
            var copy = m.toUpperCase();
            var number = copy.split(prefix)[1];
            var space = copy.split(prefix)[0];
            while (number.length < digits) {
                number = "0" + number;
            }
            var recordnumber = prefix + number;
            var test = new GlideRecord(table);
            var numberField = 'number'; //define number field by default to 'number'
            if (test.isValidField('u_number')) { //test if 'u_number' is valid
                numberField = 'u_number'; //if it is, assume its the number field to use
            }
            if (test.get(numberField, recordnumber)) {
                result += space;
                result += "[code]";
                result += "<a target='_blank' style='text-decoration: underline; color: rgb(0, 0, 255);' ";
                result += "href='/" + table + ".do?sysparm_query=" + numberField + "=" + recordnumber + "'>" + recordnumber + "</a>[/code]";
            } else {
                result = m;
            }
            return result;
        });
    }
    return text;
}