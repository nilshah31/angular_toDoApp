/*
  login controller validates user credentials and starts the user session
*/
module.exports = [
  '$scope',
  'signinService', //api for the signin
  'authService', //auth service maintains user session
  '$state', //to chenage the state of an application
  function ($scope, signinService, authService, $state) {
    $scope.login = function () {      
      $scope.loading = true;
      signinService
        .isUserValid($scope.uname, $scope.password) //gets resolved promise with the auth token
        .then(function (response) {
          $scope.loading = false;
          authService.setUser(response.entity.application_user.authtoken); //setting the auth token in the localstorage
          $state.go('userdashboard') //rendering userdashboard
        })
        .catch(function (err) {
          $scope.loading = false;
          $scope.errorMessage = "Invalid User!! Please make sure you have activated your account and entered valid credentials"; //if user is invalid setting new error message
          $state.go('signin')
        })
    }
  }
];