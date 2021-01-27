function onLoad() {
   //Type appropriate comment here, and begin script below
	spModal.open({
		title: "Confirmation",
		message: "Have you already submitted this?",
		buttons: [
                {label:'✘ No', cancel: true},
                {label:'✔ Yes', primary: true}
            ]
	}).then(function(name){
		alert(JSON.stringify(name));
	});
}
