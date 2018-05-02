//This is such a wonderful question, and the frustration of how weird the API is in this particular case only heightened my delight at figuring it out.
//
//*The answer*:
//
//First: As you likely know, arrays in JavaScript are necessarily ordered, so element `0` will always be in the first position no matter what you do with it. 
//With that in mind, the API structure for list collectors is like this:

g_form.setValue(
    fieldName, //String
    fieldValues, //Comma-delimited string
    fieldDisplayValues //ARRAY!
);

//So you would be passing in two lists: one for the values, and one for the display values - but passing them in, in two different types!
//
//For example: Consider the following code:

var grIncident = new GlideRecord('incident');
grIncident.addQuery('some_field', 'some_val');
grIncident.query(function(grIncident) {
    var incidentIDs = [];
    var incidentNumbers = [];
    while (grIncident.next()) {
        incidentIDs.push(grIncident.getValue('sys_id'));
        incidentNumbers.push(grIncident.getValue('number'));
    }
    if ((incidentIDs.length > 0) && (incidentNumbers.length === incidentIDs.length)) {
        g_form.setValue('list_collector_field_name', incidentIDs.join(','), incidentNumbers);
    }
});

//Here, consider the 11th line: `g_form.setValue('list_collector_field_name', incidentIDs.join(','), incidentNumbers);`
//In this line, we're passing in three arguments: the field name, the value*s* we want, and their corresponding display values. 
//However, even though *both* `incidentIDs` and `incidentNumbers` are *array* variables, we only `.join(',')` *one* of them to a string (the *values* array). Otherwise, the API call will fail
