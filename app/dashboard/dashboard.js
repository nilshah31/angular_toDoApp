var signoutCtrl = require('./controllers/signoutCtrl');
var userCtrl = require('./controllers/userCtrl');
var todoCtrl = require('./controllers/toDoCtrl');
var dashboard_template_url = "./dashboard/partials/user-dashboard.html";
var dashboard_url = "/userdashboard";
var dashboard_ctroller = "toDoCtrl";

var app = angular.module("userDashboard", [])
  .controller('signoutCtrl', signoutCtrl)
  .controller('userCtrl', userCtrl)
  .controller('toDoCtrl', todoCtrl)

//defining confugrtion for the todo application : routes for the user dashboard
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('userdashboard', {
      url: dashboard_url,
      templateUrl: dashboard_template_url,
      controller: dashboard_ctroller,
      resolve: {
        user_auth: function (authService, $state) {
          //checking if user is already logged in
          return authService 
            .isUserAlreadyLoggedIn()
            .catch(function (err) {
              $state.go('signin');
              return (err);
            })
        },
      }
    })
}]);

module.exports = app;


















