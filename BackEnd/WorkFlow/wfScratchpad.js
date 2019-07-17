// Set scratchpad variables
// Set full Requested for name & approver
workflow.scratchpad.requested_for_name = '';
if (current.variables.new_user+'' == 'true') {
	workflow.scratchpad.requested_for_name =
	(current.variables.new_user_first_name ? current.variables.new_user_first_name + ' ' : '') +
	(current.variables.new_user_middle_initial ? current.variables.new_user_middle_initial + ' ' : '') +
	(current.variables.new_user_last_name ? current.variables.new_user_last_name : '');
	workflow.scratchpad.approver = current.variables.new_user_manager;
} else {
	workflow.scratchpad.requested_for_name =
	(current.variables.requested_for ? current.variables.requested_for.name + ' (' + current.variables.requested_for.user_name + ')' : '');
	workflow.scratchpad.approver = current.variables.requested_for.manager;
}

// Set user details
workflow.scratchpad.user_details = '';
if (current.variables.new_user+'' == 'true')
	workflow.scratchpad.user_details =
'NEW USER DETAILS / INFORMATIONS DU NOUVEL UTILISATEUR:' + '\n' +
'First name / Prénom: ' + current.variables.new_user_first_name + '\n' +
'Middle initial / Initiale du deuxième prénom: ' + current.variables.new_user_middle_initial + '\n' +
'Last name / Nom de famille: ' + current.variables.new_user_last_name + '\n' +
'Title / Titre: ' + current.variables.new_user_title + '\n' +
'Phone number / Numéro de téléphone: ' + current.variables.new_user_phone_number + '\n' +
'New user type / Nouveau type d`utilisateur: ' + current.variables.new_user_type.getDisplayValue() + '\n' +
'Supervisor / Superviseur: ' + current.variables.new_user_manager.name + '\n' +
'Department/BU / Service/UC: ' + current.variables.new_user_department.name + '\n' +
'Company / Société: ' + current.variables.new_user_company.name + '\n' +
'Location / Emplacement: ' + current.variables.new_user_location.name + '\n';
else
	workflow.scratchpad.user_details =
'USER DETAILS:' + '\n' +
'Requested for: ' + workflow.scratchpad.requested_for_name + '\n' +
(current.variables.requested_for_email ? 'Email / Adresse électronique: ' + current.variables.requested_for_email + '\n' : '') +
(current.variables.requested_for_phone ? 'Business phone / Téléphone professionnel: ' + current.variables.requested_for_phone + '\n' : '') +
(current.variables.requested_for_mobile_phone ? 'Mobile phone / Téléphone mobile: ' + current.variables.requested_for_mobile_phone + '\n' : '') +
'Supervisor: ' + current.variables.requested_for_manager.name + '\n' +
(current.variables.requested_for_department ? 'Department/BU / Service/UC: ' + current.variables.requested_for_department.name + '\n' : '') +
(current.variables.requested_for_company ? 'Company / Société: ' + current.variables.requested_for_company.name + '\n' : '') +
(current.variables.requested_for_location ? 'Location / Emplacement: ' + current.variables.requested_for_location.name + '\n' : '');

