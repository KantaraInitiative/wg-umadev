/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';

app.factory('permReg', function($https){

    /**
     * Use future buildRequest utils or helper method for REST methods
     * */
    // If client request permission for a resource but has no Token
    // Then need to register the permission with AS so the AS can prepare for authorization for the client
    var registerPermission = function(token, rsid, scopes) {

        var req = {
            url: "https://as.example.com/rs/perm_uri", // authorization_endpoint
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer" + token
            },
            json: {
                resource_set_id: rsid,
                scopes: scopes
            }
        };

        $https(req).then(
            function(response){
                console.log("success response: " + response);
            },
            function(response){
                console.log("ERROR: " + response.status + " " + response.statusText);
            },
            function(response){
                console.log("notify response: " + response);
            });
    };

    return {
        registerPermission: registerPermission
    };

});