function order_guide ($scope, $location, $http, $anchorScroll) {
	$scope.data.orderguide = "com.glideapp.servicecatalog_cat_item_guide_view.do?v=1&sysparm_initial=true&sysparm_guide=" + $scope.data.sys_id;

	/* 
	*	Fix for long order guides not focusing back to top of screen
	*	Check if the #guide_tabs element exists (loads on second screen of OG). 
	*   If so, scroll to top of screen
	*	
	*/
	var checkExists = setInterval (function () {
		if (jQuery('#og_iframe').contents().find('#guide_tabs').length) {
			var id = $location.hash();
			$location.hash('sc_order_guide');
			$anchorScroll();
			$location.hash(id);
			clearInterval(checkExists);
		}		
	}, 100);
		
}
