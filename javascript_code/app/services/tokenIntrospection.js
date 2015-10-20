/**
 * Created by kfgonzal on 10/6/2015.
 */

'use strict';
angular.module('introspection').factory('introspect', function($http){

    /**
     * Use future buildRequest utils or helper method for REST methods
     * */
    var introspectToken = function(token, PAT) {
        var req = {
            url: "https://as.example.com/rs/status_uri",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + PAT// + PAT token value
            },
            json: {
                token: token
            }
        };

        $http(req).then(
            function(response){
                var active = response.data["active"],
                    scope = response.data["scope"],
                    client_id = response.data["client_id"],
                    username = response.data["username"],
                    token_type = response.data["token_type"],
                    exp = response.data["exp"],
                    iat = response.data["iat"],
                    nbf = response.data["nbf"],
                    sub = response.data["sub"],
                    aud = response.data["aud"],
                    iss = response.data["iss"],
                    jti = response.data["jti"];

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
        introspectToken: introspectToken
    };
});