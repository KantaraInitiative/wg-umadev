/**
 * Created by K-Gonzalez on 11/2/2015.
 */

// Service for testing basic AS API calls used by the test page controller to display results
// All hypothetical at this point without a test AS

// The data needed by the api calls is within the proceeding .then() call
// For example, the resource_set we need for reading a resource_set is the input param to the .then success function call
// .then(function(resource_set){}); input is what we need so just call the .then to retrieve it from the function
app.factory('testRSReg', function($timeout, $location, $http, $q, rSOwnerImitationDatabase, resourceSetImitationDatabase) {

    var createdResults = [],
        readCreatedResults = [],
        readUpdateResult = [],
        updateResult = [],
        listCreatedResult = [],
        listAfterDeleteResult = [],
        deleteResult = [],
        allResources = [];

    var testResReg = function(){
        var testIndex = 0;
        var testOwner = rSOwnerImitationDatabase.getRSOwnerById('1234');

        // Get all resources from "DB" for this user
        allResources = resourceSetImitationDatabase.getAllResourcesOfClient(testOwner.id);

        var initResRegTest = function(){
            // Cascades from doCreate
            doCreate();
        };

        /* Imitating registering all resources for protection */
        // create a new set at the AS for each set that this user owns
        var doCreate = function(){
            var resourceIndex = 0;
            // the rsid is returned by the promise function
            var doCreateSuccess = function(id){
                resourceIndex++;
                if(resourceIndex < allResources.length) {
                    createdResults.push('rsid: ' + id);
                    testOwner.createProtectedResource(allResources[resourceIndex]).then(doCreateSuccess);
                }else {
                    createdResults.push('rsid: ' + id);

                    // Move on to read after last promise has resolved
                    doRead();
                }
            };
            testOwner.createProtectedResource(allResources[resourceIndex]).then(doCreateSuccess);
        };

        // Read the created resources
        var doRead = function(){
            var resIndex = 0;
            // the resource set is returned by the promise function
            var doReadSuccess = function(resource_set){
                resIndex++;
                var readResult = JSON.stringify(resource_set);
                if(resIndex < allResources.length) {
                    console.log('read Result: ' + readResult);
                    readCreatedResults.push('resource_set: ' + readResult);
                    testOwner.readProtectedResource(allResources[resIndex]['rsid']).then(doReadSuccess);
                }else {
                    console.log('read Result: ' + readResult);
                    readCreatedResults.push('resource_set: ' + readResult);

                    // Move on to list after last promise has resolved
                    doListCreated();
                }
            };
            testOwner.readProtectedResource(allResources[resIndex]["rsid"]).then(doReadSuccess);
        };

        // List the created resources
        var doListCreated = function() {
            testOwner.listAllProtectedResources().then(function(list){
                listCreatedResult.push('rsid list: ' + list);
                console.log(list);

                // Some index of known resource
                doUpdate(testIndex);
            });
        };

        // Update one of the resources
        var doUpdate = function(index) {
            allResources[index]['type'] = 'changingTypeForTest';
            testOwner.updateProtectedResource(allResources[index]).then(
                function(id){
                    updateResult.push('rsid: ' + id);
                    doReadUpdatedResource(index);
                });
        };

        // Read the updated resource
        var doReadUpdatedResource = function(index){
            testOwner.readProtectedResource(allResources[index]['rsid']).then(
                function(resource_set){
                    console.log(resource_set);
                    readUpdateResult.push('resource_set: ' + JSON.stringify(resource_set));
                    doDeleteUpdatedResource(index);
                });
        };

        // Delete the updated resource
        var doDeleteUpdatedResource = function(index){
            testOwner.deleteProtectedResource(allResources[index]['rsid']).then(function(response){
                // Would technically need to delete the actual resource object from storage of ProtectedResourceSets at this point
                deleteResult.push(response.statusText);
                doListAfterDelete();
            });
        };

        // Show rsid list after deletion
        var doListAfterDelete = function(){
            testOwner.listAllProtectedResources().then(function(list){
                listAfterDeleteResult.push('rsid list: ' + list);
                console.log(list);
            });
        };

        // Init the test
        initResRegTest();
    };

    return {
        testResReg: testResReg,
        // method calls for controller to access array values for ability to display to a page
        getCreatedResults: function(){
            return createdResults;
        },
        getReadCreatedResults: function(){
            return readCreatedResults;
        },
        getReadUpdateResult: function(){
            return readUpdateResult;
        },
        getUpdateResult: function(){
            return updateResult;
        },
        getListCreatedResult: function(){
            return listCreatedResult;
        },
        getListAfterDeleteResult: function(){
            return listAfterDeleteResult;
        },
        getDeletedResult: function(){
            return deleteResult;
        },
        getTestResources: function(){
            return allResources;
        },
        clearResults: function(){
            createdResults = [];
            readCreatedResults = [];
            readUpdateResult = [];
            updateResult = [];
            listCreatedResult = [];
            listAfterDeleteResult = [];
            deleteResult = [];
        }
    };
});