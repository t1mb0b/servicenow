(function executeRule(current, previous /*null when async*/) {
	var originalApprover = !current.getValue('u_approved_by') || current.getValue('u_approved_by') === current.getValue('approver');
	if (current.state.changes() && current.state == 'requested') {
		updateTask(current, 'This request has been submitted to the following person for approval / Cette demande a été soumise à la personne suivante à des fins d\'approbation: ' + current.getDisplayValue('approver'));
	} else if (current.state.changes() && current.state == 'rejected') {
		updateTask(current, 'This request has been rejected by the following person / Cette demande a été refusée par la personne suivante: ' + (originalApprover ? current.approver.getDisplayValue() : current.getDisplayValue('u_approved_by') + ' on behalf of / au nom de ' + current.getDisplayValue('approver')), current.comments.getJournalEntry(-1));
	} else if (current.state.changes() && current.state == 'approved') {
		updateTask(current, 'This request has been approved by the following person / Cette demande a été approuvée par la personne suivante: ' + (originalApprover ? current.approver.getDisplayValue() : current.getDisplayValue('u_approved_by') + ' on behalf of / au nom de ' + current.getDisplayValue('approver')), current.comments.getJournalEntry(-1));
	}

	function updateTask(me, journal, comments) {
		gs.log('FAI: updating comments for ' + current.getDisplayValue('sysapproval') + ' | ' + me.getDisplayValue(), 'Q: Approval Comments BR');
		// If this is for a group approval, don't log this user action since the Group Approval Comments business rule will handle the comments
		if (!current.group.nil())
			return;

		if (comments)
			journal += "\n\n" + gs.getMessage("Comments") + ":\n" + comments;

		var taskGr = new GlideRecord('task');
		if (taskGr.get(me.sysapproval)) {
			taskGr.comments.setJournalEntry(journal);
			taskGr.update();
		}
	}
})(current, previous);
