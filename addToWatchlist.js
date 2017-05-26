var currentWatchList = current.getValue('watch_list');
    var u_classroom_assignments = new GlideRecord('u_classroom_assignments');
    u_classroom_assignments.addQuery('u_classroom', current.getValue('location')); //probably 'u_classroom'
    u_classroom_assignments.query();
    
    while(u_classroom_assignments.next()) {
    	if (currentWatchList.indexOf(u_classroom_assignments.getValue("u_professor")) {
    		gs.addInfoMessage(u_classroom_assignments.getValue("u_professor") + "is already on the watchlist");
    		continue;
    	}
    		
    	if (!currentWatchList)
    		currentWatchList = u_classroom_assignments.getValue('u_professor');
    	else
    		currentWatchList += ',' + u_classroom_assignments.getValue('u_professor');
    }
    
    current.setValue("watch_list", currentWatchList);
