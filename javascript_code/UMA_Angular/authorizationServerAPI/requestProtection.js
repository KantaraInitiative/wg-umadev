/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';

UMAAngular.factory('protectionReq', function($http, ASEndpoints) {
    var authorizationEP = '';
    ASEndpoints.getRequestProtectionEP().then(function(endpoint){
        authorizationEP = endpoint;
    });
    console.log("authorization EP: " + authorizationEP);
    return {
        // Request Protection API Token
        requestProtectionAPIToken: function(rsOwner) {
            console.log("authorization EP: " + authorizationEP);
            var req = {
                url: authorizationEP,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data : {
                    'response_type': 'code',
                    'client_id': rsOwner.getId(),
                    'scope': 'uma_protection'
                }
            };

            var promise = $http(req);
            promise.then(
                function(response){
                    console.log('success response: ' + JSON.stringify(response.data));
                    return response;
                },
                function(response){
                    console.log('ERROR: ' + response.status + ' ' + response.statusText);
                });
            return promise;
        }
    };
});
