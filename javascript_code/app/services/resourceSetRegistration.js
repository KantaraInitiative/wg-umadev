/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';

app.factory('rsRegistration', function($http, protAPIEndpoints, testRSReg) {

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
                data: ResourceSet.toJSONForAS()
            };

            $http(req).then(
                function(response){
                    //console.log("success response: " + response.data);
                    ResourceSet.setRsid(response.data["_id"]);

                    // Just adding results to the test suite
                    testRSReg.addCreateResult("success response: " + response.data);
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);

                    testRSReg.addCreateResult("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        },
        readRS: function(token, rsid) { // Read the details of a specific resource set at the AS

            var req = {
                url: registrationEP + "/" + rsid,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response.data);

                    // Just adding results to the test suite
                    testRSReg.addReadResult("success response: " + response.data);
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);

                    // Just adding results to the test suite
                    testRSReg.addReadResult("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        },
        updateRS: function(token, ResourceSet) { // Update resource Set at the AS

            var req = {
                url: registrationEP + "/" + ResourceSet.rsid,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                // RS_description with updated info
                data: ResourceSet.toJSONForAS()
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response.data);
                    ResourceSet.rsid = response.data["_id"];

                    // Just adding results to the test suite
                    testRSReg.addUpdateResult("success response: " + response.data);
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);

                    // Just adding results to the test suite
                    testRSReg.addUpdateResult("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        },
        deleteRS: function(token, rsid) {

            var req = {
                url: registrationEP + "/" + rsid,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response.data);

                    // Just adding results to the test suite
                    testRSReg.addDeleteResult("success response: " + response.data);
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);

                    // Just adding results to the test suite
                    testRSReg.addDeleteResult("ERROR: " + response.status + " " + response.statusText);
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
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response.data);

                    // Just adding results to the test suite
                    testRSReg.addListResult("success response: " + response.data);
                },
                function(response){
                    console.log("ERROR: " + response.status + " " + response.statusText);

                    // Just adding results to the test suite
                    testRSReg.addListResult("ERROR: " + response.status + " " + response.statusText);
                },
                function(response){
                    console.log("notify response: " + response);
                });
        }
    };

});
