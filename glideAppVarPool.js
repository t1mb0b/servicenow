var set = new GlideappVariablePoolQuestionSet();
set.setRequestID(current.request_item);
set.load();
var q = set.getFlatQuestions();
var iter = q.iterator();
while (iter.hasNext()) {
var item = iter.next();

if (item.getLabel() != 'null' && item.getLabel() != 'Urgency' && item.getLabel() != 'Impact' && item.getDisplayValue() != '' && item.getDisplayValue() != 'None' && item.getDisplayValue() != 'null' && item.getDisplayValue() != 'false') {
  
  if (item.name == 'request_for' || item.name == 'request_by') {
   
   template.print("<span><p><p style='font-family: calibri; font-size: 14.5px'><b>" + item.getLabel() + "</b> - " + item.getDisplayValue());
   template.print("<br><b>Location</b> - " + Location);
   template.print("<br><b>Country</b> - " + Country);
   
   if (!DeskPhone.nil())
    template.print("<br><b>Business Phone</b> - " + DeskPhone);
   
   if (!MobilePhone.nil())
    template.print("<br><b>Mobile Phone</b> - " + MobilePhone + "</p></span>");
  }
  else
   template.print("<span><p><p style='font-family: calibri; font-size: 14.5px'><b>" + item.getLabel() + "</b> - " + item.getDisplayValue() + "</p></span>");
}
}
template.print("<p><p style='font-family: calibri; font-size: 14.5px'><b>Urgency</b> - " + current.urgency.getDisplayValue() + "</p>");
template.print("<p><p style='font-family: calibri; font-size: 14.5px'><b>Priority</b> - " + current.priority.getDisplayValue() + "</p>");
