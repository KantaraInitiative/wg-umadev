/**
 * Created by kfgonzal on 10/26/2015.
 */

/* Just an example to display resource set information to the user and to show API functionality.
 * Actual modifications to resources on a medical device would more than likely happen automatically
 * each time there is a new report, or on nightly runs to determine deletion/archiving of "outdated" reports,
 * any updates needed etc.
*/
app.controller('RSViewReportsController', function($scope, $location, ResourceSet) {

    // Actual resource Sets would be from a DB pulled by rsid after getting list of rsids from AS
    // and objects compiled from JSON
    // (Maybe store RSOwner ID with ResourceSet instead of requesting list of rsids but what is less cost effective?)
    var exampleResourceSetJSON1 = new ResourceSet({
        "date": "05/05/2105",
        "name": "CPAP Monthly Report",
        "uri": "/fakeURI",
        "type": "CPAP Medical Report",
        "scopes": ["../view", "../download"],
        "icon_uri": "/pictureOfReportFolder",
        "rsid": ""
    });

    var exampleResourceSetJSON2 = new ResourceSet({
        "date": "06/05/2105",
        "name": "CPAP Monthly Report",
        "uri": "/fakeURI",
        "type": "CPAP Medical Report",
        "scopes": ["../view", "../download", "../modify"],
        "icon_uri": "/pictureOfReportFolder",
        "rsid": ""
    });

    var exampleResourceSetJSON3 = new ResourceSet({
        "date": "07/05/2105",
        "name": "CPAP Monthly Report",
        "uri": "/fakeURI",
        "type": "CPAP Medical Report",
        "scopes": ["../view"],
        "icon_uri": "/pictureOfReportFolder",
        "rsid": ""
    });

    $scope.reports = [
        exampleResourceSetJSON1,
        exampleResourceSetJSON2,
        exampleResourceSetJSON3
    ];

    $scope.returnHome = function(){
      $location.path('/');
    };

    $scope.openReport = function(){
      // Just a fake method for now to open the report for the RSOwner to view example data
    };

    // TODO: Reports would not be hard coded but gathered from a database based on logged in user's ID
    // Or gathering the list of rsids from AS based on RSOwner PAT
    // Not sure on cost effectiveness yet
    var getReports = function() {
        //$scope.reports = ;
    };

});