/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';

app.factory('protectionReq', function($http) {

    return {
        // Request Protection API Token, this will be handled much differently with scope, etc in the URI
        getPAT: function(rsOwner) {
            console.log(rsOwner.getId()); // Just checking it came through as an object as intended
            var req = {
                url: "https://as.example.com/authz_uri?response_type=code&client_id=" + rsOwner.getId() + "&scope=uma_protection", // authorization_endpoint
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response);
                    rsOwner.setPAT(response.data["access_token"]);// Set with PAT results from successful request
                    // Also Store PAT in database with user_id
                    // So update whatever DB is holding RSOwners who are protected
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