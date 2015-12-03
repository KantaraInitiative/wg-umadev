/**
 * Created by kfgonzal on 10/14/2015.
 */
var express = require('express'),
    path = require('path'),
    events = require('./resourceServerEventsController'),
    bodyParser = require('body-parser'),
    rootPath = path.normalize(__dirname + '/../'),
    app = express();

// Set up authorization server API endpoints
var ASEndpoints = require('./authorizationServer/authorizationServerEndpoints');
ASEndpoints.getConfig().then(function(response){
    // TODO: Any other server configuration that deals with needing resolved
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* TODO: fix issue with Angular app not running from Node server, only runs when going to index.html from local
*   probably a path issue, was working before I re-organized */
app.use('/app', express.static(rootPath + 'app'));

app.use('/node_modules', express.static(rootPath + 'node_modules'));

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