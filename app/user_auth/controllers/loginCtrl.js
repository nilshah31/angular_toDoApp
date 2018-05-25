/*
  login controller validates user credentials and starts the user session
*/
module.exports = [
  '$scope',
  'signinService', //api for the signin
  'authService', //auth service maintains user session
  '$state', //to chenage the state of an application
  'PNotify', //notification service
  function ($scope, signinService, authService, $state,PNotify) {
    $scope.login = function () {      
      var login_button = angular.element(document.querySelector("#loginbtn")); //login button object
      login_button.button('loading') //changin button state to loading
      signinService
        .isUserValid($scope.uname, $scope.password) //gets resolved promise with the auth token
        .then(function (response) {
          login_button.button('reset') //reseting login button state
          authService.setUser(response.entity.application_user.authtoken); //setting the auth token in the localstorage
          $state.go('userdashboard') //rendering userdashboard
        })
        .catch(function (err) {
          login_button.button('reset') //reseting login button state
          PNotify.error({ //notifying user
            title: 'Please try again with the valid Credentials!',
            delay: 2000
          });
          $state.go('signin'); 
        })
    }
  }
];