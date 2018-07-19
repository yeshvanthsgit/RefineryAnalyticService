

var app = angular.module('UAE', [ 'ngCookies', 'ngResource', 'ngSanitize',
		'ngRoute' ]);

app.directive('fileModel', [ '$parse', function($parse) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};

} ]);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : '/html/Dashboard.html',
		controller : 'DashboardController'
	}).when('/UploadFile', {
		templateUrl : '/html/UploadFile.html',
		controller : 'UploadFileController'
	}).when('/UpdateRefinery', {
		templateUrl : '/html/UpdateRefinery.html',
		controller : 'UpdateRefineryController'
	}).otherwise({
		redirectTo : '/'
	})
});



app.controller('DashboardController', function($scope, $http) {
	
init  =  function() {
	
    $http.get('/refinery/fetchData/TestDB/Region').success(function (response, status) {
    	 
   
        
        var data = [];  
       
       if(response==""){
    	$("#noDataDiv").css("display","block") ; 
    	$("#dashboardDiv").css("display","none") ; 
    	   return; }
       
       else {
       	$("#noDataDiv").css("display","none") ; 
    	$("#dashboardDiv").css("display","block") ;
       }
    	   /*
   		$(".modal-header").removeClass("alert-success");
		$(".modal-header").addClass("alert-danger");
		$('.modal-body')
				.html("No Data Found !! Please upload the required files and run the model again");

		$('#fileModal').modal("show");
		return;
       */
       
       
        response.forEach(function(a){
        	
/*        	var regionData = {};
        	var newKey;
            for (var key in a) {
            	newKey = key.replace(/_/g,'').toUpperCase();
            	regionData[newKey] = a[key];
               
                }*/
            console.log(a);
        	
            var serie = { name: a["Region_Name"], y: 10, drilldown: a["Region_Name"], type :"Region"}; 

          for (var key in a) {
          if (a.hasOwnProperty(key)) {
          serie[key] = a[key];
          }
          }

            if(a['Calculated_Region_Performance'].toLowerCase()  == "GOOD".toLowerCase() ) {
              serie.color="green";
            }
            else if(a['Calculated_Region_Performance'].toLowerCase()  == "AVERAGE".toLowerCase()){
              serie.color="yellow";
            }

            else if(a['Calculated_Region_Performance'].toLowerCase()  == "BAD".toLowerCase()){
                serie.color="red";
            }

            data.push(serie); 

        });
        
        regionPoint = Object.assign({}, data[0]);

        
      regionPieData = data; 
      

        BindChart(data);  
    
    }).error(function (response, status) {
    	$("#noDataDiv").css("display","block") ; 
		$(".modal-header").removeClass("alert-success");
		$(".modal-header").addClass("alert-danger");
		$('.modal-body')
				.html("Oops Something Went Wrong !! <br/> HTTP STATUS CODE : " + status);

		$('#fileModal').modal("show");
    })	;
};	
	
	
init();	
	
	
	
	
});

app.controller(
				'UploadFileController',
				function($scope, $http) {
					$scope.uploadResult = "";

					$scope.myForm = {
						description : "",
						files : []
					}

					init = function() {
						$scope.enabledAnalyzeButton = false;
					};

					$scope.doUploadFile = function() {

						var url = "/refinery/saveData";

						var data = new FormData();
						
					
						if($scope.myForm.files[0] == undefined || $scope.myForm.files[1] == undefined){
							$(".modal-header").removeClass("alert-success");
							$(".modal-header").addClass("alert-danger");
							$("#exampleModalLongTitle").html("Testing and Training Data Set(s)");
							$('.modal-body').html("All the required Data Set(s) have not been uploaded. Please upload both the files and try again.");

					$('#fileModal').modal("show");	
					return;
							
						}
						
						$("#loader").attr("data-text","Uploading...");
						$("#loader").addClass("loader loader-bar is-active");
						
						data.append("file1", $scope.myForm.files[0]);
						data.append("file2", $scope.myForm.files[1]);

						var config = {
							transformRequest : angular.identity,
							transformResponse : angular.identity,
							headers : {
								'Content-Type' : undefined
							}
						}

						$http
								.post(url, data, config)
								.then(
										// Success
										function(response) {
											
											$scope.enabledAnalyzeButton = true;
											$("#loader").attr("data-text","");
											$("#loader").removeClass("is-active");
											$(".modal-header").removeClass("alert-danger");
											$(".modal-header").addClass("alert-success");
											$("#exampleModalLongTitle").html("Testing and Training Data Set(s)");
											$('.modal-body')
													.html(
															"Testing and Training Data Set(s) have been uploaded successfully !! <br/>"
																	+ "Please click on Run Model button to analyze the data.");

											$('#fileModal').modal("show");
										},
										// Error
										function(response) {
											$("#loader").attr("data-text","");
											$("#loader").removeClass("is-active");
											$(".modal-header").removeClass("alert-success");
											$(".modal-header").addClass("alert-danger");
											$("#exampleModalLongTitle").html("Testing and Training Data Set(s)");
											$('.modal-body').html("Something went wrong ! Please check the logs.");
											
											$scope.enabledAnalyzeButton = false;
											$("#file0").val("");
											$("#file0Path").html("");
											$("#file1").val("");
											$("#file1Path").html("");

									$('#fileModal').modal("show");
										});
					};
					
					
					
					$scope.analyzeModel = function() {
						var url = "http://ushydykumarbar1:8080/runModal";

						var data = "";
						
						$("#loader").attr("data-text","Running Model...");
						$("#loader").addClass("loader loader-bar is-active");

						$http
								.get(url, data)
								.then(
										// Success
										function(response) {
											
											$("#loader").attr("data-text","");
											$("#loader").removeClass("is-active");
											$(".modal-header").removeClass("alert-danger");
											$(".modal-header").addClass("alert-success");
											$("#exampleModalLongTitle").html("Testing and Training Data Set(s)");
											$('.modal-body')
													.html("Model has successfully been run. Please go to the Dashboard to see the result.");

											$('#fileModal').modal("show");
										},
										// Error
										function(response) {
											
											$("#loader").attr("data-text","");
											$("#loader").removeClass("is-active");
											$(".modal-header").removeClass("alert-success");
											$(".modal-header").addClass("alert-danger");
											$("#exampleModalLongTitle").html("Testing and Training Data Set(s)");
											$('.modal-body').html("Something went wrong ! Please check the logs.");

									$('#fileModal').modal("show");
										});
					};
					
					init();
				});

