var CatAjaxUtils = Class.create();
CatAjaxUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	
	/* Function to get user's Phone number */
	
	getPhoneNumber : function() {
		var callerId = this.getParameter('sysparm_caller_id');
		//gs.log("TM===> Getting phone record for " + callerId);
		var gsp = new GlideRecord('sys_user');
		gsp.addQuery('sys_id', callerId);
		gsp.query();
		if(gsp.next()){
			return gsp.phone;
		}
	},
	
	/* Function to get user's Employee Level */
	
	getUserLevel : function() {
		var userID = this.getParameter('sysparm_userID');
		//gs.log("TM===> Getting user record for " + userID);
		var gsp = new GlideRecord('sys_user');
		gsp.addQuery('sys_id', userID);
		gsp.query();
		if(gsp.next()){
			return gsp.u_employee_level;
		}
	},
	
	/* Function to get user's Location */
	
	getLocation : function() {
		
	},

	/* Function to get the current catalogue item name */
	
	getCatItemName : function() {
		var cgr = new GlideRecord('sc_cat_item');
		var catItemID = this.getParameter('sysparm_cat_item_id');
		//gs.log("TM===> Getting name for " + catItemID, "Q: getCatItemName Ajax");
		if(cgr.get(catItemID)){
			return cgr.name;
		}
	},
	
	/* Function to get the stock room */
	
	getStockRoom : function() {
		var gsr = new GlideRecord('alm_stockroom');
		gsr.addQuery('name', 'Computer Inventory');
		gsr.query();
		if(gsr.next()){
			return gsr.sys_id;
		}
	},
	
	/* 
		Check if user is memeber of specified group 
	    Groupname is passed on client side
	   
	    var ga = new GlideAjax('GrahamAjaxUtils');
		ga.addParam('sysparm_name', 'isGrpMember');
		ga.addParam('sysparm_userID', g_user.userID);
		ga.addParam('sysparm_groupName', 'XXXXX');
	   
	*/
	
	isGrpMember : function() {
	var userID = this.getParameter('sysparm_userID');
	var groupName = this.getParameter('sysparm_groupName');
	var thisUser = gs.getUser().getUserByID(userID);
	//gs.log("TM ===> " + thisUser + " | " + groupName, "Q: isGrpMember Ajax"); 
		if (thisUser.isMemberOf(groupName)) {
		return true; 
		} else {
		return false;
		}
		
	},
	
	type: 'CatAjaxUtils'
});
