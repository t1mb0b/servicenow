var journalString = "";   
    var actObject = new GlideRecord('sys_journal_field');   
    actObject.addQuery('element_id', '85071a1347c12200e0ef563dbb9a71c1');   
    actObject.query();   
    journalString = '';  
     
    while( actObject.next() ) {  
         
        journalString += actObject.sys_created_on + ' - ' +  
            actObject.sys_created_by + ' (' + actObject.element + ')\n' +  
            actObject.value + '\n\n';  
         
    }  
     
   gs.print(journalString);
