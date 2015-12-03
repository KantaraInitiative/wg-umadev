/**
 * Created by kfgonzal on 11/19/2015.
 */

app.controller('homeController', function($scope, $location){
    $scope.navigateToTests = function(){
        $location.path('/tests');
    };

    $scope.navigateToExampleRS = function(){
        $location.path('/exampleRS');
    };
});