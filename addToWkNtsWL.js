(function executeRule(current, previous /*null when async*/) {  
  var members=[];  
  var grpname = ['System Administrators','Network Administrators']; //PLEASE MAKE SURE GROUP NAMES ARE CORRECT  
  for(i=0;i<grpname.length;i++)  
  {  
  var gr= new GlideRecord('sys_user_grmember');  
  gr.addQuery('group.name', grpname[i]); //put your group name here  
  gr.addQuery('user.active',true);  
  gr.query();  
  while(gr.next()){  
  members.push(gr.getValue('user'));  
  }  
  }  
  var new_memb='';  
  if(current.work_notes_list.toString().length>0)  
  new_memb=current.work_notes_list.toString()+','+members.join();  
  else  
  new_memb=members.join();  
  current.work_notes_list =new ArrayUtil().unique(new_memb.split(',')).join();  
})(current, previous);  
