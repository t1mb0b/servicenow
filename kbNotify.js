baseUrl = gs.getProperty("glide.servlet.uri");
   var gr = new GlideRecord("kb_knowledge");
   gr.addEncodedQuery("workflow_state=draft^sys_updated_onRELATIVELE@dayofweek@ago@30");
   gr.orderByDesc('updated');
   gr.setLimit(99);
   gr.query();
   if (gr.getRowCount() > 0) {
      template.print("");
      while (gr.next()) {
         template.print(gr.getDisplayValue('number') + " - <a href='" + baseUrl + "nav_to.do?uri=kb_knowledge.do%3Fsys_id%3D" + gr.getValue('sys_id') + "'>" + gr.short_description + "</a><hr />");
