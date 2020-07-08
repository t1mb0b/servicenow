function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue === '') {
		return;
	}

	g_form.hideFieldMsg('delegation_effective_date', true);

	var glideAjax = new GlideAjax('CatalogUtilAjax');
	glideAjax.addParam('sysparm_name', 'isDateInPast');
	glideAjax.addParam('sysparm_date', newValue);
	glideAjax.getXMLAnswer(function(answer) {
		if(answer === 'true') {
			getMessage("Effective date cannot be in the past", function(msg) {
				g_form.showFieldMsg('delegation_effective_date', msg, 'error', true);
			});
			setTimeout(function() {
				g_form.setValue('delegation_effective_date', '');
			}, 3000);
		}
	});
}
