/**
 * Created by K-Gonzalez on 10/6/2015.
 */
'use strict';    

// App for the resource server example and a test page that displays test results
// of the UMA interactions with the authorization server

var app = angular.module('app', ['ngRoute', 'UMAAngular']);

app.config(function($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'appHome/home.html',
            controller: 'homeController'
        }).
        when('/exampleRS', {
            templateUrl: 'RSAppExample/templates/RSHome.html',
            controller: 'RSHomeController'
        }).
        when('/viewReports', {
            templateUrl: 'RSAppExample/templates/RSViewReports.html',
            controller: 'RSViewReportsController'
        }).
        when('/tests', {
            templateUrl: 'testPage/tests.html',
            controller: 'testsController'
        }).
        when('/testResReg', {
            templateUrl: 'testPage/testResourceRegistrationAPI/testResourceSetRegistration.html',
            controller: 'testResourceSetRegistrationController'
        }).
        otherwise({
            redirectTo: '/'
        });
});