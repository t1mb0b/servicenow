function onLoad() {
    
    var isOrderGuide = false;
    var item;
    var guide;

    if (window) {
        guide = g_form.getParameter('sysparm_guide');
        if (guide)
            item = g_form.getParameter('sysparm_active') ||
                g_form.getParameter('sysparm_guide');
        else
            item = g_form.getParameter('sysparm_id');
        if (item && guide && item != guide)
            isOrderGuide = true;
    } else {
		var isSPOrderGuide;
		try {
			// Only works in SP
			isSPOrderGuide = g_service_catalog.isOrderGuide();
		}
		catch (err) {}
        isOrderGuide = isSPOrderGuide ? true : false;
        item = g_form.getSysId();
    }
    
    if (isOrderGuide) {
        //do stuff
    }

}