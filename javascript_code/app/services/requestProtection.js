/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';

app.factory('protectionReq', function($http) {

    return {
        // Request Protection API Token, this will be handled much differently with scope, etc in the URI
        getPAT: function() {
            var req = {
                url: "https://as.example.com/authz_uri", // authorization_endpoint
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
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