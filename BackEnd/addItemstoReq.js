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
