// Sets timer to expire seven days before

answer = getDuration();

function getDuration () {
	var notificationTS = new GlideDateTime(current.variables.return_by_date).getNumericValue();
	notificationTS -= 2*24*60*60*1000;  // 7 days before return_by_date
	var nowTS = new GlideDateTime().getNumericValue();
	if (notificationTS < nowTS)
	  return 0;
	else
	  return (notificationTS - nowTS)/1000;
}
