/**
 * Created by kfgonzal on 10/6/2015.
 */

'use strict';

// Introspect a token to check its validity
app.factory('introspect', function($http){

    /**
     * Use future buildRequest utils or helper method for REST methods
     * */
    var introspectToken = function(token) {
        var req = {
            url: "https://as.example.com/rs/status_uri",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token// + PAT token value
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
    };

    return {
        introspectToken: introspectToken
    };
});