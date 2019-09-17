var timTaskStateUtils = Class.create();
timTaskStateUtils.prototype = Object.extendsObject(TaskStateUtil, {

	ATTR_DEFAULT_RESOLVED : "default_resolved_state",
	SYSTEM_DEFAULT_RESOLVED : 6, // task resolved state
	ATTR_DEFAULT_ON_HOLD : "default_on_hold_state",
	SYSTEM_DEFAULT_ON_HOLD : 99, // task resolved state

	initialize : function(/*GlideRecord*/ task) {
		
		TaskStateUtil.prototype.initialize.call(this, task);

		this.task = task;

		if (!task || !task.isValidRecord())
			if (!task.isNewRecord())
				return;

		this.stateElement = task.getElement('state');

		// get optional attributes or use default values
		this._getDefaultResolved();
		this._getDefaultOnHold();

	},

	/*
    * Get the value for the default work state, defaults to 2 if not specified
    * @return int
    */
	getDefaultResolvedState : function() {
		return this.defaultResolved;
	},
	
	getDefaultOnHoldState : function() {
		return this.defaultOnHold;
	},

	_getDefaultOnHold : function() {
		var value = this.stateElement.getAttribute(this.ATTR_DEFAULT_ON_HOLD);
		if (value)
			this.defaultOnHold = value;
		else
			this.defaultOnHold = this.SYSTEM_DEFAULT_ON_HOLD;
	},

	type: 'timTaskStateUtils'
});
