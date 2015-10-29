/**
 * Created by kfgonzal on 10/14/2015.
 */
var express = require('express'),
    path = require('path'),
    events = require('./eventsController'),
    bodyParser = require('body-parser'),
    rootPath = path.normalize(__dirname + '/../'),
    app = express();

var https = ('https');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + 'app'));

app.use("/node_modules", express.static(rootPath + 'node_modules'));

app.get('/resourceSet/:rsid', events.get);

app.listen(8000);

console.log('Listening on port ' + 8000 + '...');