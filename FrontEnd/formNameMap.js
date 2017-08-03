

for (var index = 0; index < g_form.nameMap.length; index++) {  
   jslog("Name Map # " + index + ": " + g_form.nameMap[index].prettyName);  
}

for (var index = 0; index < g_form.nameMap.length; index++) {  
   jslog("Name Map # " + index + ": " + g_form.nameMap[index].prettyName);  
var helptext = g_form.getControl(g_form.nameMap[index].prettyName);
toggleHelp(helptext.id);
}  

