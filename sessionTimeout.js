/* GLobal UI Script */

function onLoad() {
    document.observe("dom:loaded", function() {
        var timeout = g_scratchpad.timeout;
        setTimeout(function() {alert('Your ServiceNow session will be logged out in 5 minutes');},60000*(timeout-5));
    });
}

/* Display BR */

g_scratchpad.timeout=gs.getProperty('glide.ui.session_timeout');
gs.log("timeout: " + gs.getProperty('glide.ui.session_timeout'));
