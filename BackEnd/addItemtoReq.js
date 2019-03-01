setRequestedFor();
addItem();

function setRequestedFor(){
   current.u_requested_for = current.variables.onboarded_user;
}

function addItem(){
   var catalog_item = current.cat_item;
   var sList = getCIList(); //our list from req item as a string
   var aList = sList.split(",");

   var dList;
   if (aList.length > 1){
      dList = aList.pop();   //remove one item and put that in the dList for further processing in the workflow
     var req_item = createRequestedItem(catalog_item, current.request, aList);
      updateRequestedItem(req_item, dList);
   }else{
      dList = aList.pop();  //last item on the list
   }
   //use the scratchpad variable for further processing
   workflow.scratchpad.dList = dList;
}

function getCIList(){
   var result = '';
   // Report
   if(current.cat_item == '82ab5df4d54901001257883c4b437267'){
      result = current.variables.report;
      //Dist List
   }else if(current.cat_item == '6d8bc970d54901001257883c4b4372c7'){
      result = current.variables.dist_list;
      //Request Folder(s)
   }else if(current.cat_item == '8e5f91e8d54501001257883c4b4372b8'){
      result = current.variables.folder;
      //Request Mailbox(es)
   }else if(current.cat_item == 'f3a69974d54901001257883c4b437258'){
      result = current.variables.mailbox;
   }
   return result.toString();
}

function createRequestedItem(catalog_item, request_id, aList){
   var req_item_sysid;
   var gr = new GlideRecord("sc_req_item");
   gr.initialize();
   gr.cat_item = catalog_item;
   gr.request = request_id;
   gr.u_requested_for = current.variables.onboarded_user;
   req_item_sysid = gr.insert();

   insertVariables(catalog_item, req_item_sysid, aList);

   return req_item_sysid;
}

function insertVariables(catalog_item,req_item_sysid, aList){
   var gr = new GlideRecord("item_option_new");
   gr.addQuery('cat_item' , catalog_item);
   gr.addQuery('active', true);
   gr.query();
   while (gr.next()){
      var varInstance = createVariableInstance(gr.sys_id, gr.name, gr.order, aList);
      attachVarToRequestedItem(req_item_sysid, varInstance);
   }
}

function createVariableInstance(item_option_new, item_option_new_name, order, aList){
   var gr = new GlideRecord("sc_item_option");
   gr.initialize();
   gr.item_option_new  = item_option_new;
   gr.value = getVariableValue(item_option_new_name, aList);
   gr.order = order;

   return  gr.insert();
}

function getVariableValue(item_option_new_name, aList){
   var result;
   if(item_option_new_name == 'provision_privileges'){
      result = current.variables.provision_privileges;
   }else if(item_option_new_name =='requested_for'){
      result = current.variables.requested_for;
   }else if(item_option_new_name == 'onboarded_user'){
      result = current.variables.onboarded_user;
   }else if(item_option_new_name =='report'){
      result = aList.toString();
   }else if(item_option_new_name =='dist_list'){
      result = aList.toString();
   }else if(item_option_new_name =='mailbox'){
      result = aList.toString();
   }else if(item_option_new_name =='folder'){
      result = aList.toString();
   }else if(item_option_new_name =='start_date'){
      result = current.variables.start_date;
   }else if(item_option_new_name =='expiry_date'){
      result = current.variables.expiry_date;
   }else if(item_option_new_name == 'add_access'){
      result = current.variables.add_access;
   }else if(item_option_new_name == 'afe_number'){
      result = current.variables.afe_number;

// Added by IK for including the business reason in sub catalog items for folder request

   }else if(item_option_new_name == 'business_reason_text'){
      result = current.variables.business_reason_text;
   }else{
      result = '';
   }
   return result;
}

function attachVarToRequestedItem(req_item_sysid,  varInstance ){
   var gr = new GlideRecord("sc_item_option_mtom");
   gr.initialize();
   gr.request_item  = req_item_sysid;
   gr.sc_item_option  =  varInstance;
   gr.insert();
}

function updateRequestedItem(req_item_sysid, dList){
   var req = new GlideRecord('sc_req_item');
   if(req.get(req_item_sysid)){
      req.stage = "request_approved";
      req.due_date = current.due_date ;
      req.update();
   }
}

//
