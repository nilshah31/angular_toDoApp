var app = angular.module("userDashboard", [])
  .controller('logoutCtrl', require('./controllers/logoutCtrl'))
  .controller('userCtrl', require('./controllers/userCtrl'))
  .controller('toDoCtrl', require('./controllers/toDoCtrl'))


//defining confugrtion for the todo application : routes
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('userdashboard', {
      url: "/userdashboard",
      templateUrl: "./dashboard/partials/user-dashboard.html",
      resolve: {
        user_auth: function (authService,$state) {
          return authService
            .isUserAlreadyLoggedIn()
            .catch(function(err){
              $state.go('signin');
              return(err);
            })
        }
      }
    })
}]);

module.exports = app;


















