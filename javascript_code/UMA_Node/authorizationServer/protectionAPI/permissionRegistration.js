/**
 * Created by kfgonzal on 10/20/2015.
 */

var requestPromise = require('request-promise'),
    ASEndpoints = require('../authorizationServerEndpoints');

// This module will register a permission request with the AS
// If client request permission for a resource but has no Token
// Then need to register the permission with AS so the AS can prepare for authorization for the client
module.exports = {
    register: function(rsid, scopes, PAT, res){
        var options = {
            uri: ASEndpoints.getPermissionRegEP(), // permission registration endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + PAT
            },
            body: {
                'resource_set_id': rsid,
                'scopes': scopes
            },
            resolveWithFullResponse: true,
            json: true
        };

        var promise = requestPromise(options);
        promise.then(
            function(response) {
                var statusCode = response.statusCode.toString();
                console.log(statusCode);

                var headers = response.headers;
                console.log('headers: ' + headers);
                console.log(body);

                if (statusCode === '201') {
                    // Return a 403 and the ticket
                    res.status(403).send({
                        "ticket": response.body['ticket']
                    });
                }
            },
            function(err){
                console.log(err); // Something went wrong
                res.status(500).send('Server Error'); //TODO: complete error responses
            });
        return promise;
    }
};