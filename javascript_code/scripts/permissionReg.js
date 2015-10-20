/**
 * Created by kfgonzal on 10/20/2015.
 */

var request = require('request');

// This module will register a permission request with the AS
// If client request permission for a resource but has no Token
// Then need to register the permission with AS so the AS can prepare for authorization for the client
module.exports = {
    register: function(rsid, scopes, PAT, res){
        var options = {
            url: "https://as.example.com/rs/perm_uri", // authorization_endpoint
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer" + PAT
            },
            json: {
                resource_set_id: rsid,
                scopes: scopes
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

                var headers = response.headers;
                console.log("headers:" + headers);
                console.log('content type header ' + headers["content-type"]);
                console.log(body);

                var data = JSON.parse(body);
                console.log(data);

                //TODO: finish logic for protocol
                /* Register a permission request
                 * Then respond with a 403 forbidden response, a permission ticket,
                 * and instructions where to obtain an RPT
                 *
                 * Example:
                 * HTTP/1.1 403 Forbidden
                 * WWW-Authenticate: UMA realm="example",
                 *  as-uri="https://as.example.com"
                 *
                 * {
                 * "ticket": "016f84e8-f9b9-11e0-bd6f-0021cc6004de"
                 * }
                 */
            }
        });
    }
};

var registerPermission = function(token, rsid, scopes) {

    var req = {
        url: "https://as.example.com/rs/perm_uri", // authorization_endpoint
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + token
        },
        json: {
            resource_set_id: rsid,
            scopes: scopes
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
    registerPermission: registerPermission
};