/**
 * Created by kfgonzal on 10/18/2015.
 */

var request = require('request');
var permissionReg = require('./permissionReg'); // Node module

// This module will make an external call to the AS in order to introspect the AAT
module.exports = {
    introspectToken: function (token, PAT, rsid, res) {

        var options = {
            url: 'https://as.example.com/rs/status_uri',
            method: 'POST',
            //url: 'http://localhost:63342/wg-umadev/javascript_code/app/test.html', // just using these for testing on Postman
            //method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + PAT
            },
            json: {
                token: token
            }
        };

        request(options, function(error, response, body){
            if(error){
                console.log(error); // Something went wrong other than something like 404, 403, 401..more like connection error, host error
                res.send(500, 'Server Error');
            }
            else{
                var statusCode = response.statusCode;
                console.log(statusCode);
                // according to [OAuth-introspection] invalid will return 401 if something wrong with Authorization
                if(statusCode === 401){
                    // Something wrong with PAT
                    // res.send(401, "");
                }
                if(statusCode === 200) {
                    var headers = response.headers;
                    console.log("headers:" + headers);
                    console.log('content type header ' + headers["content-type"]);
                    console.log(body);

                    var data = JSON.parse(body);
                    console.log(data);

                    // Just testing on Postman
                    //res.setHeader("Authorization", "Bearer NONE");
                    //res.send(data);

                    // response according to [OAuth-introspection]
                    var active = data["active"];                // REQUIRED Boolean indicator of token active status
                    if (active === false) {
                        var scopes = []; // Fake scopes
                        permissionReg.register(rsid, scopes, PAT, res);
                        // Register a request and return forbidden 403, with ticket and uri
                        // inside register, pass the res and call res.send() with 403, ticket etc.
                    }
                    else if (active === true) {
                        var permissions = data["permissions"],  // REQUIRED array of 0 or more permission values, replaces 'scope'
                            client_id = data["client_id"],      // OPTIONAL Client identifier
                            username = data["username"],        // OPTIONAL Human readable identifier of RO
                            token_type = data["token_type"],    // OPTIONAL Type of the token
                            exp = data["exp"],                  // OPTIONAL Integer timestamp of token expiration
                            iat = data["iat"],                  // OPTIONAL Integer timestamp of of when originally issued
                            nbf = data["nbf"],                  // OPTIONAL Integer timestamp of when token is not to be used before
                            sub = data["sub"],                  // OPTIONAL Subject of the token
                            aud = data["aud"],                  // OPTIONAL String,list of string identifiers, representing intended audience
                            iss = data["iss"],                  // OPTIONAL String representing issuer of token
                            jti = data["jti"];                  // OPTIONAL String identifier for the token

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
                        // get the resource_set_id (s) and give access to the desired resource if it is in the permissions
                        for(var i = 0; i < permissions.length; i++){
                            if(rsid === permissions["resource_set_id"]){
                                //res.send(); // send access to rsid
                                break;
                            }
                        }
                    }
                }
            }
        });
    }
};
