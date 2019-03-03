//OLD
if (newVal === 3 || newVal === 4 || newVal === 7) {
  mform.setMandatory('resolution_code', true);
  mform.setMandatory('resolution_detail', true);
  mform.setMandatory('service_date', true);
} else {
  mform.setMandatory('resolution_code', false);
  mform.setMandatory('resolution_detail', false);
  mform.setMandatory('service_date', false);
}
//REFACTORED
// Capture closure states into its own array
var closureStates = [3, 4, 7];
// Verify the current state is one of the closure states
var requiresClosureFields = newState.indexOf(closureStates) > -1;
// Capture fields to mandate on closure into its own array
var closureFields = ["resolution_code", "resolution_detail", "service_date"];
// Now we can write generic code to set mandatory state on resolution fields based on resolution state
for (var cf = 0; cf < closureFields.length; cf++) {
  var thisClosureField = closureFields[cf];
  mform.setMandatory(thisClosureField, requiresClosureFields);
}