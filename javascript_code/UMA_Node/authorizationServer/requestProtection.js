/**
* Created by K-Gonzalez on 11/18/2015.
*/
var requestPromise = require('request-promise'),
    ASEndpoints = require('./authorizationServerEndpoints');

module.exports = {
// Request Protection API Token
requestProtectionAPIToken: function(rsOwner) {
    console.log("authorization EP: " + authorizationEP);
    var options = {
        uri: ASEndpoints.getRequestProtectionEP(),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : {
            'response_type': 'code',
            'client_id': rsOwner.getId(),
            'scope': 'uma_protection'
        },
        resolveWithFullResponse: true,
        json: true
    };

    var promise = requestPromise(options);
    promise.then(
        function(response){
            console.log('success response: ' + body);
            var data = JSON.parse(body);
            rsOwner.setPAT(data['access_token']);// Set with PAT results from successful request
        },
        function(err){
            console.log(err); // Something went wrong
            res.status(500).send('Server Error'); //TODO: complete error responses
        });
    return promise;
    }
};