/* Hide the back button when the iFrame Loads */
document.querySelector('#og_iframe').onload = function(){
	jQuery('#og_iframe').contents().find('#back_button_in_header').hide();
};
