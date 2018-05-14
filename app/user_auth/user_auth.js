var app = angular.module("auth", ['ui.router']);

//defining confugrtion for the todo application : routes
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('signin', {
      url: "/signin",
      templateUrl: './user_auth/partials/partial-login.html'
    })
     .state('signup', {
       url: "/signup",
       templateUrl: './user_auth/partials/partial-signup.html'
     })
}]); 

module.exports = app