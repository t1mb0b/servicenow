jsonify : function(gr,depth) {
	var returnRecord = {
		_display_value : gr.isNewRecord() ? "" : gr.getDisplayValue()
	};
	var thisSchemaCols = [];
​
	// Grab all field elements from GlideRecord
	var elements = gr.getElements();
	// Build field dictionary
	for (var i=0; i<elements.length; i++) {
		var thisElm = elements[i];
		try {
			var thisFieldType = thisElm.getED().getInternalType();
			/*
				if (this._EXCLUDEDTYPES[thisFieldType]) {
					continue;
				}
				*/
​
			if (gr.isValidField(thisElm.getED().getName())) {
				returnRecord[thisElm.getED().getName()] = {
					"value": gr.getValue(thisElm.getED().getName()),
					"display_value": gr.getDisplayValue(thisElm.getED().getName()),
					"type": thisElm.getED().getInternalType()
				};
​
				//TODO: Write logic to reach further than 1 level into reference fields
				if (thisElm.getED().getInternalType()=='reference' && depth && depth>0) {
					returnRecord[thisElm.getED().getName()].reference_record =
						this.jsonify(gr[thisElm.getED().getName()].getRefRecord(),0);
				}
			}
		} catch(err) {
			gs.error("Reservation jsonify error for table/field "
					 +gr.getTableName() 
					 +"/"
					 +elements[i].getED().getName()
					 +" ::: " + err);
		}
	}
	return returnRecord;
}
