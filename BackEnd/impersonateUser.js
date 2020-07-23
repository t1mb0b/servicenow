var myUser = gs.getSession().impersonate("6a826bf03710200044e0bfc8bcbe5dec"); //Lets grab a user
gs.print(filterRequestItems()); //run the below function



function filterRequestItems () {
    gs.print("Getting items as :" + gs.getUserName() + ":" + gs.getUserID());  
    var availableItems = [],table = "sc_cat_item",catItem = new GlideRecord(table);  
    catItem.addActiveQuery();  
    catItem.query(); //For each Catalog item  
    gs.print ("row count is:" + catItem.getRowCount());
    while ( catItem.next() ) {
    //carbon 04b7e94b4f7b4200086eeed18110c7fd 
        var item = GlideappCatalogItem.get(catItem.sys_id + ''); 
    
        if (  item != null && item.canView() && catItem.getClassDisplayValue() == table ) {
            availableItems.push(catItem.sys_id + '');
        }  
    }  
    //Return the advanced Ref Qualifier  
    return 'sys_idIN' + availableItems;  
} 

/// BR
session.onlineImpersonate("abel.tuter");
var current = GlideRecord('incident');
if (!gs.hasRole("itil")) {
  var u = gs.getUserID();
   var qc = current.addQuery("caller_id", u).addOrCondition("opened_by", u).addOrCondition("watch_list", "CONTAINS", u);
  gs.print("query restricted to user: " + u);
}
 current.query();
while (current.next()) {
gs.print(current.number);
}
session.onlineUnimpersonate();

//
var og = gs.getSession().impersonate('5136503cc611227c0183e96598c4f706'); 
gs.print(gs.getUser().getFullName()); 
var gr1 = new GlideRecord('sn_customerservice_case'); 
gr1.addQuery('sys_id',b08cd51fdba83a007a4cbedffe96196d'); 
gr1.query(); 
if(gr1.next()) 
gs.print("Found it"); 
else 
gs.print("Not Found"); 
gs.getSession().impersonate(og); 
