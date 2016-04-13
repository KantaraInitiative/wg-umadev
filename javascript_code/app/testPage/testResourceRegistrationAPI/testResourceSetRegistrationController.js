/**
 * Created by K-Gonzalez on 11/2/2015.
 */

app.controller('testResourceSetRegistrationController', function($scope, $location, $timeout, rSOwnerImitationDatabase, resourceSetImitationDatabase){

    var testOwner = rSOwnerImitationDatabase.getRSOwnerById('1234');
    // Get all resources from "DB" for this user
    var allResources = resourceSetImitationDatabase.getAllResourcesOfClient(testOwner.id);

    // Index of resource I want to update, read and delete. Just hard coding for now
    // maybe allow choice and input box later?
    var index = 0;
    var createdResults = [],
        readCreatedResults = [],
        readUpdateResult = [],
        updateResult = [],
        listCreatedResult = [],
        listAfterDeleteResult = [],
        deleteResult = [];

    $scope.testResources = allResources;
    $scope.createdResults = createdResults;
    $scope.readCreatedResults = readCreatedResults;
    $scope.listCreatedResult = listCreatedResult;
    $scope.updateResult = updateResult;
    $scope.readUpdateResult = readUpdateResult;
    $scope.deleteResult = deleteResult;
    $scope.listAfterDeleteResult = listAfterDeleteResult;

    $scope.showCreatePlay = true;
    $scope.showReadCreatedPlay = false;
    $scope.showListCreatedPlay = false;
    $scope.showUpdatePlay = false;
    $scope.showReadUpdatePlay = false;
    $scope.showDeletePlay = false;
    $scope.showListAfterDeletePlay = false;

    // in hindsight using an async like q.all() for resolving all would have been simpler for these

    $scope.handleCreate = function(){
        var resourceIndex = 0;
        // the rsid is returned by the promise function
        var doCreateSuccess = function(id){
            resourceIndex++;
            if(resourceIndex < allResources.length) {
                createdResults.push(id);
                console.log("creating: " + id);
                testOwner.createProtectedResource(allResources[resourceIndex]).then(doCreateSuccess);
            }else {
                console.log("creating: " + id);
                createdResults.push(id);

                $scope.showCreatePlay = false;
                $scope.showReadCreatedPlay = true;
            }
        };
        testOwner.createProtectedResource(allResources[resourceIndex]).then(doCreateSuccess);
    };

    $scope.handleReadCreated = function(){
        var resIndex = 0;
        // the resource set is returned by the promise function
        var doReadSuccess = function(resource_set){
            resIndex++;
            var readResult = JSON.stringify(resource_set);
            if(resIndex < allResources.length) {
                console.log('read Result: ' + readResult);
                readCreatedResults.push(readResult);
                testOwner.readProtectedResource(allResources[resIndex]['rsid']).then(doReadSuccess);
            }else {
                console.log('read Result: ' + readResult);
                readCreatedResults.push(readResult);

                $scope.showReadCreatedPlay = false;
                $scope.showListCreatedPlay = true;
            }
        };
        testOwner.readProtectedResource(allResources[resIndex]["rsid"]).then(doReadSuccess);
    };

    $scope.handleListCreated = function() {
        testOwner.listAllProtectedResources().then(function(list){
            listCreatedResult.push(list);

            $scope.showListCreatedPlay = false;
            $scope.showUpdatePlay = true;
        });
    };

    $scope.handleUpdate = function() {
        // maybe allow choice and input box later?
        allResources[index]['type'] = 'changingTypeForTest';
        testOwner.updateProtectedResource(allResources[index]).then(
            function(id){
                updateResult.push(id);
                $scope.showUpdatePlay = false;
                $scope.showReadUpdatePlay = true;
            });
    };

    $scope.handleReadAfterUpdate = function(){
        testOwner.readProtectedResource(allResources[index]['rsid']).then(
            function(resource_set){
                console.log(resource_set);
                readUpdateResult.push(JSON.stringify(resource_set));

                $scope.showReadUpdatePlay = false;
                $scope.showDeletePlay = true;
            });
    };

    $scope.handleDelete = function(){
        testOwner.deleteProtectedResource(allResources[index]['rsid']).then(function(response){
            // Would technically need to delete the actual resource object from storage of ProtectedResourceSets at this point
            deleteResult.push(response.statusText);

            $scope.showDeletePlay = false;
            $scope.showListAfterDeletePlay = true;
        });
    };

    $scope.handleListAfterDelete = function(){
        testOwner.listAllProtectedResources().then(function(list){
            listAfterDeleteResult.push(list);
            $scope.showListAfterDeletePlay = false;
        });
    };

    var clearResults = function() {
        readCreatedResults = [];
        readUpdateResult = [];
        updateResult = [];
        deleteResult = [];
        if(listAfterDeleteResult.length !== 0) {
            for (var i = 0; i < listAfterDeleteResult[0].length; i++) {
                console.log("deleting protected resource: " + listAfterDeleteResult[0][i]);
                testOwner.deleteProtectedResource(listAfterDeleteResult[0][i]);
            }
        }else if(createdResults.length !== 0){
            for (i = 0; i < createdResults.length; i++) {
                console.log("deleting protected resource: " + createdResults[i]);
                testOwner.deleteProtectedResource(createdResults[i]);
            }
        }
        createdResults = [];
        listCreatedResult = [];
        listAfterDeleteResult = [];
        for(i = 0; i < allResources.length; i++){
            allResources[i]["rsid"] = "";
        }
    };

    $scope.return = function(){
        clearResults();
        $location.path('/tests');
    };

});