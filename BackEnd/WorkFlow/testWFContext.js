var workflowContextSysId = 'SYS_ID';
var workflowContext = new GlideRecord('wf_context');
if (workflowContext.get(workflowContextSysId)) {
  var current = new GlideRecord(workflowContext.getValue('table'));
  current.get(workflowContext.getValue('id'));
  var workflow = {
    scratchpad: JSON.parse(workflowContext.getValue('scratchpad'))
  };

  try {
    // paste your code below here

    // paste your code above here
  } catch (error) {
    gs.info(error.message, 'fix script ' + gs.getUserName());
  }
}
