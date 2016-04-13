/**
 * Created by K-Gonzalez on 10/26/2015.
 */


// For an example RS front end, in order to invoke requesting protection.
// I would think for a medical device, it would probably just be covered with device setup, or on application begin
app.controller('RSHomeController', function($scope, $location, $timeout, protectionReq, rSOwnerImitationDatabase){
    console.log('in default should go to RSHome');
    // Fake resource Owner id, actual use logged in users_id
    // or all RSOwners ID if automatically implemented protection for all users.
    $scope.rsOwner = rSOwnerImitationDatabase.getRSOwnerById('1234');
    $scope.show = false;
    $scope.protectResources = function() {
        // Request a PAT for this RSOwner
        protectionReq.requestProtectionAPIToken($scope.rsOwner).then(
            function(response){
                $scope.rsOwner.setPAT(response.data['access_token']);
                $scope.show = true;
            },
            function(err){
                // This really should have already failed safely inside main method
                console.log("ERROR: Cannot gain a protection API token. ERROR msg: ");
            }); // Protect this RSOwner's resources with UMA
            // TODO: Up to RS whether they immediately register all resource sets or handle dynamically
            // I have not done either in this app example, yet
    };

    $scope.PAT = $scope.rsOwner.getPat();
    $scope.viewReports = function(){
      $location.path('/viewReports');
    };

    $scope.returnHome = function(){
        $location.path('/');
    };
});