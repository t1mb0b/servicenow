	var currentWatchList = current.getValue('watch_list');
	if (!currentWatchList)
		currentWatchList = '';

	gs.info("The watchlist is {0}", currentWatchList);
	
    var u_classroom_assignments = new GlideRecord('u_classroom_assignments');
    u_classroom_assignments.addQuery('u_classroom', current.getValue('location')); //probably 'u_classroom'
    u_classroom_assignments.query();
    
    gs.info("Found {0} classroom assignments", u_classroom_assignments.getRowCount());
    
    while(u_classroom_assignments.next()) {
    	var professor = u_classroom_assignments.getValue('u_professor');
    	gs.info("The professor is {0}", professor);
    	
    	if (currentWatchList.indexOf(professor) > -1) {
    		gs.info("{0} is already on the watchlist", professor);
    		gs.addInfoMessage(professor + " is already on the watchlist");
    		continue;
    	}
    		
    	if (!currentWatchList) {
    		gs.info("Adding {0} as the first watchlist entry", professor);
    		currentWatchList = professor;
    	} else {
    		gs.info("Adding {0} to the watchlist", professor);
    		currentWatchList += ',' + professor;
    }
    gs.info("Saving the current watchlist as {0}", currentWatchList);
    current.setValue("watch_list", currentWatchList);
