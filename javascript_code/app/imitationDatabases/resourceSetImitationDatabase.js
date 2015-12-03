/**
 * Created by kfgonzal on 11/2/2015.
 */

// Mimic DB functionality for resource sets until figure out actual storage example, such as MongoDB

// I really am just aiming to have something ready to go once I am able to test against an AS
// This is assuming the database contains all their user's resources not just their protected ones.
app.factory('resourceSetImitationDatabase', function(ProtectedResourceSet){
    // TODO: Reports would not be hard coded but gathered from a database based on logged in user's ID
    // For creating resourceSet(s) at the AS for the first time
    // Or gathering the list of rsids from AS based on RSOwner PAT for updates etc.
    // Not sure on cost effectiveness yet

    var allResources = [];

    // Actual resource Sets would be from a DB pulled by rsid after getting list of rsids from AS
    // and objects compiled from JSON
    var exampleProtectedResourceSet1 = ProtectedResourceSet.createFromJSON({
        'client_id': '1234',
        'name': 'CPAP Monthly Report/May-2015',
        'uri': '/fakeURI',
        'type': 'CPAP Medical Report',
        'scopes': ['../view'],
        'icon_uri': '/pictureOfReportFolder'
    });

    // I like the idea of the RS being able to create a PtotectedResourceSet from an existing Resource JSON from their DB
    var exampleProtectedResourceSet2 = ProtectedResourceSet.createFromJSON({
        'client_id': '1234',
        'name': 'CPAP Monthly Report/June-2015',
        'uri': '/fakeURI',
        'type': 'CPAP Medical Report',
        'scopes': ['../view', '../download', '../modify'],
        'icon_uri': '/pictureOfReportFolder'
    });

    // Showing both create processes
    var exampleProtectedResourceSet3 = ProtectedResourceSet.create();
    // Inputs would be from some data pulled from an actual DB
    exampleProtectedResourceSet3.withName('CPAP Monthly Report/July-2015');
    exampleProtectedResourceSet3.withURI('/fakeURI');
    exampleProtectedResourceSet3.withType('CPAP Medical Report');
    exampleProtectedResourceSet3.withScope('../view');
    exampleProtectedResourceSet3.withScope('../download');
    exampleProtectedResourceSet3.withIcon('/pictureOfReportFolder');

    exampleProtectedResourceSet3.client_id = '1234';

    // Fake add protected resources compiled from a set/subset of all resources
    allResources.push(exampleProtectedResourceSet1);
    allResources.push(exampleProtectedResourceSet2);
    allResources.push(exampleProtectedResourceSet3);

    var getAllResourcesOfClient = function(client_id){ // client_id would probably be needed on an actual data call
        // ## What would happen if server automatically protects its user's resources after obtaining user's PAT
        // 1) Get all client's resources
        // 2) Make them into a ProtectedResourceObject and
        // 3) send the objects on to be registered at the AS
        return allResources;
    };

    var deleteResource = function(resourceSet){
        var index = allResources.indexOf(resourceSet);
        if(index > -1){
            allResources.splice(index, 1);
        }
        console.log('deleting resourceSet rsid: ' + resourceSet['rsid'] +  'remaining in set: ' + allResources);
    };

    return {
        getAllResourcesOfClient: getAllResourcesOfClient,
        deleteResource: deleteResource
    };
});