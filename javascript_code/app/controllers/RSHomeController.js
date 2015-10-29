/**
 * Created by kfgonzal on 10/26/2015.
 */


// For an example RS front end, in order to invoke requesting protection.
// I would think for a medical device, it would probably just be covered with device setup, or on application begin
app.controller('RSHomeController', function($scope, $location, protectionReq, RSOwner){
    // Fake resource Owner
    // Actual data would be in a DB
    var RSOwnerJSON = {
        "id": "23456789",
        "name": "Client 1",
        "PAT": ""
    };
    $scope.rsOwner = new RSOwner(RSOwnerJSON); // Fake resource Owner

    $scope.protectResources = function() {
        // Get a PAT for this RS user
        protectionReq.getPAT($scope.rsOwner); // Protect this RSOwner's resources with UMA
        // TODO: Should just register all resources right away, or wait for a request? Both?
    };

    $scope.viewReports = function(){
      $location.path('/viewReports');
    };
});