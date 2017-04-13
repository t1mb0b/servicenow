var EmailUtil = Class.create();
EmailUtil.prototype = {
	initialize: function() {
	},
	
	removeSecurityText: function(text) {
		while(this._checkForText(text)){
			var loc = text.indexOf("The information contained in this email,");
			var text1 = text.slice(0, loc);
			var text2 = text.slice(loc+581);
			text = text1 + text2;
		}
		
		return text;
	},
	
	_checkForText: function(text) {
		var loc = text.indexOf("The information contained in this email,");
		if(loc>0)
			return true;
		else
			return false;
	},
	
	type: 'EmailUtil'
}
