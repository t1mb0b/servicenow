function newLineSub(inputString){
	return inputString.replace(/(?:\r\n|\r|\n)/g, '<br/>');
}
var tablestart = '<div class="nmmcbg" width="100% style="background-color: white;">';
var d = '<div style="display:inline;font-weight:bold;" class="nmmcbold">';
var dn = '</div>\n';
var i;
var vtp = '';
var v = new GlideRecord('sc_item_option_mtom');
v.addQuery('request_item', current.sysapproval);
v.orderBy('sc_item_option.order');
v.query();
while (v.next()) {
    if (vtp.length >= 0) {
        /*****************************
This code dynamically pulls the questions from the forms in the order they are presented (numerically)
and then displays them in a consistant readable format.
Right now nothing links to any records but can with some slight changes to this code.
*****************************/
        if (v.sc_item_option.value.getDisplayValue() != '') { /*if the value is blank, don't print*/
            if (v.sc_item_option.item_option_new.type == 1) { //Yes / No
                vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue() + '\n';
            }
            if (v.sc_item_option.item_option_new.type == 2) { //Multi Line Text
				vtp += newLineSub('<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue()) + '\n';
            }
            if (v.sc_item_option.item_option_new.type == 3) { //Multiple Choice
                vtp += newLineSub('<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue()) + '\n';
            }
            if (v.sc_item_option.item_option_new.type == 4) { //Numeric Scale
                vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue() + '\n';
            }
            if (v.sc_item_option.item_option_new.type == 5) { //Select Box
                vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue() + '\n';
				//vtp += '<p><b>' + JSON.stringify(v.sc_item_option.value) + '\n';
            }
            if (v.sc_item_option.item_option_new.type == 6) { //Single Line Text
                vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue() + '\n';
            }
            if (v.sc_item_option.item_option_new.type == 7 && v.sc_item_option.value.getDisplayValue() != 'false' ) { //Check Box
                vtp += '<p>' + v.sc_item_option.item_option_new.getDisplayValue() + '</p>\n';
            }
            if (v.sc_item_option.item_option_new.type == 8) { //Reference
                var referencegr = new GlideRecord(v.sc_item_option.item_option_new.reference);
                referencegr.addQuery('sys_id', '=', v.sc_item_option.value);
                referencegr.query();
                while (referencegr.next()) {
                    vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p> ' + referencegr.getDisplayValue() + '\n';
                }
            }
            if (v.sc_item_option.item_option_new.type == 9) { //Date
                vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue() + '\n';
            }
            if (v.sc_item_option.item_option_new.type == 10) { //Date/Time
                vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue() + '\n';
            }
            if (v.sc_item_option.item_option_new.type == 11) { //Label
                vtp += '<b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b><br />' + v.sc_item_option.value.getDisplayValue() + '<br /><br />';
			}
			/*
            }
            if (v.sc_item_option.item_option_new.type == 12) { //Break
                //Do nothing
            }
            if (v.sc_item_option.item_option_new.type == 13) { //Not Listed
                //Do nothing
            }
            if (v.sc_item_option.item_option_new.type == 14) { //Macro
                //Do nothing
            }
            if (v.sc_item_option.item_option_new.type == 15) { //UI Page
                //Do nothing
            }
            */
            if (v.sc_item_option.item_option_new.type == 16) { //Wide Single Line Text
                vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue() + '\n';
            }
            /*
            if (v.sc_item_option.item_option_new.type == 17) { //Macro with Label
                //Do nothing
            }
            */
            if (v.sc_item_option.item_option_new.type == 18) { //Lookup Select Box
                var lsbgr = new GlideRecord(v.sc_item_option.item_option_new.lookup_table);
                lsbgr.addQuery('sys_id', '=', v.sc_item_option.value);
                lsbgr.query();
                while (lsbgr.next()) {
                    vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p> ' + lsbgr.getDisplayValue() + '\n';
                }
            }
            if (v.sc_item_option.item_option_new.type == 19) { //Container Start
                vtp += '<b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b><br />' + v.sc_item_option.value.getDisplayValue() + '<br /><br />';
            }
			/*
            if (v.sc_item_option.item_option_new.type == 20) { //Container End
                //Do nothing
            }
            */
            if (v.sc_item_option.item_option_new.type == 21) { //List Collector
                var list = v.sc_item_option.value.getDisplayValue();
                var listarray = list.split(',');
                vtp += '<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>\n';
                for (i = 0; i < listarray.length; i = i + 1) {
                    var igr = new GlideRecord(v.sc_item_option.item_option_new.list_table);
                    igr.addQuery('sys_id', '=', listarray[i]);
                    igr.query();
                    while (igr.next()) {
                        vtp += '- ' + igr.getDisplayValue() + '<br/>'; //displayvalues
                    }
                    //vtp +=  'i = ' + i + '- ' + listarray<i> + '\n';//sys_ids
                }
            }
            if (v.sc_item_option.item_option_new.type == 22) { //Lookup Multiple Choice //success
                vtp += newLineSub('<p><b>' + v.sc_item_option.item_option_new.getDisplayValue() + '</b></p>' + v.sc_item_option.value.getDisplayValue()) + '\n';
            }
        }
    }
}

var wn = '\n';
wn += tablestart;
wn += vtp;
wn += "</div>";
template.print(wn);
//then either write wn pre and appended with [code] tags in a journal field, or put it in a mail script.
