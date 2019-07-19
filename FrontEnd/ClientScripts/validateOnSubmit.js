function onSubmit() {
	// Declare vars 
	var roleAttachment = false;
	var permissionsArr = [];
	// Get the permissions object
	var permissionsObj = this.client_data['permissionsObj'];
	// Get the role object
	var roleObj = this.client_data['roleObj'];
	// console.log(JSON.stringify(permissionsObj));
	// Loop through and check for a specific permission
	// This will return a new array of permission names which match
	// TODO: handle array of permission or role names vs. just one
	if (permissionsObj) {
		// console.log("We have permissions");
		permissionsArr = permissionsObj.filter(function(permission){ 
			return permission.name === "LULU ALL PO Buyer"; 
		});
	// If we have a permission selected, check if it has a role requiring attachments
	// TODO: possibly handle with a little more elegance; loop vs relying on first element of object
	} else if (roleObj) {
		// console.log("We have a role");
		if (roleObj[0].description.indexOf("LULU ALL PO Buyer") > -1) {
			roleAttachment = true;
		}
	}
	// Check length of new array
	// console.log(permissionsArr);
	if (permissionsArr && permissionsArr.length > 0 || roleAttachment)	{
		//console.log('A: ' + permissionsArr + " | " + roleAttachment);
		//return false;
		//Works in non-portal ui
		try {
			var attachments = document.getElementById('header_attachment_list_label');
			if (attachments.style.visibility == 'hidden' || attachments.style.display == 'none') {
				// TODO: Implement getMessage for translations
				//getMessage('You must attach document(s).', function(msg) { alert(msg); return false; });
				g_form.addErrorMessage('You must attach the proper signed form.');
				return false;

			}
		}
		//For Service Portal
		catch (e) {
			var attachmentCount = getSCAttachmentCount();
			if (attachmentCount <= 0) {
				// TODO: Implement getMessage for translations
				//getMessage('You must attach the required documents.', function(msg) { alert(msg); return false; });
				g_form.addErrorMessage('You must attach the proper signed form.');
				return false;
			}
		}
	}
	// Catch-all for debugging
	// return false;
}

/**
 * Gets a client data variable, stored using setClientData(). Works on both classic UI (using legacy g_user.getClientData() method) and portal UI (using this.client_data).
 * @param {string} key - The key to the value you'd like to retrieve.
 * @returns {string}
 */
function getClientData(key) {
	if (typeof g_user.getClientData != 'undefined') {
		return g_user.getClientData(key);
	} else {
		try {
			return (typeof this.client_data[key] == 'undefined' ? '' : this.client_data[key]);
		} catch(ex) {
			console.error('Error retrieving client data value ' + key + ': ' + ex.message);
		}
	}
	return '';
}


//

function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue === '') {
		return;
	}
	
	g_form.hideFieldMsg('role_permissions_description', true);

	var ciAjax = new GlideAjax('FAIRolePermissionUtilAjax');
	ciAjax.addParam('sysparm_name', 'getCiData');
	ciAjax.addParam('sysparm_ciSysId', newValue);
	ciAjax.getXMLAnswer(displayInfo);
}

function displayInfo(response) {
	var ciObj;
	if(response) {
		ciObj = JSON.parse(response);
		console.log(ciObj);
		g_form.setValue('role_permissions_description', ciObj[0].description);
		// Store the object so we can check it onSubmit
		setClientData('roleObj', ciObj);
		// Check if the array has any values; if so, set a field message for the permissions which require an attachment
		// TODO: Implement checking against an array of permission names vs. just a single one
		if (ciObj[0].description.indexOf("LULU ALL PO Buyer") > -1) {
			g_form.showFieldMsg('role_permissions_description', 'Please note the role you have selected (' + ciObj[0].name + ') requires a signed document attached', 'info', false);
			/* TODO: Implement message for translations
			getMessage("Please note the role you have selected.",
            function(msg) {g_form.showFieldMsg('role_permissions_description', msg, 'info', false);});
			*/
		}
	}
}

/**
 * Sets a client data variable. Works on both classic UI (using legacy g_user.setClientData() method) and portal UI (using this.client_data). 
 * @param {string} key - The key to store the data in. Use this with getClientData() to retrieve the value stored here. 
 * @param {string} val - The value to store in the specified key.
 */
function setClientData(key, val) {
	if (typeof g_user.setClientData != 'undefined') {
		g_user.setClientData(key, val);
	} else {
		if (typeof this.client_data == 'undefined') {
			this.client_data = {};
		}
		this.client_data[key] = val;
	}
}

//

function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue === '') {
		return;
	}
	
	g_form.hideFieldMsg('role_permissions_description', true);

	var ciAjax = new GlideAjax('FAIRolePermissionUtilAjax');
	ciAjax.addParam('sysparm_name', 'getCiData');
	ciAjax.addParam('sysparm_ciSysId', newValue);
	ciAjax.getXMLAnswer(displayInfo);
}

/**
 * Sets the 'roles/permissions detaqils field with the data from the returned object 
 * @param {object} response - The response object returned from the GlideAjax call
 */
function displayInfo(response) {
	// Declare vars
	var ciObj;
	var permissionDescription = '';
	// Check if we have a response
	if(response) {
		// Parse the returned object
		ciObj = JSON.parse(response);
		// Iterate through and create the output text
		ciObj.forEach(function(ci) {
			permissionDescription += ci.name + ': ' + ci.description + '\n';
		});
		// Set the field value
		g_form.setValue('role_permissions_description', permissionDescription);
		// Store the object so we can check it onSubmit
		setClientData('permissionsObj', ciObj);
		// Check for a permission which requires an attachment
		var permissionsArr = ciObj.filter(function(permission){ 
			return permission.name === "LULU ALL PO Buyer"; 
		});
		// Check if the array has any values; if so, set a field message for the permissions which require an attachment
		// TODO: Implement checking against an array of permission names vs. just a single one
		if (permissionsArr && permissionsArr.length > 0) {
			g_form.showFieldMsg('role_permissions_description', 'Please note the permission you have selected (' + permissionsArr[0].name + ') requires a signed document attached', 'info', false);
			/* TODO: Implement message for translations
			getMessage("Please note the permission you have selected.",
            function(msg) {g_form.showFieldMsg('role_permissions_description', msg, 'info', false);});
			*/
		}
	}
}

/**
 * Sets a client data variable. Works on both classic UI (using legacy g_user.setClientData() method) and portal UI (using this.client_data). 
 * @param {string} key - The key to store the data in. Use this with getClientData() to retrieve the value stored here. 
 * @param {string} val - The value to store in the specified key.
 */
function setClientData(key, val) {
	if (typeof g_user.setClientData != 'undefined') {
		g_user.setClientData(key, val);
	} else {
		if (typeof this.client_data == 'undefined') {
			this.client_data = {};
		}
		this.client_data[key] = val;
	}
}
