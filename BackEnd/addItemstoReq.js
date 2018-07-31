var reqHelper = new GlideappCalculationHelper();
var catItemId = '0c081969db27d34015270a45ca96197e';
var requestId = 'e3f8f03adb6f574015270a45ca9619fb';
reqHelper.addItemToExistingRequest(requestId, catItemId, "1");
reqHelper.rebalanceRequest(requestId);
var grReqItem = new GlideRecord('sc_req_item');
grReqItem.addQuery('request', requestId);
//grReqItem.addQuery('cat_item', catItemId);
grReqItem.orderByDesc('sys_created_on');
grReqItem.query();
if(grReqItem.next()) {
	//gs.log("TM===> RITM Number " + grReqItem.number, "Q:SART Item WF");
	grReqItem.variables.resource_type = "resource_application";
	grReqItem.variables.item_requested = "540ef2c9dba7934015270a45ca961984";
	grReqItem.variables.requested_for = 'f0b09fbcdb6bbe00adfd30cf9d96196f';
  }


===============================
	
	
	
	//var aSelFolders = current.variables.selected_folders.toString().split(",");
var aSelApps = current.variables.selected_applications.toString().split(",");
var aSelMailboxes = current.variables.selected_mailboxes.toString().split(",");
var aSelDistLists = current.variables.selected_dist_lists.toString().split(",");
var aAllItems = aSelApps.concat(aSelMailboxes,aSelDistLists);
//var requestedFor = current.variables.requested_for.toString();
//var requiredDate = current.variables.required_by_date.toString();
var requestId = current.request;
//var allComments = 'Folder comments: ' + '\n' + current.variables.selected_folders_comments + '\n\n' + 'Application Comments: ' + '\n' + current.variables.selected_applications_comments;
// Instantiate Cart
//var cartId = GlideGuid.generate(null);
//var cart = new Cart(cartId);
var reqHelper = new GlideappCalculationHelper();
var catItemId = '0c081969db27d34015270a45ca96197e';
// Declare items array to store item data
var items = [];
//gs.log("TM=====> " + requestedFor + " | " + requiredDate);
//
var ciGr = new GlideRecord("cmdb_ci");
ciGr.addQuery('sys_id', aAllItems);
ciGr.query();
while (ciGr.next()) {
	var item = {};
		item.requestedFor = current.variables.requested_for.toString();
		item.requiredDate = current.variables.required_by_date.toString();
		item.sysId = ciGr.getValue('sys_id');
		item.name = ciGr.getValue('name');
		item.className = ciGr.sys_class_name.getDisplayValue();
		items.push(item);
	}
	
	//
	// items.forEach(function(oItem) {
		// 	gs.log("TM====>" + oItem.name);
		// 	var catItem = cart.addItem(catItemId);
		//     cart.setVariable(catItem, 'resource_type', _getResourceType(oItem.className));
		// 	cart.setVariable(catItem, 'item_requested', oItem.sysId);
		// 	cart.setVariable(catItem, 'requested_by_date', oItem.requiredDate);
		// 	cart.setVariable(catItem, 'item_summary', allComments);
		// });
		// var rc = cart.placeOrder();
		items.forEach(function(oItem) {
			gs.log("TM====> Item name " + oItem.name, "Q:SART Item WF");
			reqHelper.addItemToExistingRequest(requestId, catItemId, "1");
			reqHelper.rebalanceRequest(current.request);
			var grReqItem = new GlideRecord('sc_req_item');
			grReqItem.addQuery('request', current.request);
			//grReqItem.addQuery('cat_item', catItemId);
			grReqItem.orderByDesc('sys_created_on');
			grReqItem.query();
			if(grReqItem.next()) {
				gs.log("TM===> RITM Number " + grReqItem.number, "Q:SART Item WF");
				grReqItem.variables.resource_type = _getResourceType(oItem.className);
				grReqItem.variables.item_requested = oItem.sysId;
				grReqItem.variables.required_by_date = oItem.requiredDate;
				grReqItem.variables.requested_for = oItem.requestedFor;
				grReqItem.variables.additional_comments = current.variables.additional_comments;
				grReqItem.variables.requested_for_email = current.variables.requested_for_email;
				grReqItem.variables.requested_for_phone = current.variables.requested_for_phone;
				grReqItem.variables.requested_for_mobile_phone = current.variables.requested_for_mobile_phone;
				grReqItem.variables.requested_for_manager = current.variables.requested_for_manager;
				grReqItem.variables.requested_for_department = current.variables.requested_for_department;
				grReqItem.variables.requested_for_company = current.variables.requested_for_company;
				grReqItem.variables.requested_for_location = current.variables.requested_for_location;
				grReqItem.parent = current.sys_id;
				grReqItem.update();
			}
		});
		
		/****/
		function _getResourceType(sysClassName) {
			var sysClasses = {
				'Application': 'resource_application',
				'Storage File Share': 'resource_folder',
				'Email Distribution List': 'resource_dist_list'
				
			};
			return sysClasses[sysClassName];
		}
		
		//gs.log(JSON.stringify(items));
		
