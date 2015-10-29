/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';

app.factory('rsRegistration', function($http, protAPIEndpoints) {

    // Use this for the endpoint throughout the module
    var registrationEP = protAPIEndpoints.getPermissionRegEP();
    /**
     * Use future buildRequest utils or helper method for REST requests
     *
     * Attempted to break out the http requests but because of the way the httpPromise works,
     * retrieving and dealing with data outside of the promise was troubling
     * */

    return {
        createRS: function(token, ResourceSet) { // Create/register a new resource set with the AS
            var req = {
                url: registrationEP,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                json: ResourceSet.rsJSON()
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response);
                    ResourceSet.rsid = response.data["_id"];
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        },
        readRS: function(token, rsid) { // Read the details of a specific resource set at the AS

            var req = {
                url: registrationEP + rsid,
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response);
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        },
        updateRS: function(token, ResourceSet) { // Update resource Set at the AS

            var req = {
                url: registrationEP + ResourceSet.rsid,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                // RS_description with updated info
                json: ResourceSet.rsJSON()
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response);
                    ResourceSet.rsid = response.data["_id"];
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        },
        deleteRS: function(token, rsid) {

            var req = {
                url: registrationEP + rsid,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response);
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        },
        listAll: function(token) {

            var req = {
                url: registrationEP,
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response);
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        }
    };

});
