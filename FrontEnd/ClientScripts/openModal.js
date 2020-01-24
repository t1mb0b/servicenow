function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading || newValue === '') {
		return;
	}

	var finAjax;

	if (newValue == 'yes' && g_form.getValue('field_name') == 'yes') {
		// Check for Service Portal or Platform
		if (window) {
			var oYearModal = new GlideModal("ui_page");
			oYearModal.setTitle("Page Title");
			oYearModal.setBackdropStatic(true);
			oYearModal.render();
		} else {
			finAjax = new GlideAjax('TimAjax');
			finAjax.addParam('sysparm_name', 'getProperty');
			finAjax.addParam('sysparm_property', 'property_name');
			finAjax.getXMLAnswer(getLink);
		}
	}
}

function getLink(response) {
	spModal.open({
		title: 'Lease Document',
		message: getMessage('Please note some stuff'),
		buttons: [
			{label:'✔ ' + getMessage('Close'), cancel: true}
		]
	});
}

function getLink2(response) {
	spModal.open({
		title: 'Lease Document',
		message: getMessage('Message') + '<br /> <br /><a href="' + response + '" target="_blank"><img src="image.jpg" width="75" height="75"/></a>' + '<br /><br />' + getMessage('Message 2'),
		buttons: [
			{label:'✔ ' + getMessage('Close'), cancel: true}
		]
	});
}
