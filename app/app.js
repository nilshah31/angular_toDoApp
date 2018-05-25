var path = require('path');
var angular = require('angular'); //importing angular module
var ui_router = require('angular-ui-router'); //ui routing handler
var user_auth = require('./user_auth/user_auth.js'); //for user authontication management
var user_dashboard = require('./dashboard/dashboard.js'); //dashboard regitery file
var global = require("./global/global.js") //shared regitery file
var PNotify = require('pnotify/dist/umd/PNotify'); //alert notication module
require('angular-animate');
require('ng-focus-if')

//defining base_modules which will inject to the main application module as a dependancy 
var inject_modules = [
  user_auth.name,
  user_dashboard.name,
  global.name,
  'ui.router',
  'focus-if' 
]

//defining to do Angluar application
var app = angular
  .module("toDoApp", inject_modules)
  .value('PNotify', PNotify.default);

//defining confugrtion for the todo application : routes
app.config([
  '$stateProvider', 
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    /*Routing User to the appropirate page based on the url*/
    $urlRouterProvider.when('/signin','/signin');
    $urlRouterProvider.when('/signup','/signup'); 
    $urlRouterProvider.when('/','/userdashboard/');
    $urlRouterProvider.when('/userdashboard','/userdashboard/');
    $urlRouterProvider.otherwise('/signin'); //if no url provided or anauthorized user
}]);