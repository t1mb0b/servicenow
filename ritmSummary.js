  var gr = new GlideRecord("sc_req_item");
  gr.addQuery("request", current.request.sys_id);
  gr.query();
  while(gr.next()) {
    // Get Owned Variables for Requested Item and sort by Order
    var ownvar = new GlideRecord('sc_item_option_mtom');
    ownvar.addQuery('request_item.number', gr.number);
    ownvar.addQuery('sc_item_option.value','!=','');
    ownvar.orderBy('sc_item_option.order');
    ownvar.query();
	var items = "Summary of " + gr.number + ":  " + gr.cat_item.getDisplayValue() + "\n\n";  
    while(ownvar.next()) {
		     var field = ownvar.sc_item_option.item_option_new;
             var fieldValue = ownvar.sc_item_option.item_option_new.name;
             // Print variable name
		     //items += "<b>" + field.getDisplayValue() + '</b>: ' + gr.variables[fieldValue].getDisplayValue() + '\n';
			items += field.getDisplayValue() + ": " + gr.variables[fieldValue].getDisplayValue() + "\n";
     }
  }
task.description = items;
task.short_description = "Var " + current.variables.var + " - Test";
