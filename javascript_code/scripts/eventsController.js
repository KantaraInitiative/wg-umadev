/**
 * Created by kfgonzal on 10/14/2015.
 */
var introspection = require('./introspect');
//var rs = require('');
// handle client GET requests to the server
module.exports.get = function(req, res){

    // Extract rsid
    var rsid = req.params["rsid"];
    console.log(rsid); // Just checking proper retrieval of rsid from url param

    // Extract headers
    var headers = req.headers;

    // Extract the Authorization header if present
    var auth = headers["authorization"];
    if(auth == null){
        console.log("No Authorization header");
        // Respond with error
    }
    else{
        console.log("Authorization present: " + auth);
        // introspect on auth token

        /* Introspect the token using a NODE call instead of the Angular one,
         * because I am still unsure how to access the Angular methods in a NODE module
         * without getting an angular not defined error */
        introspection.introspectToken(auth);
        /* I'm still not sure how to access Angular objects from within the NODE modules
         * Like for a successful introspect, then the server wil need to respond with the Angular ResourceSet */

        // If a good Token, move on, else respond with error
    }


    // Set any necessary headers
    res.setHeader('Content-Type', 'application/json');

    // Just checking that the server is running and responding
    // This JSON should appear in web
    var testBody = {"helloMessage": "Hello World Again"};

    res.send(testBody);
};