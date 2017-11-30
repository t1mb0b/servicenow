var Filters = Class.create();
Filters.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {
	
	getApprovers: function(template,afeOpex,afeCapex,fairValue,netBookValue,salePrice) {
		var approversArr = [];
		var templateName = template.name;
		var disposalAmount = Math.max(fairValue, netBookValue, salePrice);
		//gs.info("===> Vals " + fairValue + " | " + netBookValue + " | " + salePrice); 
		//gs.info("===> disposal " + disposalAmount);
		//
		var thresholdGr = new GlideRecord('finance_approval_thresholds');
		if (templateName == 'AFE Request') {
			//gs.info(afeOpex + " | " + afeCapex);
			thresholdGr.addQuery('u_afe_capex_threshold','>=', afeCapex);
			thresholdGr.addQuery('u_afe_opex_threshold','>=', afeOpex);
		}
		if (templateName == 'Fixed Asset Disposal Request') {
			thresholdGr.addQuery('u_disposal_threshold','>=', disposalAmount);
		}
		thresholdGr.query();
		while (thresholdGr.next()) {
			approversArr.push(thresholdGr.getValue('u_approver'));
		}
		return approversArr;
	},

	type: 'Filters'

});


=======

Dictionary Advanced Reference Qual:

javascript:'sys_idIN' + (new Filters().getApprovers(current.template,current.u_afe_opex,current.u_afe_capex,current.u_est_fair_value,current.u_jde_nbv,current.u_sale_price))
