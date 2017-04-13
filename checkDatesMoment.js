//Date Variable
function onChange(control, oldValue, newValue, isLoading) {
	if (!isLoading) {
		if(newValue != '') {
			
			if (typeof(moment) === "undefined"){
				//current date
				var currentDateObj = new Date();
				var currentDateStr = formatDate(currentDateObj, g_user_date_format);
				var currentDateNum = getDateFromFormat(currentDateStr, g_user_date_format);
				//get start date
				var startDateStr = g_form.getValue('end_date');
				var startDateNum = getDateFromFormat(startDateStr, g_user_date_format);
				//get end date
				var endDateStr = g_form.getValue('extension_date');
				var endDateNum = getDateFromFormat(endDateStr, g_user_date_format);
			} else {
				// current date
				currentDateNum = moment().valueOf();
				//get start date
				var startDateNum = moment(g_form.getValue('end_date'));
				//get end date
				var endDateNum = moment(g_form.getValue('extension_date'));
			}
			
			var diff = endDateNum - startDateNum;
			var maxDiff;
			// Check is request type is Guest or Labour to set maxDiff
			if (g_form.getValue('request_type') === "Guest"){
				maxDiff = 185*24*60*60*1000; //182 days in ms
			} else {
				maxDiff = 365*24*60*60*1000; //365 days in ms
			}
			if (endDateNum <= 0){
				alert('Please use the calendar icon to select an extension date.');
				g_form.setValue('extension_date', '');
			} else if (endDateNum < currentDateNum) {
				alert('You cannot select an extension date in the past.');
				g_form.setValue('extension_date', '');
			} else if (endDateNum < startDateNum) {
				alert('You cannot select an extension date prior to the original end date.');
				g_form.setValue('extension_date', '');
			} else if (diff > maxDiff) {
				if (g_form.getValue('request_type') === "Guest") {
					alert('Extension dates for guest accounts cannot exceed 185 days or 6 months after the original end date.');
				} else {
					alert('Extension dates for labour accounts cannot exceed 365 days or 1 year after the original end date.');
				}
				g_form.setValue('extension_date', '');
			}
		}
	}
}
