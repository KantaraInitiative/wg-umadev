/**
 * Created by K-Gonzalez on 11/19/2015.
 */

app.controller('homeController', function($scope, $location, ASEndpoints){
    ASEndpoints.getConfig();

    $scope.navigateToTests = function(){
        $location.path('/tests');
    };

    $scope.navigateToExampleRS = function(){
        $location.path('/exampleRS');
    };
});