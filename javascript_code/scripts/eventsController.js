/**
 * Created by kfgonzal on 10/14/2015.
 */

module.exports.get = function(req, res){

    // handle client get requests to the server

    var headers = req.headers;

    var auth = headers["authorization"];
    if(auth == null){
        console.log("No Authorization header");
        // Respond with error
    }
    else{
        console.log("Authorization present" + auth);
        // introspect on auth token
        // If a good Token, move on, else respond with error
    }

    //var response =

    res.setHeader('content-type', 'application/json');
    var body = {"helloMessage": "Hello World Again"}; // Just checking that the server is running and responding
    // set any other headers
    res.send(body);
};