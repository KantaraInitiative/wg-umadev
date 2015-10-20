/**
 * Created by kfgonzal on 10/14/2015.
 */
var introspection = require('./introspect');    // Node module
var permissionReg = require('./permissionReg'); // Node module

// handle client GET requests to the server for resourceSet access
module.exports.get = function(req, res){
    var fakePAT = "PAT";

    // Extract rsid
    var rsid = req.params["rsid"];
    console.log(rsid); // Just checking proper retrieval of rsid from url param

    // Extract headers
    var headers = req.headers;

    // Extract the Authorization header if present
    var auth = headers["authorization"];
    if(auth == null){
        console.log("No Authorization header");
        // Register a request and return forbidden 403, with ticket and uri
        // inside register, pass the res and call res.send() with 403, ticket etc.
        var scopes = []; // Fake scopes
        permissionReg.register(rsid, scopes, fakePAT, res);

    }
    else{
        console.log("Authorization present: " + auth);


        // introspect on auth token
        var splitAuth = auth.split(" "); // Should check first if it contains "Bearer"
        var token = splitAuth[1];
        /* Introspect the token using a NODE call instead of the Angular one */
        // TODO: get PAT to send for auth header
        introspection.introspectToken(token, fakePAT, rsid, res);

        /* I'm still not sure how to access Angular objects from within the NODE modules
         * For example on a successful introspect, then the server will need to respond with the Angular ResourceSet
         * Will probably need to write the object in a node module instead and share it with an Angular module*/
    }
};