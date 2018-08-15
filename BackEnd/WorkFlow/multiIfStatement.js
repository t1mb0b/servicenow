workflow.scratchpad.result = ifScript();

function ifScript() {
	var result = {desk:false, mobile:false, byod:false, activation:false};
		
		if (workflow.scratchpad.desk == 'true') {
			result.desk = true;
		}
		if (workflow.scratchpad.mobile == 'true') {
			result.mobile = true;
		}
		if (workflow.scratchpad.byod == 'true') {
			result.byod = true;
		}
		if (workflow.scratchpad.activation == 'true') {
			result.activation = true;
		}
		if (!(result.desk || result.mobile || result.byod || result.activation)) {
			result.none = true;
		}
		
		//gs.log('---> ' + result.desk + ',' + result.mobile + ',' + result.byod,
		  // 'Playing With the If Activity.Validate Trigger');
		return result;
	}
  
  
  =====
  
  Branch:
  
  workflow.scratchpad.result.x == true
  Check 'skip during generate'
