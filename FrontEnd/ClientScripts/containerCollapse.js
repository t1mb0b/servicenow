/*
https://community.servicenow.com/community?id=community_question&sys_id=558a1484db32bf4023f4a345ca961935
*/

function onLoad () {
	var $ = this.jQuery,
		fieldName = "requested_for"; // !!! it's the name of any variable from variable set !!!

	setTimeout(function () {
		var $fieldset = $("#sp_formfield_" + fieldName).closest("fieldset"),
			$row = $fieldset.children("div.row"),
			$button = $("<button style='margin-right:10px;margin-bottom:2px;' class='btn btn-icon'>" +
						"<i class='fa fa-minus fa-lg'></i></button>");

		$fieldset.find("legend") // find(">div>legend")
			.prepend($button);

		$button.click(function () {
			$row.toggle();
			$button.find("i")
				.toggleClass("fa-plus fa-minus");
		});
	}, 0);
}
