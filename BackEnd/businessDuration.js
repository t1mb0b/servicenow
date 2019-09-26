var numberOfDays = 2;
var intNumberOfDays = parseInt(numberOfDays);
var schedRecord = new GlideRecord('cmn_schedule');
schedRecord.get('name', 'Schedule Name');
var schedule = new GlideSchedule(schedRecord.sys_id);

var actualDateTime = new GlideDateTime();
actualDateTime.setDisplayValue(gs.nowDateTime());

var getUsers = new GlideRecord('sys_user');
getUsers.addEncodedQuery('offboarddate!=NULL'); //Change query as needed.
getUsers.query();
while (getUsers.next()) {
    var dateString = getUsers.offboarddate + " " + "00:00:01";
    var gdt = new GlideDateTime(dateString);
    var differenceDays = parseInt((((schedule.duration(gdt, actualDateTime)).getNumericValue()) / 1000) / (3600 * 12));
    gs.log('differencedays = ' + differenceDays);
    if (differenceDays > intNumberOfDays) {
        gs.log('IN');
    }
    else {
        gs.log('OUT');
    }
}
