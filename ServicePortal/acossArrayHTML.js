<form>

  <!-- Step 2. Display initial data from the server -->
  <table class="table table-rounded" ng-if="data.parent" ng-repeat="h in data.parent">
        <thead>
          <tr>
            <th>{{h.display}}</th>
            <th></th>
            <th>Room Number: {{h.room}}</th>
          </tr>
        </thead>
          <tbody >
          <tr ng-repeat="s in h.child">
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


  <!-- Step 5. Display customized content based on user input -->



</form>

-----

table{
  border: solid 1px #8C8C8C;
  border-radius: 10px;
  -moz-border-radius: 10px;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 15px;
}
.table-rounded {

}
.table-rounded thead th {
    background-color: #0099d8;
    color: #fff;
}
.table-rounded thead th:first-child {
    border-radius: 10px 0 0 0;
}
.table-rounded thead th:last-child {
    border-radius: 0 10px 0 0;
}
.table-rounded tbody td {
    border: none;
    background-color: #fff;
}
.table-rounded tbody tr:last-child td:first-child {
    border-radius: 0 0 0 10px;
}
.table-rounded tbody tr:last-child td:last-child {
    border-radius: 0 0 10px 0;
}

td i{
  margin-left: 15px;
}
bold{
  font-weight: bold;
  margin-right: 30px;
}
.invisible-fa{
  visibility:hidden;
}

.panel{
  margin-top: 15px;
}
.panel-body{
  text-align: center;
}

----

(function() {

    /* Step 1. Load initial data from the server */
            /* populate the 'data' object */
            /* e.g., data.table = $sp.getValue('table'); */

    if(!input) {
console.log('*** SERVER BEGIN ***'); // info line
data.parent = []; // leave it empty to troubleshoot later.

console.log('SERVER: Initiate Parent query'); // info line
var grParent = new GlideRecord('divisions');
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

    data.parent.push(tempObj); // push object to associative array value, using sys_id as key
}

console.log('parent');
console.log(JSON.stringify(data.parent));

console.log('SERVER: Initiate Child Queries'); // info line
for(x in data.parent)
{
    var parentRec = data.parent[x]; // cleaner
    var parentID = parentRec.id+""; // cleaner
    console.log('parent: ' + parentRec.display); // show which object you're currently on a loop for

    var grChild = new GlideRecord('user_numbers');
        grChild.addQuery('division',parentID+"");
        grChild.addQuery('active',true);
        grChild.query();

    console.log('Child Row Count: '+grChild.getRowCount());
    
    while(grChild.next())
    {
        var childID = grChild.getValue('sys_id')+""; // cleaner
        var tempObj = {
            'parentID': parentID+"", // make sure parent ID is in object so you can match to parent if needed.
            'sys_id': childID+"", // make sure sys_id is in object so you can match to key if needed.
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
        parentRec.child.push(tempObj); // push object to associative array value, using sys_id as key
        console.log('parentRec: ');
        console.log(JSON.stringify(parentRec));
        console.log('');
     }
}


console.log('data.parent: '); // final progress of associative array
console.log(JSON.stringify(data.parent));
console.log('*** SERVER END ***');
    }


    /* Step 4. Process user input */
    
    if(input) {
        
    }

})();



