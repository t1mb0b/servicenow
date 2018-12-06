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
	    
	    
==================================
	
// Incident sys_id to test with  
var inc = '965c9e5347c12200e0ef563dbb9a7156';  
// Instantiate Members array  
var aMembers = [];  
// Specify Groups  
var aGroups = ['Service Desk','Hardware'];  
// Iterate through groups and get the members; push sys_ids to aMembers array  
aGroups.forEach(function(group){  
var gr = new GlideRecord('sys_user_grmember');  
gr.addQuery('group.name', group);  
gr.addQuery('user.active', true);  
gr.query();  
while(gr.next()) {  
aMembers.push(gr.getValue('user'));  
}  
});  
// Query the Inc table to get the Incident  
var incGr = new GlideRecord("incident");  
if(incGr.get('sys_id', inc)) {  
// Filter our duplicates  
var watchList = aMembers.filter(function(member){  
return aMembers.indexOf(member);  
});  
incGr.watch_list = watchList.join();  
// Update the record  
incGr.update();  
}  

====
	
var userID, currentWatchList;
var newWatchList = [];
var groupID = producer.getValue('group_reference');
var grGroupMember = new GlideRecord('sys_user_grmember');

grGroupMember.addQuery('user.active','true');
grGroupMember.addQuery('group', groupID);

while(grGroupMember.next()){
    userID = grGroupMember.getValue('user');

    if (newWatchList.indexOf(userID) < 0) {
        newWatchList.push(userID);
    }
}
currentWatchList = current.getValue('watch_list');
newWatchList =  currentWatchList + newWatchList.join(','); //stringifies

current.setValue('watch_list', newWatchList);
