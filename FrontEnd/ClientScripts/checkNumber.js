function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading || newValue === '') {
		return;
	}

	g_form.hideFieldMsg('u_jde_asset_no', true);
	// 6 digit integer required
	if (!newValue.match(/^\d{6}$/)) {
		g_form.showFieldMsg('u_jde_asset_no', '6-digit value required', 'error', true);
		setTimeout(clearValue, 3000);
	}

	function clearValue() {
		g_form.setValue('u_jde_asset_no', '');
	}
}


//=====

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
	if (isLoading || newValue === '') {
		return;
	}
	if(newValue.length > 6) {
		g_form.showFieldMsg('u_tag_number', 'Tag # cannot be longer than six characters', 'error');
		setTimeout(resetValue, 3000);
	} else {
		g_form.hideFieldMsg('u_tag_number');
	}

	function resetValue() {
		var number = g_form.getValue('u_tag_number');
		g_form.setValue('u_tag_number', number.slice(0,6));
	}
}
