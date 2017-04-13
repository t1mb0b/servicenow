function checkDates()  
{  
    g_form.hideFieldMsg('start_date');  
    g_form.hideFieldMsg('end_date');  
  
  
    var dtStartForm = g_form.getValue('start_date');  
    var dtStart = getDateFromFormat(dtStartForm,g_user_date_time_format);  
    var dtEndForm = g_form.getValue('end_date');  
    var dtEnd = getDateFromFormat(dtEndForm,g_user_date_time_format);  
    var currentDateObj = new Date();   
    var currentDateStr = formatDate(currentDateObj, g_user_date_time_format);   
    var currentDateNum = getDateFromFormat(currentDateStr, g_user_date_time_format);   
     
    if (dtStart < currentDateNum)  
        g_form.showFieldMsg('start_date','Planned start date cannot be before the current date and time','error');  
     
    if (dtEndForm !== '' && dtEnd < dtStart)  
        g_form.showFieldMsg('start_date', 'Planned start date cannot be after end date', 'error');  
  
    if (dtEnd < dtStart)  
        g_form.showFieldMsg('end_date', 'Planned end date cannot be before start date', 'error');  
  
}  
