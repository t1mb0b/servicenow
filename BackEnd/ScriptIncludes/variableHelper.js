var variableHelper = Class.create();
variableHelper.prototype = {
	initialize: function() {
	},
	getVariables: function(){
		if(!this.variableOptions){
			this.variableOptions = {
				returnEmpty: false,
				includeThese: {
					"1": "string",//yes/no
					"2": "string",//multi-line text
					"3": "string",//multiple choice
					"4": "string",//numeric scale
					"5": "select",//select box
					"6": "string",//single line text
					"7": "string",//checkbox
					"8": "reference",//reference
					"9": "string",//date
					"10": "string",//date time
					//"11":"string",//label
					//"12":"string",//break
					//"13":"string",//not listed
					//"14":"string",//macro
					//"15":"string",//ui page
					"16": "string",//wide single line text
					//17:"string",//macro w/label
					"18": "lookupSelectBox",//lookup select box
					//"19":"string",//container start
					//"20":"string",//container end
					"21": "listCollector",//list collector
					"22": "string"//lookup multiplechoice
				},
			};
		}
		var returnObj = {};
		if(current){
			returnObj.vars = [];
			var v = new GlideRecord('sc_item_option_mtom');
			v.addQuery('request_item', current.getValue('sys_id'));
			v.orderBy('sc_item_option.order');
			v.query();
			while (v.next()) {
				/*
				* This code dynamically pulls the questions from the forms in the order they are presented (numerically)
				* and then displays them in a consistant readable format.
				* Right now nothing links to any records but can with some slight changes to this code.
				*/
				if (v.sc_item_option.value.getDisplayValue() != '' || this.variableOptions.returnEmpty) { /*if the value is blank, don't print*/
					for(var varType in this.variableOptions.includeThese){
						if(v.sc_item_option.item_option_new.type == varType){
							if(this.variableOptions.includeThese[varType] === "string"){
								returnObj.vars.push({
									label: v.sc_item_option.item_option_new.getDisplayValue(),
									value: v.sc_item_option.value.getDisplayValue(),
									order: v.sc_item_option.order.getDisplayValue()
								});
							}
							if(this.variableOptions.includeThese[varType] === "select"){
								var questionValue = '';
								var question_choice = new GlideRecord('question_choice');
								question_choice.addQuery('question', v.sc_item_option.item_option_new.toString());
								question_choice.addQuery('value', v.sc_item_option.value.toString());
								question_choice.query();
								if(question_choice.next()){
									questionValue = question_choice.getValue('text');//if its a choice
								} else {
									questionValue = v.sc_item_option.value.getDisplayValue();//if it cant be found show value stored
								}
								returnObj.vars.push({
									label: v.sc_item_option.item_option_new.getDisplayValue(),
									value: questionValue,
									order: v.sc_item_option.order.getDisplayValue()
								});
							}

							if(this.variableOptions.includeThese[varType] === "reference"){
								var referencegr = new GlideRecord(v.sc_item_option.item_option_new.reference);
								referencegr.addQuery('sys_id', '=', v.sc_item_option.value);
								referencegr.query();
								if (referencegr.next()) {
									returnObj.vars.push({
										label: v.sc_item_option.item_option_new.getDisplayValue(),
										value: referencegr.getDisplayValue(),
										order: v.sc_item_option.order.getDisplayValue()
									});
								} else { // if the value is invalid or set to a string that has no matching record.
									returnObj.vars.push({
										label: v.sc_item_option.item_option_new.getDisplayValue(),
										value: v.sc_item_option.value.getDisplayValue(),
										order: v.sc_item_option.order.getDisplayValue()
									});
								}
							}
							if(this.variableOptions.includeThese[varType] === "lookupSelectBox"){
								var lsbgr = new GlideRecord(v.sc_item_option.item_option_new.lookup_table);
								lsbgr.addQuery('sys_id', '=', v.sc_item_option.value);
								lsbgr.query();
								if (lsbgr.next()) {
									returnObj.vars.push({
										label: v.sc_item_option.item_option_new.getDisplayValue(),
										value: lsbgr.getDisplayValue(),
										order: v.sc_item_option.order.getDisplayValue()
									});
								} else { // if the value is invalid or set to a string that has no matching record.
									returnObj.vars.push({
										label: v.sc_item_option.item_option_new.getDisplayValue(),
										value: v.sc_item_option.value.getDisplayValue(),
										order: v.sc_item_option.order.getDisplayValue()
									});
								}
							}
							if(this.variableOptions.includeThese[varType] === "listCollector"){
								var listArray = v.sc_item_option.value.getDisplayValue().split(',');
								var listValues = [];
								vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>\n';
								for (i = 0; i < listArray.length; i = i + 1) {
									var igr = new GlideRecord(v.sc_item_option.item_option_new.list_table);
									igr.addQuery('sys_id', '=', listArray[i]);
									igr.query();
									if (igr.next()) {
										listValues.push(igr.getDisplayValue());//displayValues
									}
									//vtp +=  'i = ' + i + '- ' + listarray<i> + '\n';//sys_ids
								}
								returnObj.vars.push({
									label: v.sc_item_option.item_option_new.getDisplayValue(),
									value: listValues,
									order: v.sc_item_option.order.getDisplayValue()
								});
							}
						}
					}

				}
			}
		} else { // current undefined
			returnObj.error = "current was not defined";
		}
		return returnObj;
	},
	type: 'variableHelper'
};
