(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
  /* Setup the Parent Object	*/
	var opsOffice = {
		E: 'Echo Office',
		C: 'Charlie Office',
		K: 'Kilo Office',
		V: 'Victor Office',
		S: 'Sierra Office'
	};

	/* Grab the first letter */
	var namePrefix = source.u_name.substring(0, 1);

	/* Iterate through the object and set the parent */
	if (source.u_type == 'Project') {
		//gs.log("TM===> We have a Project");
		for (var key in opsOffice) {
			if (!opsOffice.hasOwnProperty(key)) {
				continue;
			}
			if (namePrefix === key) {
				target.parent.setDisplayValue(opsOffice[key]);
				//gs.log("TM===> Setting Parent to " + opsOffice[key] );

			}
		}
	}
	/* Set Street Value */
	target.street = source.u_address_line_1 + '\n' + source.u_address_line_2;


}(source, map, log, target));