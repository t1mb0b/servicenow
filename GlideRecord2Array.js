function activeValue() {
  var appAray = [];
  var u_app_mod = new GlideRecord('u_app_mod');
  u_app_mod.addQuery('u_active', 'true');
  u_app_mod.query();
  while (u_app_mod.next()) {
    appAray.push(u_app_mod.getValue('u_application'));
  }
  return appAray.join(',');
}