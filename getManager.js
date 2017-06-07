getManager: function (array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].indexOf('Supervisor Employee Number:') > -1) {
			i = i + 2;
			var mNumber = array[i].toString();
			mNumber = mNumber.trim();
			this.log('getManager: ' + mNumber);
			var manager = new GlideRecord('sys_user');
			manager.get('employee_number', mNumber);
			this.log('getManager: ' + manager.sys_id.toString());
			return manager.sys_id.toString();
		}
	}
}
