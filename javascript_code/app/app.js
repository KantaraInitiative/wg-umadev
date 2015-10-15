/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';    

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
    console.log($routeProvider);
    console.log("RouteProvider - app.config");
    $routeProvider.
        when('/',{
            templateUrl: 'templates/restTest.html',
            controller:  'restTestController'
        }).
        otherwise({
            redirectTo: '/'
        });
});

// Just a controller to handle the html page I have testing I am properly making calls
app.controller('restTestController', function($scope, $http) {
    $scope.testDisplay = "This is just a string to test two-way binding";
    $scope.success = "";
    $scope.error = "";

    $scope.getSuccessTest = function(){

        var req = {
            method: "GET",
            url: "http://localhost:63342/wg-umadev/javascript_code/app/test.html"
        };


        $http(req).then(
            function(response){ //success
                $scope.success = response.data["testString"];
            },
            function(response){ // error
                $scope.error = response.status + " " + response.statusText;
            },
            function(response){ // notify
                //
            });

    };

    $scope.getErrorTest = function(){

        var req = {
            method: "GET",
            url: "http://localhost:63342/wg-umadev/javascript_code/app/badURL"// Force a 404
        };

        $http(req).then(
            function(response){
                $scope.success = response.data;
            },
            function(response){
                $scope.error = response.status + " " + response.statusText;
            },
            function(response){
                //
            });
    };

});
