var BetterGlideFilter = {
    checkRecord: function (b, c) {
        var a = new GlideRecord(b.getTableName());
        a.addQuery(c);
        a.addQuery("sys_id", "!=", b.getValue("sys_id"));
        a.setLimit(1);
        a.query();
        return a.hasNext()
    }
};