// Set Comm Device details
if(current.variables.mod_desk_phone == 'true' || current.variables.pref_style != '0') {
	workflow.scratchpad.desk_phone_details =
	'DESK PHONE DETAILS / RENSEIGNEMENTS DU TÉLÉPHONE DE BUREAU:' + '\n';
	if (current.variables.mod_desk_phone == 'true') {
		workflow.scratchpad.desk_phone_details +=
		'Current Extension / RENSEIGNEMENTS DU TÉLÉPHONE DE BUREAU: ' + current.variables.cur_ext + '\n' +
		'Voicemail to Email / Messagerie vocale à courriel: ' + current.variables.voicemail_email.getDisplayValue() + '\n' +
		'New Extension: ' + (current.variables.req_ext == 'true' ? 'Yes' : 'No') + '\n';
	}
	if (current.variables.pref_style != '0') {
		workflow.scratchpad.desk_phone_details +=
		'Preferred Phone Style / Style de téléphone préféré: ' + current.variables.pref_style.getDisplayValue() + '\n' +
		'Headset Required / Style de téléphone préféré: ' + (current.variables.head_req == 'true' ? 'Yes' : 'No') + '\n';
	}
	if (current.variables.additional_comments) {
		workflow.scratchpad.desk_phone_details +=
		'Additional Comments / Commentaires supplémentaires: ' + current.variables.additional_comments + '\n';
	}
}
if (current.variables.mobility_option == 'mobile_supplied') {
	workflow.scratchpad.mobile_device_details =
	'MOBILE DEVICE DETAILS / RENSEIGNEMENTS DE L`APPAREIL MOBILE:' + '\n' +
	'Mobile Device Requested / Appareil mobile demandé: ' + current.variables.mobile_device_option.getDisplayValue() + '\n' +
	(current.variables.car_charger == 'true' ? 'Car Charger / Chargeur de voitures: Yes' + '\n' : '') +
	(current.variables.phone_case == 'true' ? 'Phone Case / Étui à téléphone cellulaire: Yes' + '\n' : '') + 
	(current.variables.bluetooth_for_androids == 'true' ? 'Bluetooth for Androids / Bluetooth pour Android: Yes' + '\n' : '');
	if (current.variables.replacement_upgrade == 'true') {
		workflow.scratchpad.mobile_device_details +=
		'Upgrade / Mettre à niveau: Yes' + '\n' +
		'Mobile Phone Number / Numéro de téléphone mobile: ' + current.variables.mobile_phone + '\n';
	}
	if (current.variables.port_in_number == 'true') {
		workflow.scratchpad.mobile_device_details +=
		'Port in Personal Number / Numéro personnel du port d`entrée: ' + current.variables.mobile_number + '\n' +
		'Current Service Provider / Fournisseur de services actuel: ' + current.variables.service_provider + '\n';
	}
	if (current.variables.additional_comments) {
		workflow.scratchpad.mobile_device_details +=
		'Additional Comments / Commentaires supplémentaires ' + current.variables.additional_comments + '\n';
	}
}
if (current.variables.mobility_option == 'bring_own_device') {
	workflow.scratchpad.byod_details =
	'BYOD Options: ' + '\n' +
	(current.variables.accept_policy == 'true' ? 'Policy Accepted / Politique acceptée' + '\n' : '') +
	(current.variables.accept_reset == 'true' ? 'Reset Accepted / Réinitialisation acceptée' + '\n' : '');
	if(current.variables.port_out_number == 'true') {
		workflow.scratchpad.byod_details +=
		'Port Parkland Number to device / Numéro Parkland du port vers l`appareil : ' + current.variables.mobile_phone + '\n';
	}
	if (current.variables.additional_comments) {
		workflow.scratchpad.byod_details +=
		'Additional Comments / Commentaires supplémentaires: ' + current.variables.additional_comments + '\n';
	}
}
if (current.variables.mobility_option == 'mobile_activation') {
	workflow.scratchpad.activate_deactivate_details =
	'Activate/Disconnect Options / Activer/Déconnecter les options: ' + '\n' +
	'Activate or Disconnect / Activer ou déconnecter: ' + current.variables.activate_deactivate.getDisplayValue() + '\n' +
	'Current Mobile Number / Numéro actuel d\'appareil mobile: ' + current.variables.mobile_phone + '\n';
	if(current.variables.activate_deactivate == 'disconnect') {
		workflow.scratchpad.activate_deactivate_details +=
		'Will Phone be returned to Deskside? / Le téléphone sera-t-il renvoyé à l\'équipe de soutien technique? ' + current.variables.return_phone.getDisplayValue() + '\n';
	}
	workflow.scratchpad.activate_deactivate_details +=
	'Responsible Person / Personne responsable: ' + current.variables.responsible_person.getDisplayValue() + '\n';
	if (current.variables.additional_comments) {
		workflow.scratchpad.activate_deactivate_details +=
		'Additional Comments / Commentaires supplémentaires: ' + current.variables.additional_comments + '\n';
	}
}
// Update Description on Request Item
current.description =
workflow.scratchpad.user_details + '\n' +
(workflow.scratchpad.desk_phone_details ? workflow.scratchpad.desk_phone_details + '\n' : '' )  +
(workflow.scratchpad.mobile_device_details ? workflow.scratchpad.mobile_device_details + '\n' : '') +
(workflow.scratchpad.byod_details ? workflow.scratchpad.byod_details + '\n' : '') +
(workflow.scratchpad.activate_deactivate_details ? workflow.scratchpad.activate_deactivate_details + '\n' : '') ;

// Update CI with mobile number on Request Item
var ci = new GlideRecord('cmdb_ci_comm');
ci.get('name', (current.variables.mobile_number+'').replace(/\D/g,'').slice(-10));
current.configuration_item = ci.sys_id;

// Update Short description on the Request Item
current.short_description +=
(workflow.scratchpad.requested_for_name ? ' for ' + workflow.scratchpad.requested_for_name : '');

// Update Short description & Requested for on the Request
var gr = new GlideRecord('sc_request');
gr.setWorkflow(false);
if (gr.get(current.request.sys_id)) {
	if (current.order_guide)
		gr.short_description = current.order_guide.name +
	(workflow.scratchpad.requested_for_name ? ' for ' + workflow.scratchpad.requested_for_name : '');
	else
		gr.short_description = current.short_description;
	if (current.variables.requested_for)
		gr.requested_for = current.variables.requested_for+'';
	gr.update();
}

// Update Due date on Request Item
if (current.variables.required_by_date)
	current.due_date = current.variables.required_by_date;

// This variable will determine which path the If Activity will take
workflow.scratchpad.desk = current.variables.mod_desk_phone == 'true' || current.variables.pref_style != '0' ? 'true' : 'false';
workflow.scratchpad.mobile = current.variables.mobility_option == 'mobile_supplied' ? 'true' : 'false';
workflow.scratchpad.byod = current.variables.mobility_option == 'bring_own_device' ? 'true' : 'false';
workflow.scratchpad.activation = current.variables.mobility_option == 'mobile_activation' ? 'true' : 'false';
