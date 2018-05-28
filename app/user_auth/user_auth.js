/*
  User Auth is a registy file which maintans authontication routes, controller and directive.
*/
var signinCtrl = require('./controllers/signinCtrl');
var signupCtrl = require('./controllers/signupCtrl');
var signin_template_url = "./user_auth/partials/partial-login.html";
var signup_template_url = './user_auth/partials/partial-signup.html'

var app = angular.module("auth", ['ui.router'])
  .controller('signinCtrl', signinCtrl) //login controller
  .controller('signupCtrl', signupCtrl) //sign up controller

//defining confugrtion for the todo application : routes
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('signin', {
      url: "/signin",
      templateUrl: signin_template_url,
      controller: 'signinCtrl',
      resolve: {
        user_auth: function (authService, $state) {
          return authService
            .isUserAlreadyLoggedIn() //checking is user is already logged in
            .then(function (result) {
              if (result)
                $state.go('userdashboard'); //redirecting user to the dashboard if user is already logged in
            })
            .catch(function (err) {
              $state.go('signin'); //redicting user to the dashboard if user has been not logged in
              return (err);
            })
        }
      }
    })
    .state('signup', {
      url: "/signup",
      templateUrl: signup_template_url,
      controller: 'signupCtrl',
      resolve: {
        user_auth: function (authService, $state) {
          return authService
            .isUserAlreadyLoggedIn() //checking is user is already logged in
            .then(function (result) {
              if (result)
                $state.go('userdashboard'); //redirecting user to the dashboard if user is already logged in
            })
            .catch(function (err) {
              $state.go('signup'); //redicting user to the dashboard if user has been not logged in
              return (err);
            })
        }
      }
    })
}]);

module.exports = app
