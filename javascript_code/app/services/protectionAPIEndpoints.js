/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';

// will be a separate "class"/factory for endpoints once they are read from config

app.factory('protAPIEndpoints', function($https){
    var resourceRegistrationEndpoint = "";
    var permissionRegistrationEndpoint = "";
    var introspectionEndpoint = "";

    var setRSRegEP = function(ResourceRegistrationEndpoint){
        resourceRegistrationEndpoint = ResourceRegistrationEndpoint;
    };

    var setPermissionRegEP = function(PermissionRegistrationEndpoint){
        permissionRegistrationEndpoint = PermissionRegistrationEndpoint;
    };

    var setIntrospectionEP = function(IntrospectionEndpoint){
        introspectionEndpoint = IntrospectionEndpoint;
    };

    // Retrieve endpoint values that we need
    var extractProtectionAPIEndpoints = function(responseJSON){
        setRSRegEP(responseJSON["resource_set_registration_endpoint"]);
        setPermissionRegEP(responseJSON["permission_registration_endpoint"]);
        setIntrospectionEP(responseJSON["introspection_endpoint"]);
    };

    // Should return the AS endpoint definitions
    var getConfig = function() {
        var req = {
            url: "https://as.example.com/uma-configuration",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        $https(req).then(
            function(response) {
                console.log("success response: " + response);
                extractProtectionAPIEndpoints(response.data);
            },
            function(response) {
                console.log("ERROR: " + response.status + " " + response.statusText);
            },
            function(response) {
                console.log("notify response: " + response);
            });
    };

    return {
        getConfig: getConfig,
        getRSRegEP: function() {
            if (resourceRegistrationEndpoint !== "") {
                return resourceRegistrationEndpoint;
            }
            else {
                getConfig(); // should already respond to error and fail safely
                return resourceRegistrationEndpoint;
            }
        },
        getPermissionRegEP: function() {
            if (permissionRegistrationEndpoint !== "") {
                return permissionRegistrationEndpoint;
            }
            else {
                getConfig();
                return permissionRegistrationEndpoint;
            }
        },
        getIntrospectionEP: function() {
            if (introspectionEndpoint !== "") {
                return introspectionEndpoint;
            }
            else {
                getConfig();
                return introspectionEndpoint;
            }
        }
    };
});
