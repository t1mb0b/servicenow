var MyDateTimeAjax = Class.create();

MyDateTimeAjax.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	isInFuture: function () {

		var date_string = this.getParameter('sysparm_due_date');
		if (!date_string)
			return false;
			
		var due_date = new GlideDate();
		due_date.setDisplayValue(date_string);
		var current_date = new GlideDate(); //defaults to right now
		
		return due_date.before(current_date);
		
	},

	type: 'MyDateTimeAjax'

});


// Client Script

function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}
	
	var ga = new GlideAjax('MyDateTimeAjax');
	ga.addParam('sysparm_name','isInFuture');
	ga.addParam('sysparm_due_date', newValue); //assuming this runs onchange of the u_duedate field
	ga.getXMLAnswer(checkAllowed);

	function checkAllowed(answer){
		if (answer !== 'true) {
			g_form.addErrorMessage('You cannot select a date in the past.');
			g_form.clearValue('u_duedate');
		}
	}
}
