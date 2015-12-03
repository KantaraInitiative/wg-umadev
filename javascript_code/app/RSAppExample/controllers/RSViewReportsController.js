/**
 * Created by kfgonzal on 10/26/2015.
 */

/* Just an example to display resource set information to the user and to show API functionality.
 * Actual modifications to resources on a medical device would more than likely happen automatically
 * each time there is a new report, or on nightly runs to determine deletion/archiving of "outdated" reports,
 * any updates needed etc.
*/
app.controller('RSViewReportsController', function($scope, $location, resourceSetImitationDatabase) {

    $scope.reports = resourceSetImitationDatabase.getAllResourcesOfClient('1234'); // Fake user ID as input

    $scope.return = function(){
      $location.path('/exampleRS');
    };

    $scope.openReport = function(){
      // Just a fake method
    };
});