/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';

app.factory('protectionReq', function($http) {
    var authorizationEP = "";//https://as.example.com/authz_uri";

    return {
        // Request Protection API Token
        requestProtectionAPIToken: function(rsOwner) {
            var req = {
                url: authorizationEP,
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data : {
                    "response_type": "code",
                    "client_id": rsOwner.getId(),
                    "scope": "uma_protection"
                }
            };

            $http(req).then(
                function(response){
                    console.log("success response: " + response.data);
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