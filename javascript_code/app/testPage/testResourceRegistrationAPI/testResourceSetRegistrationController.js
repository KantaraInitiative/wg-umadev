/**
 * Created by K-Gonzalez on 11/2/2015.
 */

app.controller('testResourceSetRegistrationController', function($scope, $location, $timeout, testRSReg){
    $scope.testResources = testRSReg.getTestResources();

    $scope.createdResults = testRSReg.getCreatedResults();

    $scope.readCreatedResults = testRSReg.getReadCreatedResults();

    $scope.listCreatedResult = testRSReg.getListCreatedResult();

    $scope.updateResult = testRSReg.getUpdateResult();

    $scope.readUpdateResult = testRSReg.getReadUpdateResult();

    $scope.deleteResult = testRSReg.getDeletedResult();

    $scope.listAfterDeleteResult = testRSReg.getListAfterDeleteResult();

    $scope.return = function(){
        testRSReg.clearResults();
        $location.path('/tests');
    };

});