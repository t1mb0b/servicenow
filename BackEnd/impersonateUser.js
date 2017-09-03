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
