/*
  login controller validates user credentials and starts the user session
*/
module.exports = [
    '$scope',
    'signOutService', //api for the signin
    'authService', //auth service maintains user session
    '$state', //to chenage the state of an application
    '$location',
    function ($scope, signOutService, authService, $state,$location) {
      $scope.logout = function () {      
        signOutService
          .logout(authService.getAuthToken()) //gets resolved promise with the auth token
          .then(function (response) {
            authService.removeAuthToken()
            $state.go('signin') //rendering to signin page
          })
          .catch(function (err) {
            //notifyUser new error message
          })
      }
    }
  ];