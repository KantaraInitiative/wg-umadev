/**
 * Created by kfgonzal on 10/18/2015.
 */


// This module will make an external call to the AS in order to introspect the AAT
var https = require('https');

module.exports = {
    introspectToken: function (token) {

        var options = {
            host: 'as.example.com',
            path: '/rs/status_uri',
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        };

        https.get(options, function(response){
            response.on('end', function(){
                console.log("success response: " + response);
                // if the token is good, then return true, or deal with sending the ResourceSet
            });
        }).on('error', function(e){
            console.log("ERROR: " + e.message);
        });

    }
};
