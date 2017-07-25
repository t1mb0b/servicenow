//Great Scott! -- This is heavy!

var startTime = source.u_opened + '';
var tz = Packages.java.util.TimeZone.getTimeZone('GMT');
var OUTATIME = new GlideDateTime(); 
OUTATIME.setTZ(tz);
OUTATIME.setValue(startTime);

var utz = gs.getSession().getTimeZone();
OUTATIME.setTZ(utz);
var timeZoneOffSet = OUTATIME.getTZOffset();  
OUTATIME.setNumericValue(OUTATIME.getNumericValue() + timeZoneOffSet);  

//gs.info('tmap returning time:'+gdt+' with offset of:'+timeZoneOffSet);
return OUTATIME;
