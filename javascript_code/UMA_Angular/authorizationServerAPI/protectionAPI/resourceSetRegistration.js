/**
 * Created by K-Gonzalez on 10/6/2015.
 */
'use strict';

// I return the promise, in case the implementer needs to manipulate the sequence of occurring calls based on promises
// For example, for some reason they create all sets then immediately want to update all sets.
// they would need to wait on create promises to resolve before trying to update
UMAAngular.factory('rsRegistration', function($http, ASEndpoints) {

    // Use this for the endpoint throughout the module
    var resourceSetRegistrationEP = ASEndpoints.getRSRegEP();

    /**
     * Use future buildRequest utils or helper method for REST requests
     */
    return {
        /* CREATE
         * Params:  token - PAT of resource owner
         *          ResourceSet - resource set to be protected
         *          res - response passed from parent request
         * Return:  Promise function */
        createRS: function(token, ResourceSet) { // Create/register a new resource set with the AS
            var req = {
                url: resourceSetRegistrationEP,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                data: ResourceSet.toJSONForAS()
            };

            var promise =  $http(req);
            promise.then(
                function(response){
                    console.log('CREATE - SUCCESS: ' + response.status + ' '  + response.statusText);
                    console.log("Data: " + response.data);
                },
                function(err){
                    console.log('CREATE - ERROR: ' + err.status + ' ' + err.statusText);
                });
            return promise;
        },
        readRS: function(token, rsid) { // Read the details of a specific resource set at the AS
            var req = {
                url: resourceSetRegistrationEP + '/' + rsid,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            var promise =  $http(req);
            promise.then(
                function(response){
                    console.log('READ - SUCCESS: ' + response.status + ' ' + response.statusText);
                    console.log('Data: ' + response.data);
                },
                function(err){
                    console.log('READ - ERROR: ' + err.status + ' ' + err.statusText);
                });
            return promise;
        },
        updateRS: function(token, ResourceSet) { // Update resource Set at the AS
            var req = {
                url: resourceSetRegistrationEP + '/' + ResourceSet['rsid'],
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                // RS_description with updated info
                data: ResourceSet.toJSONForAS()
            };

            var promise =  $http(req);
            promise.then(
                function(response){
                    console.log('UPDATE - SUCCESS: ' + response.status + ' ' + response.statusText);
                    console.log("Data: " + response.data);
                },
                function(err){
                    console.log('UPDATE - ERROR: ' + err.status + ' ' + err.statusText);
                });
            return promise;
        },
        deleteRS: function(token, rsid) {
            var req = {
                url: resourceSetRegistrationEP + '/' + rsid,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            var promise = $http(req);
            promise.then(
                function(response){
                    console.log('DELETE - SUCCESS: ' + response.status + ' ' + response.statusText);
                    console.log('Data: ' + response.data);
                },
                function(err){
                    console.log('DELETE - ERROR: ' + err.status + ' ' + err.statusText);
                });
            return promise;
        },
        listAll: function(token) {
            var req = {
                url: resourceSetRegistrationEP,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            };

            var promise = $http(req);
            promise.then(
                function(response){
                    console.log('LIST - SUCCESS: ' + response.status + ' ' + response.statusText);
                    console.log('Data: ' + response.data);
                },
                function(err){
                    console.log('LIST - ERROR: ' + err.status + ' ' + err.statusText);
                });
            return promise;
        }
    };
});