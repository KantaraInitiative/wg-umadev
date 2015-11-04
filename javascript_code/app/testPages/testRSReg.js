/**
 * Created by kfgonzal on 11/2/2015.
 */

// Service for testing basic AS API calls used by the test page controller to display results
// All hypothetical at this point without a test AS
app.factory('testRSReg', function($timeout, rSOwnerImitationDatabase, resourceSetImitationDatabase) {

    var createResults = [],
        readResults = [],
        updateResult = [],
        listAll = [],
        deleteResults = [];

    var runTest = function(){
        var testOwner = rSOwnerImitationDatabase.getRSOwnerById("1234");

        // Get all resources from "DB" for this user
        var allResources = resourceSetImitationDatabase.getAllResourcesOfClient(testOwner.id);

        /* Imitating registering all resources for protection */
        // create a new set at the AS for each set that this user owns
        for(var i = 0; i < allResources.length; i++){
            testOwner.createProtectedResource(allResources[i]);
        }
        // Should read all of the previously created resourcesSets
        for(i = 0; i < allResources.length; i++){
            testOwner.readProtectedResource(allResources[i].rsid);
        }
        // Should list rsids for all 3 registered resources
        testOwner.listAllProtectedResources();

        // Update one of the resources
        allResources[1].type = "changingTypeForTest";
        testOwner.updateProtectedResource(allResources[1]);
        // Read the updated one to show it updated
        testOwner.readProtectedResource(allResources[1].rsid);

        // Delete one of the resources
        testOwner.deleteProtectedResource(allResources[1].rsid);
        // Should list rsids for the 2 remaining registered resources
        testOwner.listAllProtectedResources();

    };
    return {
        runTest: runTest,
        addCreateResult: function(create){
            createResults.push(create);
        },
        addReadResult: function(read){
            readResults.push(read);
        },
        addUpdateResult: function(update){
            updateResult.push(update);
        },
        addListResult: function(list){
            listAll.push(list);
        },
        addDeleteResult: function(deleted){
            deleteResults.push(deleted);
        },
        getCreateResults: function(){
            return createResults;
        },
        getReadResults: function(){
            return readResults;
        },
        getUpdateResults: function(){
            return updateResult;
        },
        getListResults: function(){
            return listAll;
        },
        getDeleteResults: function(){
            return deleteResults;
        },
        clearResults: function(){
            createResults = [];
            readResults = [];
            updateResult = [];
            listAll = [];
            deleteResults = [];
        }
    };
});