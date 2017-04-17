var user = new GlideRecord('sys_user');
user.addActiveQuery();
user.query();
var count = 0;
while(user.next()){
 
     var role = new GlideRecord('sys_user_has_role');
     role.addQuery('user', user.sys_id);
     role.addQuery('role.name', 'u_graham_timesheets');
     role.query();
     if(role.hasNext()){
          count++;
     }
}
gs.print(count);

====

var user = new GlideRecord('sys_user');
user.addActiveQuery();
user.query();
var count = 0;
while(user.next()){
 
     var role = new GlideRecord('sys_user_has_role');
     var queryString = "role.name=itil^ORrole.name=u_graham_timesheets^ORrole.name=admin";
     role.addQuery('user', user.sys_id);
     //role.addQuery('role.name', 'itil');
     role.addEncodedQuery(queryString);
     role.query();
     if(role.hasNext()){
          count++;
     }
}
gs.print(count);

====

var user = new GlideRecord('sys_user');
user.addActiveQuery();
user.query();
var count = 0;
while(user.next()){
 
     var role = new GlideRecord('sys_user_has_role');
     var queryString = "role.name=itil^ORrole.name=u_graham_timesheets^ORrole.name=admin";
     role.addQuery('user', user.sys_id);
     //role.addQuery('role.name', 'itil');
     role.addEncodedQuery(queryString);
     role.query();
     if(role.hasNext()){
          //count++;
          gs.print(user.name + " has " + role.name);
     }
}
//gs.print(count);

=====

var user = new GlideRecord('sys_user');
user.addActiveQuery();
user.query();
while(user.next()){
     var role = new GlideRecord('sys_user_has_role');
     var queryString = "role.name=itil^ORrole.name=u_graham_timesheets^ORrole.name=admin";
     role.addQuery('user', user.sys_id);
     role.addEncodedQuery(queryString);
     role.query();
     while(role.next()){
          gs.print(user.name + ", " + role.role.name + ", " + role.granted_by.name + ", " + user.last_login_time);
     }
}


=======


var user = new GlideRecord('sys_user');
user.addActiveQuery();
user.query();
while(user.next()){
     var role = new GlideRecord('sys_user_has_role');
     var queryString = "role.name=itil^ORrole.name=u_graham_timesheets";
     role.addQuery('user', user.sys_id);
     role.addEncodedQuery(queryString);
     role.query();
     while(role.next()){
          gs.print(user.name + ", " + user.email + ", " + role.role.name);
     }
}

