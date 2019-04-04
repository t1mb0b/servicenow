function setGroupFilter() {
	var assignmentGroup = $j("#functional_area option:selected").attr("data-assignment-group");
	//var assignmentGroup = $('lookup.assignment_group');
	// Clear the assignment group field
	$('assignment_group').value = '';
	$('sys_display.assignment_group').value = '';
	// Set the filter
	assignmentGroup.setAttribute('onclick', "mousePositionSave(event); reflistOpen( 'assignment_group', 'not', 'sys_user_group','', 'false','QUERY:active=true^u_assignment_group=true', 'typeLIKE" + filter + "','')");
	//console.log("======> Tim Here " + filter);
}