app.controller('UpdateRefineryController', function($scope, $http) {
	
	init = function() {
		$scope.enabledAnalyzeButton = false;
	}();
	
	
	$scope.searchRefineryData = function() {

		var url = "/refinery/fetchRecord/TestDB/Refinary/Refinery_Name/"+$scope.refinery;
		var data="";
		$scope.enabledAnalyzeButton = false;
		
		
		$scope.performance = [{name :"GOOD"}, {name :"AVERAGE"}, {name :"BAD"}];
		
		$scope.isColDisabled = refineryColumnIsDisabledList;
		
		$("#loader").attr("data-text","Searching...");
		$("#loader").addClass("loader loader-bar is-active");

		$http
				.get(url, data)
				.then(
						// Success
						function(response) {

							$scope.refineryModal=response.data[0]; 
							
							$("#loader").attr("data-text","");
							$("#loader").removeClass("is-active");
							
							
							if(undefined == response.data[0]){
								
								$(".modal-header").removeClass("alert-success");
								$(".modal-header").addClass("alert-danger");
								$("#exampleModalLongTitle").html("Refinery Data");
								$('.modal-body').html("Result Not Found ! Please check the search data and try again.");

						$('#fileModal').modal("show");	
						return;	
								
								
								
							}
							
						},
						// Error
						function(response) {
							
							$("#loader").attr("data-text","");
							$("#loader").removeClass("is-active");
							$(".modal-header").removeClass("alert-success");
							$(".modal-header").addClass("alert-danger");
							$("#exampleModalLongTitle").html("Refinery Data");
							$('.modal-body').html("Something went wrong. Please check the logs.");

					$('#fileModal').modal("show");
						});
	};
	
	
	$scope.updateRefineryData = function() {
		
		var url = "/refinery/updateRecord/TestDB/Refinary";
		var data = {};
		data =$scope.refineryModal;
		console.log(data)
		for(key in data){
			if("good" == data[key] || "average" == data[key] || "bad" == data[key]){
			data[key] = data[key].toUpperCase();
			}
		}
		
		console.log(data);
		
		var id = data["_id"]["$oid"];
		data["id"] = id;
		
		$("#loader").attr("data-text","Updating...");
		$("#loader").addClass("loader loader-bar is-active");

		$http
				.post(url, data)
				.then(
						// Success
						function(response) {
							$scope.enabledAnalyzeButton = true;
							
							$("#loader").attr("data-text","");
							$("#loader").removeClass("is-active");
							
							$(".modal-header").removeClass("alert-danger");
							$(".modal-header").addClass("alert-success");
							$("#exampleModalLongTitle").html("Refinery Data");
							$('.modal-body')
									.html(
											"Refinery Data has been updated successfully !! <br/>"
													+ "Please click on Run Model button to analyze the data.");

							$('#fileModal').modal("show");
							
							
						},
						// Error
						function(response) {
							
							$("#loader").attr("data-text","");
							$("#loader").removeClass("is-active");
							
							$(".modal-header").removeClass("alert-success");
							$(".modal-header").addClass("alert-danger");
							$("#exampleModalLongTitle").html("Refinery Data");
							$('.modal-body').html("Something went wrong. Please check the logs.");

					$('#fileModal').modal("show");
						});
	};
	
	
	$scope.analyzeModel = function() {
		var url = "http://ushydykumarbar1:8080/runModal";

		var data = "";
		
		$("#loader").attr("data-text","Running Model...");
		$("#loader").addClass("loader loader-bar is-active");

		$http
				.get(url, data)
				.then(
						// Success
						function(response) {
						
							$("#loader").attr("data-text","");
							$("#loader").removeClass("is-active");
							$(".modal-header").removeClass("alert-danger");
							$(".modal-header").addClass("alert-success");
							$("#exampleModalLongTitle").html("Refinery Data");
							$('.modal-body')
							.html("Model has successfully been run. Please go to the Dashboard to see the result.");

							$('#fileModal').modal("show");
						},
						// Error
						function(response) {
							
							$("#loader").attr("data-text","");
							$("#loader").removeClass("is-active");
							$(".modal-header").removeClass("alert-success");
							$(".modal-header").addClass("alert-danger");
							$("#exampleModalLongTitle").html("Refinery Data");
							$('.modal-body').html("Something went wrong ! Please check the logs.");

					$('#fileModal').modal("show");
						});
	};
	
});