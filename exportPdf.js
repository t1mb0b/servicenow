function exportToPdf(){
   var checked = g_list.getChecked(); 
   var sys_list = "sys_idIN" + checked.toString();
   var additional_params = ["active=true"].join("^");
   var query = [sys_list, additional_params].join("^");
   var rows = checked.split(",").length; 
   var view = "default"; // set this to default for columns present in default view for list layout

   var dialog = new GwtPollDialog(g_list.tableName, query, rows, view, 'unload_pdf+landscape');

   dialog.execute();
}
