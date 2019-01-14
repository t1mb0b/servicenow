/* create an associated array to contain parent record, then loop through the parent to pull in the children data rather than a nested query */

var parent = [];
var grParent = new GlideRecord('my_table');
	grParent.addQuery('active',true);
	grParent.query();
while(grParent.next())
{
	var tempObj = {};
		tempObj.parent = {};
		tempObj.parent.id = grParent.sys_id+"";
		tempObj.parent.display = grParent.getDisplayValue();
	parent[grParent.sys_id+""] = tempObj;
}

while(x in parent)
{
	var parentID = parent[x].parent.id+"";
	
	var grChild = newGlideRecord('my_child_table');
		grChild.addQuery('parent',parentID);
		grChild.addQuery('active',true);
		grChild.query();
	
	while(grChild.next())
	{
		parent[x].child = {}; // make this an array containing the object if association is many (child) to one (parent)
		parent.child.id = grChild.sys_id+"";
		parent.child.display = grChild.getDisplayValue();
	}
}
