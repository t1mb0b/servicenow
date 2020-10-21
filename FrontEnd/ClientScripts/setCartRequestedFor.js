function onChange(control, oldValue, newValue, isLoading) {
   if (newValue){
          var gr = new GlideRecord('sc_cart');
          gr.addQuery('user', g_user.userID);
          gr.query();
          gr.next();
          gr.requested_for = newValue;
          gr.update();
    }
}
