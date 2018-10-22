function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }

    //g_form.addInfoMessage(newValue + ' Date from Date/Time Picker');
    var dt1WkDate = new Date();
    //g_form.addInfoMessage(dt1WkDate + ' Current System Date');
    var checkDate = new Date(dt1WkDate.setDate(dt1WkDate.getDate() + 7));
    //g_form.addInfoMessage(checkDate + ' Current System Date + 7 days');

    var chosenDate = new Date(newValue.toString());
    //g_form.addInfoMessage(chosenDate + ' Date from Date/Time Picker Converted');
    if(chosenDate < checkDate){
        alert('Date must be 7 days after current date.');
        g_form.setValue('change_date', '');
    } else if (new Date(newValue).toString() == 'Invalid Date' || newValue.toString().length < 10) {
        alert('Please select or insert a valid date.');
        g_form.setValue('change_date', '');
    }

}
