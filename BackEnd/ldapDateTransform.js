answer = (function transformEntry(source) {

    if (source.u_accountexpires != '0' && !source.u_accountexpires.nil() && source.u_accountexpires != '9223372036854775807') {
        var gdt;
        var dtu = new DateTimeUtils();
        gdt = dtu.int8ToGlideDateTime(source.u_accountexpires);
        target.u_account_expires = gdt;
    } else {
        target.u_account_expires = '';
    }
	return '';

})(source);
