/**
 * Created by K-Gonzalez on 10/6/2015.
 */
'use strict';

// Not exactly sure where this functionality falls in scope for a front end but it may be for
// some certain use case
UMAAngular.factory('permReg', function($http, ASEndpoints){

    // Use this for the endpoint throughout the module
    var permissionRegistrationEP = ASEndpoints.getPermissionRegEP();

    /**
     * Use future buildRequest utils or helper method for REST methods
     * */
    var registerPermission = function(token, rsid, scopes) {

        var req = {
            url: permissionRegistrationEP,
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer" + token
            },
            data: {
                'resource_set_id': rsid,
                'scopes': scopes
            }
        };

        var promise = $http(req);
        promise.then(
            function(response){
                console.log("SUCCESS - permissionRegistration: " + response);
                // How to communicate ticket from FE? store and act on behalf of client?
            },
            function(err){
                console.log("ERROR - permissionRegistration: " + err.status + " " + err.statusText);
                // Navigate to an error page?
            });
        return promise;
    };

    return {
        registerPermission: registerPermission
    };

});