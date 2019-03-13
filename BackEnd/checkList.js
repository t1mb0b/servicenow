// Business Rule
// condition
new CatalogUtils().hasChecklist(current.getUniqueValue()) && current.state.changesTo('3')
// script
(function executeRule(current, previous /*null when async*/ ) {

    var catUtils = new CatalogUtils();
    if (catUtils.hasUncheckedItems(current.getUniqueValue())) {
        gs.addInfoMessage('Please close tasks');
        current.setAbortAction(true);
    }

})(current, previous);

// invoke from workflow catalog task- use setNewGuid() to get the task sys_id
// can also use taskId = task.insert(), which returns the sys_id of the task
var listTemplate = catUtils.getChecklistTemplate('Setup New Hire Access');
catUtils.generateChecklist(listTemplate, task.getTableName(), task.setNewGuid());

// invoke from BR
(function executeRule(current, previous /*null when async*/ ) {
    var task = current.getUniqueValue();
    var table = current.getTableName();
    var template = catUtils.getChecklistTemplate('Sample Checklist'); //PUT YOUR CHECKLIST NAME HERE
    catUtils.generateChecklist(template, table, task);
})(current, previous);

// Methods
getChecklistTemplate: function (name) {
    var grTemplate = new GlideRecord('checklist_template');
    grTemplate.get('name', name);
    return grTemplate.template;
}

generateChecklist: function (template, table, task) {
    var itemObj = JSON.parse(template);
    var checklistId = '';

    var grList = new GlideRecord('checklist');
    grList.addQuery('document', String(task));
    grList.addQuery('table', String(table));
    grList.query();
    if (!grList.next()) {
        grList.setValue('document', String(task));
        grList.setValue('name', itemObj.name);
        grList.setValue('owner', itemObj.owner);
        grList.setValue('table', String(table));
        checklistId = grList.insert();
        itemObj.items.forEach(function (item) {
            var grItem = new GlideRecord('checklist_item');
            grItem.setValue('checklist', checklistId);
            grItem.setValue('complete', false);
            grItem.setValue('name', item.name);
            grItem.setValue('order', item.order);
            grItem.insert();
        });
    }
}

hasUncheckedItems: function (taskId) {
    var listGr = new GlideRecord('checklist');
    if (listGr.get('document', taskId)) {
        var itemGr = new GlideRecord('checklist_item');
        itemGr.addQuery('checklist', listGr.getUniqueValue());
        itemGr.addQuery('complete', false);
        itemGr.query();
        if (itemGr.hasNext()) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

hasChecklist: function (task) {
    var listGr = new GlideRecord('checklist');
    if (listGr.get('document', String(task))) {
        return true;
    }
    return false;
}