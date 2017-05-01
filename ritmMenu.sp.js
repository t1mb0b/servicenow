/*requested item */
var z = new GlideRecord('sc_req_item');
z.addActiveQuery();
var x = z.addQuery('requested_for', gs.getUserID());
	x.addOrCondition("sys_opened_by",gs.getUserID());
z.orderByDesc('sys_updated_on');
z.setLimit(max);
z.query();
while (z.next()) {

  var a = {};
  $sp.getRecordValues(a, z, 'sys_id,number,sys_updated_on');
  a.short_description = z.cat_item.getDisplayValue() || z.getDisplayValue("short_description");
  a.__table = z.getTableName();
  a.type = 'record';
  a.sortOrder = z.sys_updated_on.getGlideObject().getNumericValue();
  t.items.push(a);
}
