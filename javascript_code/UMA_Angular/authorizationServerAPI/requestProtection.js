/**
 * Created by K-Gonzalez on 10/6/2015.
 */
'use strict';

UMAAngular.factory('protectionReq', function($http, ASEndpoints) {
    var authorizationEP = ASEndpoints.getRequestProtectionEP();

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
                function(err){
                    console.log('ERROR: ' + err.status + ' ' + err.statusText);
                });
            return promise;
        }
    };
});
