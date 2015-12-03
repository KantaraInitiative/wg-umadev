/**
 * Created by kfgonzal on 11/18/2015.
 */
// will be a separate "class"/factory for endpoints once they are read from config

var requestPromise = require('request-promise'),
    aSConfigEndpoint = 'http://localhost:8100/uma-configuration';//https://as.example.com/uma-configuration";

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
    var options = {
        uri: aSConfigEndpoint,
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        resolveWithFullResponse: true,
        json: true
    };

    var promise = requestPromise(options);
    promise.then(
        function(response){
            console.log('SUCCESS - ASEndpoints: ' + response.statusCode);
            setEndpoints(response.body);
            return response;
        },
        function(err){
            // TODO: check error codes & finish
            console.log('ERROR - ASEndpoints: ' + err.statusCode); // Something went wrong
        });
    return promise;
};

module.exports = {
    getConfig: getConfig,
    getRequestProtectionEP: function(){
        console.log("getting endpoint: " + endpoints['requestProtectionEndpoint']);
        return endpoints['requestProtectionEndpoint'];
    },
    getRSRegEP: function() {
        console.log("getting endpoint: " + endpoints['resourceSetRegistrationEndpoint']);

        return endpoints['resourceSetRegistrationEndpoint'];
    },
    getPermissionRegEP: function() {
        console.log("getting endpoint: " + endpoints['permissionRegistrationEndpoint']);

        return endpoints['permissionRegistrationEndpoint'];
    },
    getIntrospectionEP: function() {
        console.log("getting endpoint: " + endpoints['introspectionEndpoint']);

        return endpoints['introspectionEndpoint'];
    }
};
