var app = angular.module("auth", ['ui.router'])
  .controller('loginCtrl', require('./controllers/loginCtrl'))
  .controller('signupCtrl', require('./controllers/signupCtrl'))

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
            .isUserAlreadyLoggedIn()
            .then(function (result) {
              if (result)
                $state.go('userdashboard');
            })
            .catch(function (err) {
              $state.go('signin');
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
