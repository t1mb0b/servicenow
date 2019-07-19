function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading) {
		return;
	}

	g_form.hideFieldMsg('field', true);
	g_form.clearValue('field_2');

	if (g_form.getValue('field') == 'supplement')
		getMessage("Message to display. ",
				   function(msg) {g_form.showFieldMsg('field', msg, 'info', false);});
	else if (g_form.getValue('field') == 'initial')
		getMessage("Other message.",
				   function(msg) {g_form.showFieldMsg('field', msg, 'info', false);});

	if (g_form.getDecimalValue('field') < 0) {
		getMessage("Value must be positive",
				   function(msg) {g_form.showFieldMsg('field', msg, 'error', true);});
		setTimeout(clearValue, 3000);
	}
	
	if (validateCurrency(g_form.getValue('field'))) {
		getMessage("Please enter a valid currency value e.g 1234.56",
				   function(msg) {g_form.showFieldMsg('field', msg, 'error', true);});
		setTimeout(clearValue, 3000);
	}

	function clearValue() {
		g_form.setValue('field', oldValue);
	}
	
	function validateCurrency(currency) {
		var regex  = /^\d+(\.\d{1,2})?$/;
		// If the currency value entered does not match xxxx.xx, return false, displaying the message
		if(regex.test(currency.split(';')[1].split(',').join(''))) {
			return false;
		}
		return true;
	}

}
