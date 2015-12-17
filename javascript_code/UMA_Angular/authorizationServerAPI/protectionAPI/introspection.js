/**
 * Created by K-Gonzalez on 10/6/2015.
 */

// Not sure how/why introspection would by used by the front end being as an external client
// is usually making a request to the server.
// Possible for the Resource Server who may also be acting as client, for pre set-up through an admin UI maybe?
'use strict';
UMAAngular.module('introspection').factory('introspect', function($http, ASEndpoints, permissionRegistration){

    // Use this for the endpoint throughout the module
    var introspectionEP = ASEndpoints.getIntrospectionEP();

    /**
     * Use future buildRequest utils or helper method for REST methods
     * */
    var introspectToken = function(token, PAT, rsid) {
        var req = {
            url: introspectionEP,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + PAT// + PAT token value
            },
            data: {
                'token': token
            }
        };

        var promise = $http(req);
        promise.then(
            function(response){

                // response according to [OAuth-introspection]
                var active = response.data['active'];                // REQUIRED Boolean indicator of token active status
                if (active === false) {
                    var scopes = []; // Fake scopes
                    permissionRegistration.register(rsid, scopes, PAT);
                    // Register a request and return forbidden 403, with ticket and uri
                    // inside register, res.send() with 403, ticket etc.
                }
                else if (active === true) {
                    var permissions = response.data['permissions'],  // REQUIRED array of 0 or more permission values, replaces 'scope'
                        client_id = response.data['client_id'],      // OPTIONAL Client identifier
                        username = response.data['username'],        // OPTIONAL Human readable identifier of RO
                        token_type = response.data['token_type'],    // OPTIONAL Type of the token
                        exp = response.data['exp'],                  // OPTIONAL Integer timestamp of token expiration
                        iat = response.data['iat'],                  // OPTIONAL Integer timestamp of of when originally issued
                        nbf = response.data['nbf'],                  // OPTIONAL Integer timestamp of when token is not to be used before
                        sub = response.data['sub'],                  // OPTIONAL Subject of the token
                        aud = response.data['aud'],                  // OPTIONAL String,list of string identifiers, representing intended audience
                        iss = response.data['iss'],                  // OPTIONAL String representing issuer of token
                        jti = response.data['jti'];                  // OPTIONAL String identifier for the token

                    /*  Example:
                     *  HTTP/1.1 200 OK
                     *  Content-Type: application/json
                     *  Cache-Control: no-store
                     *  {
                     *  "active: true,
                     *  "exp": 1256953732,
                     *  "iat": 1256912345,
                     *  "permissions": [
                     *      {
                     *          "resource_set_id": "112210f47de98100",
                     *          "scopes": [
                     *              "http://photoz.example.com/dev/actions/view",
                     *              "http://photoz.example.com/com/dev/actions/all"
                     *           ],
                     *           "exp": 1256953732
                     *      }
                     *   ]
                     *   }
                     */
                    if(permissions.length > 0){
                        // navigate to an error page to communicate Forbidden?
                    }
                    else{
                        // Deal with response in the promise chain outside of API
                        // to gather permissions and provide proper resource for permission scopes
                        return response;
                    }
                }
                console.log("SUCCESS - Introspection: " + response);
            },
            function(err){
                console.log("ERROR - Introspection: " + err.status + " " + err.statusText);
            });
        return promise;
    };

    return {
        introspectToken: introspectToken
    };
});