var itemType = new GlideRecord('sc_cat_item');
	if(itemType.get(data.sys_id)){
		//gs.addInfoMessage("We have a match 1 " + itemType.sys_class_name + "|" + data.sys_id);
		var catItem = new GlideRecord(itemType.sys_class_name);
		if (catItem.get(itemType.sys_id)) {
			if (catItem.u_attachment_required == true) {
				//gs.addInfoMessage("We have a match " + itemType.sys_class_name + "|" + itemType.sys_id);
				data.required_attachment = true;
				data.not_attached = false;
			}
		}
	}
