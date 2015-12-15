/**
 * Created by K-Gonzalez on 10/6/2015.
 */
'use strict';

// will be a separate "class"/factory for endpoints once they are read from config
UMAAngular.factory('ASEndpoints', function($http){
    var aSConfigEndpoint = 'http://localhost:8100/uma-configuration';//https://as.example.com/uma-configuration";

    var endpoints = {
        requestProtectionEndpoint: '',
        resourceSetRegistrationEndpoint: '',
        introspectionEndpoint: '',
        permissionRegistrationEndpoint: ''
    };

    // Retrieve endpoint values that we need
    var setEndpoints = function(responseJSON){
        endpoints['requestProtectionEndpoint'] = responseJSON['token_endpoint'];
        endpoints['resourceSetRegistrationEndpoint'] = responseJSON['resource_set_registration_endpoint'];
        endpoints['introspectionEndpoint'] = responseJSON['introspection_endpoint'];
        endpoints['permissionRegistrationEndpoint'] = responseJSON['permission_registration_endpoint'];
    };

    // Should return the AS endpoint definitions
    var getConfig = function() {
        var req = {
            url: aSConfigEndpoint,
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var promise = $http(req);
        promise.then(
            function(response) {
                console.log('success response: ' + JSON.stringify(response.data));
                setEndpoints(response.data);
            },
            function(err) {
                console.log('ERROR: ' + err.status + " " + err.statusText);
            });
        return promise;
    };

    return {
        getConfig: getConfig,
        // Trying to avoid having to make the call each time if values are saved from before
        // But seems to be calling each time anyway
        getRequestProtectionEP: function(){
            if (endpoints['requestProtectionEndpoint'] !== '') {
                return endpoints['requestProtectionEndpoint'];
            }
            else {
                return getConfig().then(function(){
                    // should already respond to error and fail safely
                    return endpoints['requestProtectionEndpoint'];
                });
            }
        },
        getRSRegEP: function() {
            if (endpoints['resourceSetRegistrationEndpoint'] !== '') {
                return endpoints['resourceSetRegistrationEndpoint'];
            }
            else {
                return getConfig().then(function(){
                    // should already respond to error and fail safely
                    return endpoints['resourceSetRegistrationEndpoint'];
                });
            }
        },
        getPermissionRegEP: function() {
            if (endpoints['permissionRegistrationEndpoint'] !== '') {
                return endpoints['permissionRegistrationEndpoint'];
            }
            else {
                return getConfig().then(function(){
                    return endpoints['permissionRegistrationEndpoint'];
                });
            }
        },
        getIntrospectionEP: function() {
            if (endpoints['introspectionEndpoint'] !== '') {
                return endpoints['introspectionEndpoint'];
            }
            else {
                return getConfig().then(function(){
                    return endpoints['introspectionEndpoint'];
                });
            }
        }
    };
});