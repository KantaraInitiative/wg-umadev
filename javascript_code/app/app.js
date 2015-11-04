/**
 * Created by kfgonzal on 10/6/2015.
 */
'use strict';    

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'templates/RSHome.html',
            controller: 'RSHomeController'
        }).
        when('/viewReports', {
            templateUrl: 'templates/RSViewReports.html',
            controller: 'RSViewReportsController'
        }).
        when('/testResReg', {
            templateUrl: 'testPages/testResourceSetRegistration.html',
            controller: 'testResourceSetRegistrationController'
        }).
        otherwise({
            redirectTo: '/'
        });
});