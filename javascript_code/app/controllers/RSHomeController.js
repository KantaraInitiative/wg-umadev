/**
 * Created by kfgonzal on 10/26/2015.
 */


// For an example RS front end, in order to invoke requesting protection.
// I would think for a medical device, it would probably just be covered with device setup, or on application begin
app.controller('RSHomeController', function($scope, $location, $timeout, protectionReq, rSOwnerImitationDatabase, RSOwner, testRSReg){
    // Fake resource Owner
    // TODO: Actual data would be retrieved from a DB by key of logged in client_id
    // or just all users depending on if automatically protecting all server's resources
    var RSOwner1 = new RSOwner({
        "id": "1234",
        "name": "Jon Snow",
        "PAT": ""
    });

    // Fake resource Owner
    // Actual data would be in a DB
    var RSOwner2 = new RSOwner({
        "id": "56789",
        "name": "Daenerys Targaryen",
        "PAT": ""
    });

    // Add owners to fake "DB"
    rSOwnerImitationDatabase.addRSOwner(RSOwner1);
    rSOwnerImitationDatabase.addRSOwner(RSOwner2);

    // Fake resource Owner id, actual use logged in users_id
    // or all RSOwners ID if automatically implemented protection for all users.
    $scope.rsOwner = rSOwnerImitationDatabase.getRSOwnerById("1234");

    $scope.protectResources = function() {
        // Request a PAT for this RSOwner
        protectionReq.requestProtectionAPIToken($scope.rsOwner); // Protect this RSOwner's resources with UMA
        // TODO: Should just register all resources right away, or wait for a request? Both?
    };

    $scope.testResourceReg = function(){
        testRSReg.runTest();
        var delayedPath = function(){
            $location.path('/testResReg');
        };
        // A little delay small enough to catch up $scope data from test results
        $timeout(delayedPath, 1);
    };

    $scope.viewReports = function(){
      $location.path('/viewReports');
    };
});