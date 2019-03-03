findActiveRequestswithClosedItems();

function findActiveRequestswithClosedItems() {
  var grRequestedItem;
  var grRequest = new GlideRecord('sc_request');
  grRequest.addActiveQuery();
  grRequest.query();
  gs.print('BAD REQUESTS, No Active Requested Items :(');
  while (grRequest.next()) {
    grRequestedItem = new GlideRecord('sc_req_item');
    grRequestedItem.addQuery('request', grRequest.sys_id);
    grRequestedItem.addActiveQuery();
    grRequestedItem.query();
    if (grRequestedItem.getRowCount() === 0) {
      gs.print(grRequest.number + ' | ' + grRequest.opened_by.name + ' | ' + grRequest.sys_created_on);
    }
  }
}
