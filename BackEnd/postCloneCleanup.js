/* 
** After a Clone is complete,
** add the environment name and Clone Date 
** (i.e. Test Environment - Clone 8/14),
** to the header and set the Tab title.
** from user 'eric' on sndevs slack channel
*/

var instance = gs.getProperty('instance_name');
var header;
var tab;

if (instance == '<dev instance prefix>'){
    header = "DEV Environment - Clone ";
    tab = "Dev";
} else if (instance == '<test instance prefix>'){
    header = "Test Environment - Clone ";
    tab = "Test";
} else header = "Clone ";

var gdt = new GlideDateTime();

var string = header + gdt.getMonthLocalTime() + "/" + gdt.getDayOfMonthLocalTime();
gs.setProperty("glide.product.description", string);
gs.setProperty("glide.product.name", tab);
