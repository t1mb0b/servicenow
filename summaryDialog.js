onClick = showMyForm();

=========

function showMyForm(){
   //Get the table name and sys_id of the record
   var tableName = g_form.getTableName();
   var sysID = g_form.getUniqueValue();

   //Create and open the dialog form
   var dialog = new GlideDialogForm('Email Summary', tableName); //Provide dialog title and table name
   dialog.setSysID(sysID); //Pass in sys_id to edit existing record, -1 to create new record
   dialog.addParm('sysparm_view', 'EmailSubmit'); //Specify a form view
   dialog.addParm('sysparm_form_only', 'true'); //Add or remove related lists
   dialog.render(); //Open the dialog
}
