/**
 * Created by kfgonzal on 11/2/2015.
 */

app.controller('testResourceSetRegistrationController', function($scope, $location, testRSReg){

    $scope.createResults = testRSReg.getCreateResults();

    $scope.updateResults = testRSReg.getUpdateResults();

    $scope.readResults = testRSReg.getReadResults();

    $scope.deleteResults = testRSReg.getDeleteResults();

    $scope.listResults = testRSReg.getListResults();

    $scope.returnHome = function(){
        testRSReg.clearResults();
        $location.path('/');

    };

});