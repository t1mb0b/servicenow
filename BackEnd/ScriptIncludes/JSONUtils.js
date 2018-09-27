var JsonUtils = Class.create();
JsonUtils.prototype = {
    initialize: function() {
    },

		getValueFromJSON: function(json, element) {
		var value = json;
		try {
			var elements = element.split(".");
			for (var i = 0; i < elements.length; i++) {
				var thisElement = elements[i];
				value = value[thisElement];
			}
		} catch(e ) {
			value = "";
		}
		return value;
	}, 
	
	getArrayFromJSON: function(json, element) {
		var value = json;
		try {
			var elements = element.split(".");
			for (var i = 0; i < elements.length; i++) {
				var thisElement = elements[i];
				value = value[thisElement];
			}
		} catch(e ) {
			value = [];
		}
		return [].concat(value);
	}, 
	
    type: 'JsonUtils'
};
