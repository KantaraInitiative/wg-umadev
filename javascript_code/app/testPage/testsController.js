/**
 * Created by K-Gonzalez on 11/19/2015.
 */

app.controller('testsController', function($scope, $location){
    $scope.testResourceReg = function(){
        $location.path('/testResReg');
    };

    $scope.returnHome = function(){
        $location.path('/');
    };
});