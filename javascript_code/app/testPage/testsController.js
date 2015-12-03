/**
 * Created by kfgonzal on 11/19/2015.
 */

app.controller('testsController', function($scope, $location, testRSReg){
    $scope.testResourceReg = function(){
        testRSReg.testResReg();
        $location.path('/testResReg');
    };

    $scope.returnHome = function(){
        $location.path('/');
    };
});