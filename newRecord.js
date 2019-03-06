(function () {
    var newInt = new GlideRecord('incident');
    newInt.newRecord();
    gs.info('New record: Priority is {0}, severity is {1}, number is {2} and opened by {3}', newInt.getValue('priority'), newInt.getValue('severity'), newInt.getValue('number'), newInt.getValue('opened_by'));

    var initInt = new GlideRecord('incident');
    initInt.initialize();
    gs.info('Initialized record: Priority is {0}, severity is {1}, number is {2} and opened by {3}', initInt.getValue('priority'), initInt.getValue('severity'), initInt.getValue('number'), initInt.getValue('opened_by'));
})()

//*** Script: New record: Priority is 5, severity is 3, number is INC0010002 and opened by 6816f79cc0a8016401c5a33be04be441
//*** Script: Initialized record: Priority is null, severity is null, number is null and opened by null

/*************/

//Re: default values and `.initialize()` and `.newRecord()` - your record-in-the-database will end up with default values for fields
//that aren't set _either way_. However, when you use `newRecord()` in your script, your script has access to the field's and default
//values _before the record is inserted_.

/*************/

var incident = new GlideRecord('incident');
incident.newRecord();
gs.print(incident.getValue('number'));