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
	
	removeVarText: function(sText) {
		if(this._checkForVars(sText)){
			gs.log("TM===> Stripping Delimeter", "Q: Geu SI");
			sText = sText.replace(/([\s\S]*?)%BEGIN%[\s\S]*?%END%/g, '$1');
		}
		return sText;
	},
	
	_checkForText: function(text) {
		var loc = text.indexOf("The information contained in this email,");
		if(loc>0)
			return true;
		else
			return false;
	},
	
	_checkForVars: function(sText) {
		var sDelimeter = sText.indexOf("%BEGIN%");
		if(sDelimeter>0) {
			gs.log("TM===> Found Delimeter", "Q: Geu SI");
			return true;
		} else {
			return false;
		}
	},
	
	type: 'EmailUtil'
}
