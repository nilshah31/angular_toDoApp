/*
  User Auth is a registy file which maintans authontication routes, controller and directive.
*/
var app = angular.module("auth", ['ui.router'])
  .controller('loginCtrl', require('./controllers/loginCtrl')) //login controller
  .controller('signupCtrl', require('./controllers/signupCtrl')) //sign up controller

//defining confugrtion for the todo application : routes
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('signin', {
      url: "/signin",
      templateUrl: './user_auth/partials/partial-login.html',
      controller: 'loginCtrl',
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
      templateUrl: './user_auth/partials/partial-signup.html',
      controller: 'signupCtrl'
    })
}]);

module.exports = app
