/**
 * Created by kfgonzal on 11/18/2015.
 */
// I return the promise, in case the implementer needs to manipulate the sequence of occurring calls based on promises
// For example, for some reason they create all sets then immediately want to update all sets.
// they would need to wait on create promises to resolve before trying to update
var requestPromise = require('request-promise'),
    ASEndpoints = require('../authorizationServerEndpoints');

/**
 * Use future buildRequest utils or helper method for REST requests
 *
 * Attempted to break out the http requests but because of the way the httpPromise works,
 * retrieving and dealing with data outside of the promise was troubling
 * */
module.exports = {
    /* CREATE
     * Params:  token - PAT of resource owner
     *          ResourceSet - resource set to be protected
     *          res - response passed from parent request
     * Return:  Promise function */
    createRS: function(token, ResourceSet) { // Create/register a new resource set with the AS
        var options = {
            uri: ASEndpoints.getRSRegEP(),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: ResourceSet.toJSONForAS(),
            resolveWithFullResponse: true,
            json: true
        };

        var promise = requestPromise(options);
        promise.then(
            function(response){
                console.log('CREATE - SUCCESS: ' + response.statusCode);
                console.log("Data: " + JSON.stringify(response.body));
            },
            function(err){
                console.log('CREATE - ERROR: ' + err.statusCode);
            });
        return promise;
    },
    readRS: function(token, rsid) { // Read the details of a specific resource set at the AS
        var options = {
            uri: ASEndpoints.getRSRegEP() + '/' + rsid,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            resolveWithFullResponse: true,
            json: true
        };

        var promise = requestPromise(options);
        promise.then(
            function(response){
                console.log('READ - SUCCESS: ' + response.statusCode);
                console.log('Data: ' + JSON.stringify(response.body));
            },
            function(err){
                console.log('READ - ERROR: ' + err.statusCode);
    });
        return promise;
    },
    updateRS: function(token, ResourceSet) { // Update resource Set at the AS
        var options = {
            uri: ASEndpoints.getRSRegEP() + '/' + ResourceSet['rsid'],
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            // RS_description with updated info
            body: ResourceSet.toJSONForAS(),
            resolveWithFullResponse: true,
            json: true
        };

        var promise = requestPromise(options);
        promise.then(
            function(response){
                console.log('UPDATE - SUCCESS: ' + response.statusCode);
                console.log("Data: " + JSON.stringify(response.body));
            },
            function(err){
                console.log('UPDATE - ERROR: ' + err.statusCode);
            });
        return promise;
    },
    deleteRS: function(token, rsid) {
        var options = {
            uri: ASEndpoints.getRSRegEP() + '/' + rsid,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            resolveWithFullResponse: true,
            json: true
        };

        var promise = requestPromise(options);
        promise.then(
            function(response){
                console.log('DELETE - SUCCESS: ' + response.statusCode);
                console.log('Data: ' + JSON.stringify(response.body));
            },
            function(err){
                console.log('DELETE - ERROR: ' + err.statusCode);
            });
        return promise;
    },
    listAll: function(token) {
        var options = {
            uri: ASEndpoints.getRSRegEP(),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            resolveWithFullResponse: true,
            json: true
        };

        var promise = requestPromise(options);
        promise.then(
            function(response){
                console.log('LIST - SUCCESS: ' + response.statusCode);
                console.log('Data: ' + JSON.stringify(response.body));
            },
            function(err){
                console.log('LIST - ERROR: ' + err.statusCode);
            });
        return promise;
    }
};