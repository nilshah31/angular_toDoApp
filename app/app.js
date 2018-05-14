var path = require('path');
var angular = require('angular');
var ui_router = require('angular-ui-router');
var user_auth = require('./user_auth/user_auth.js'); //for user authontication management
var user_dashboard = require('./dashboard/dashboard.js');

//defining base_modules which will inject to the main application module as a dependancy 
var base_modules = [
  user_auth.name,
  user_dashboard.name,
  'ui.router'
]

//defining to do Angluar application
var app = angular.module("toDoApp", base_modules);

//defining confugrtion for the todo application : routes
app.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/signin','/signin');
    $urlRouterProvider.when('/signup','/signup');
    $urlRouterProvider.when('/','/userdashboard/');
    $urlRouterProvider.when('/userdashboard','/userdashboard/');
    $urlRouterProvider.otherwise('/signin');
}]);