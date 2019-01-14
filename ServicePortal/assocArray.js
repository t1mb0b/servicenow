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

=====
	
	<table class="table table-rounded" ng-if="data.divList" ng-repeat="h in data.divList">
       <thead>
         <tr>
           <th>{{h.parent.display}}</th>
           <th></th>
           <th>Room Number: {{h.parent.room}}</th>
         </tr>
       </thead>
         <tbody >
         <tr ng-repeat="s in h.parent.child">
           <td>
           {{s.user_last}}, {{s.user_first}}
           </td>
           <td>
             {{s.user_title}}
           </td>
           <td>
             {{s.user_office_phone}}
           </td>
         </tr>
       </tbody>
     </table>

----

data.divList=[];
var parent = [];
var grParent = new GlideRecord('x_usdo2_phone_dire_divisions');
    grParent.addQuery('active',true);
    grParent.orderBy('order');
    grParent.query();
while(grParent.next())
{
    var tempObj = {};
        tempObj.parent = {};
        tempObj.parent.id = grParent.sys_id+"";
        tempObj.parent.room = grParent.getDisplayValue('room_number');
        tempObj.parent.display = grParent.getDisplayValue('label');
        tempObj.child = [];
    parent[grParent.sys_id+""] = tempObj;
    data.divList.push(tempObj);
}

for(x in parent)
{
    var parentID = parent[x].parent.id+"";
    
    var grChild = new GlideRecord('x_usdo2_phone_dire_numbers');
        grChild.addQuery('division',parentID);
        grChild.addQuery('active',true);
        grChild.query();
    
    while(grChild.next())
    {
        parent[x].child.push({
                'user_last':grChild.getDisplayValue('last_name'),
                'user_first':grChild.getDisplayValue('first_name'),
                'user_office':grChild.getDisplayValue('office'),
                'user_title':grChild.getDisplayValue('job_title'),
                'user_div':grChild.getDisplayValue('division'),
                'user_office_phone':grChild.getDisplayValue('office_phone'),
                'user_official_cell':grChild.getDisplayValue('official_cell'),
                'user_home_phone':grChild.getDisplayValue('home_phone'),
                'user_alternate_phone':grChild.getDisplayValue('alternate_phone'),
                'user_short_extension':grChild.getDisplayValue('short_extension')
            });
        
    }
}

-----
	
	
console.log('*** SERVER BEGIN ***'); // info line
data.parent = []; // leave it empty to troubleshoot later.

console.log('SERVER: Initiate Parent query'); // info line
var grParent = new GlideRecord('x_usdo2_phone_dire_divisions');
    grParent.addQuery('active',true);
    grParent.orderBy('order');
    grParent.query();

console.log('Parent Row Count: '+grParent.getRowCount());

while(grParent.next())
{
    var sys_id = grParent.getValue('sys_id')+""; // cleaner
    var tempObj =  {
        'id': sys_id+"",
        'room':grParent.getDisplayValue('room_number')+"",
        'display': grParent.getDisplayValue('label')+"",
        'child': []
        }

    console.log('parent tempObj:'); // log object to make sure everything looks ok
    console.log(JSON.stringify(tempObj));

    data.parent[sys_id+""] = tempObj; // push object to associative array value, using sys_id as key
}

console.log('parent');
console.log(JSON.stringify(data.parent));

console.log('SERVER: Initiate Child Queries'); // info line
for(x in data.parent)
{
    var parentRec = data.parent[x]; // cleaner
    var parentID = parentRec.id+""; // cleaner
    console.log('parent: ' + parentRec.display); // show which object you're currently on a loop for

    var grChild = new GlideRecord('x_usdo2_phone_dire_numbers');
        grChild.addQuery('division',parentID+"");
        grChild.addQuery('active',true);
        grChild.query();

    console.log('Child Row Count: '+grChild.getRowCount());
    
    while(grChild.next())
    {
        var childID = grChild.getValue('sys_id')+""; // cleaner
        var tempObj = {
            'parentID': parentID+"", 
            'sys_id': childID+"", 
            'user_last': grChild.getDisplayValue('last_name')+"",
            'user_first': grChild.getDisplayValue('first_name')+"",
            'user_office': grChild.getDisplayValue('office')+"",
            'user_title': grChild.getDisplayValue('job_title')+"",
            'user_div': grChild.getDisplayValue('division')+"",
            'user_office_phone': grChild.getDisplayValue('office_phone')+"",
            'user_official_cell': grChild.getDisplayValue('official_cell')+"",
            'user_home_phone': grChild.getDisplayValue('home_phone')+"",
            'user_alternate_phone': grChild.getDisplayValue('alternate_phone')+"",
            'user_short_extension': grChild.getDisplayValue('short_extension')+""
            }

        console.log('child tempObj')
        console.log(JSON.stringify(tempObj)); // log object to make sure everything looks ok
        parentRec.child[childID+""] = tempObj; // push object to associative array value, using sys_id as key
        console.log('parentRec: ');
        console.log(JSON.stringify(parentRec));
        console.log('');
     }
}


console.log('data.parent: '); // final progress of associative array
console.log(JSON.stringify(data.parent));
console.log('*** SERVER END ***');


