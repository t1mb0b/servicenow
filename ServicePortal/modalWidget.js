/*###########################################
 Parent Widget 
 ## Server script
 STEP 1 )) this code runs in the server code for the header widget and is used to calculate if the user shoul see the child widget 
*/
data.childWidget = $sp.getWidgetFromInstance(widgetSysId); // where is widgetsysid identified? otherwise this might be... undefined
/*
 
 STEP 2 ))  this code creates the widget within the parent widget and allows us access ChangeField 
 the job of change field is to take the input from the child widget and pass it back to server 
 // 1) this code is run in the header makes the code available for us to use 
 pull widget in to header 
 */ 
 	c.createWidget = function(widget) {
		
		spUtil.get("my-custom-widget", "").then(function(response) {				
			
			c.widgetToCreate = response;		
			//c.closeButtonName = widget.closeButtonName;
			
			c.modalInstance = $uibModal.open({
				templateUrl: 'impTemp',
				scope: $scope,
				buttons: [],
				size: 'lg'
			})
			
			
            // I think to make this work I need this code on  child widget but when it is there its never triggered
        
			$scope.changeField = function(value, action){
				c.data.val = value.val;
				c.data.action = action;
				//alert(value.val);
				//c.server.update().then(function(){
				spUtil.update($scope).then(function(){
					c.data.action = undefined;//reset action
					//$window.location.reload(true); //this needs to happen to appy the changed values
				});
			};
             /* try this */
            $scope.testScript = function(){
                c.data.test = new Date();
                c.server.update();
            }
            /* end this try */	
		}
																									
																									
			
	)};
/*

###########################################
 Child widgeet  Widget 
 
 STEP 3 ))  the below sever code will be the GlideRecord to update the value based on the users input but is never tiggered
 			if this code put in the server code fot the parent widget it works - and here lise the problem. 
 
 ### Server code
*/ 
 
	if(input){
      gs.addErrorMessage(JSON.stringify(input))
    }

/*

 STEP 4 ))  a drop down box to capture user input 
## ng-template
*/
  <div class="panel-body card-body">
    <!-- start this try -->
    <input 
      ng-change="testScript()"
    />
    <div>c.data.test: ${c.data.test}</div>
    <div>c.data.childWidget.data.test: ${c.data.childWidget.data.test}</div>
    <!-- end this try -->
    <div class="row">
     	class="custom-form-control"
		ng-model="c.data.childWidget.data.val" 
  		ng-options="x.label for x in data.childWidget.data.values"
 	 	ng-change="changeField(c.data.childWidget.data.val, 'changeval')">
	</select>
    </div>
    </div>
  </div>
