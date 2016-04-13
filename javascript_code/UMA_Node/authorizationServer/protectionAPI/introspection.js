/**
 * Created by K-Gonzalez on 10/18/2015.
 */

var requestPromise = require('request-promise'),
    permissionReg = require('./permissionRegistration'),
    ASEndpoints = require('../authorizationServerEndpoints');

// This module will make an external call to the AS in order to introspect the AAT
module.exports = {
introspectToken: function (token, PAT, rsid, res) {
    var options = {
        uri: ASEndpoints.getIntrospectionEP(),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + PAT
        },
        body: {
            'token': token
        },
        resolveWithFullResponse: true,
        json: true
    };

    var promise = requestPromise(options);
    promise.then(
        function(response){
            var statusCode = response.statusCode.toString();
            console.log(statusCode);
            if(statusCode === '200') {
                var data = response.body;

                // response according to [OAuth-introspection]
                var active = data['active'];                // REQUIRED Boolean indicator of token active status
                if (active === false) {
                    var scopes = []; // Fake scopes
                    permissionReg.register(rsid, scopes, PAT, res).then(
                        function(response){
                            // Add any unique RS permissionReg handling here
                        },
                        function(err){
                            // permissionReg should have already failed safely and responded to client if failed
                            console.log("ERROR: Unable to permissionReg. ERROR msg: " + err);
                        });
                }
                else if (active === true) {
                    var permissions = data['permissions'],  // REQUIRED array of 0 or more permission values, replaces 'scope'
                        client_id = data['client_id'],      // OPTIONAL Client identifier
                        username = data['username'],        // OPTIONAL Human readable identifier of RO
                        token_type = data['token_type'],    // OPTIONAL Type of the token
                        exp = data['exp'],                  // OPTIONAL Integer timestamp of token expiration
                        iat = data['iat'],                  // OPTIONAL Integer timestamp of of when originally issued
                        nbf = data['nbf'],                  // OPTIONAL Integer timestamp of when token is not to be used before
                        sub = data['sub'],                  // OPTIONAL Subject of the token
                        aud = data['aud'],                  // OPTIONAL String,list of string identifiers, representing intended audience
                        iss = data['iss'],                  // OPTIONAL String representing issuer of token
                        jti = data['jti'];                  // OPTIONAL String identifier for the token

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
                    if(permissions.length === 0){
                        res.status(403).send(
                            {
                                "error": "403",
                                "error_description": "Forbidden"
                            });
                    }
                }
            }
        },
        function(err){//TODO: complete error responses
            if(err.statusCode === '401'){
                // Something wrong with PAT
                res.status(401).send();
            }else {
                res.status(err.statusCode).send({
                    'error': err.statusCode
                });
            }
        });
    return promise;
    }
};
