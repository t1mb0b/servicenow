this._EXCLUDEDTYPES = {
	password : true,
	variables : true
};
​
_initializeReturnObject : function(gr,p,sc) {
	var _GlideRecordObject = {
		"table": gr.getTableName(),
		"name" : gr.getClassDisplayValue(),
		"dictionary" : {},
		"priority" : p ? parseInt(p) : 100,
		"fields" : [],			// Unused
		"rowCount" : 0,			// Unused
		"records" : [],	
		"recordMap": {},		// Unused
		"newRecord" : null
	};
	var thisSchemaCols = [];
	if(sc){
		thisSchemaCols = sc.split(",");
	}
	var elements = gr.getElements();
	for (var i=0; i<elements.length; i++) {
		var thisElm = elements[i];
		try {
			var thisFieldType = thisElm.getED().getInternalType();
			var thisFieldCanRead = thisElm.canRead();
			if (this._EXCLUDEDTYPES[thisFieldType]) {
				continue;
			}
			var thisChoices = this._getChoices(
				gr.getTableName(), 
				thisElm.getED().getName()
			),
				thisLength = thisElm.getED().getLength();
​
​
			var	thisFieldName = thisElm.getED().getName(),
				thisFieldLabel = thisElm.getLabel(),
				thisFieldCanWrite = thisElm.canWrite();
​
			//Verify Schema Column Inclusion
			if(sc){
				var thisElmName = thisElm.getED().getName();
				var fieldIncluded = thisSchemaCols.indexOf(thisElmName)>-1;
				var isSystemField = thisElmName.startsWith("sys_");
				if(!(fieldIncluded || isSystemField)){
					//Field Not Included, Skip it
					continue;
				}
			}
​
			if (gr.isValidField(thisFieldName)) {
				_GlideRecordObject.dictionary[thisFieldName] = {
					name : thisFieldName,
					label: thisFieldLabel,
					type : thisFieldType,
					choices : thisChoices,
					length : thisLength,
					canWrite : thisFieldCanWrite
				};
				if (thisFieldType=="reference") {
					_GlideRecordObject.dictionary[thisFieldName].reference_table =
						thisElm.getRefRecord().getTableName();
					_GlideRecordObject.dictionary[thisFieldName].reference_table_title =
						thisElm.getRefRecord().getClassDisplayValue();
				}
				if (thisFieldType=="glide_list") {
					var gr_dict = new GlideRecord('sys_dictionary');
					gr_dict.addQuery('name', thisElm.getED().getTableName());
					gr_dict.addQuery('element', thisElm.getED().getName());
					gr_dict.setLimit(1);
					gr_dict.query();
					gr_dict.next();
					_GlideRecordObject.dictionary[thisFieldName].reference_table =
						gr_dict.getValue('reference');
				}
			}
		} catch(err) {
			gs.error("Mobius record builder initializeGR error for table/field "
					 +gr.getTableName() 
					 +"/"
					 +elements[i].getED().getName()
					 +" ::: " + err);
		}
​
	}
	gr.newRecord();
	_GlideRecordObject.newRecord = this.jsonify(gr,undefined,sc);
	return _GlideRecordObject;
}
​
​
​
/**
 *  Method used to retrieve choices for a field on a table in scope
 *  @param : table - string name of table where choice field is defined
 *  @param : field - string name of choice field
 *  @return : Array of choice objects with label & value
 */
_getChoices : function(table,field) {	
	var choicesArray = [];
	var g_cl = new GlideChoiceList();
	var choices = g_cl.getChoiceList(table, field);
	var choice;
	for (var i=0; i<choices.getSize(); i++) {
		choice = choices.getChoice(i);
		choicesArray.push({
			label : choice.getLabel(),
			value : choice.getValue()
		});
	}
	return choicesArray;
},
