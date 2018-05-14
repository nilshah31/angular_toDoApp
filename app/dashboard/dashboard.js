var app = angular.module("userDashboard", []);

//defining confugrtion for the todo application : routes
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('userdashboard', {
      url: "/userdashboard",
      templateUrl: "./dashboard/partials/user-dashboard.html"
    })
}]);

module.exports = app;
