/**
 * Created by kfgonzal on 10/14/2015.
 */
var express = require('express');
var path = require('path');
var events = require('./eventsController');

var app = express();

var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + 'app'));

app.get('/resourceSet/:rsid', events.get);

app.listen(8000);

console.log('Listening on port ' + 8000 + '...');