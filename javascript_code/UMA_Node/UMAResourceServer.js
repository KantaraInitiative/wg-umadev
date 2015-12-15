/**
 * Created by K-Gonzalez on 10/14/2015.
 */
var express = require('express'),
    path = require('path'),
    events = require('./resourceServerEventsController'),
    bodyParser = require('body-parser'),
    rootPath = path.normalize(__dirname + '/../'),
    app = express();

// Sets up authorization server API endpoints
var ASEndpoints = require('./authorizationServer/authorizationServerEndpoints');
ASEndpoints.getConfig().then(
    function(response){
    // TODO: Any other UMA specific configuration that deals with needing resolved before server finishes startup goes here
    },
    function(err){
        console.log("ERROR: Unable to set configuration for authorization endpoints. ERROR msg: " + err);
    });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// TODO: Set up an Angular application if needed
app.get('/app', function(req, res){
   res.redirect('/app/index.html');
});
app.use('/app/', express.static(rootPath + 'app'));
app.use('/UMA_Angular/', express.static(rootPath + 'UMA_Angular'));

app.use('/node_modules', express.static(rootPath + 'node_modules'));

/* UMA related requests to the server
 * Requests for scopes, icons, and config may be modified to use RS own function calls or scope urls
 * but minimum requirements must be met for responding to a client request for access to a resource set
* */
// Handle incoming request for resource set
app.get('/resourceSet/:rsid', events.getResourceSet);
// Handle request to get a specific scope
app.get('/scopes/:scope', events.getScope);
// Handle request to get all scopes
app.get('/scopes', events.getAllScopes);
// Handle request to get an icon
app.get('/icons/:icon', events.getIcon);
// Handle request to retrieve endpoints for use
app.get('/config', events.getConfig);

app.listen(8000);

console.log('Listening on port ' + 8000 + '...');