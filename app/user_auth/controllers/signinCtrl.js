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
      //login button object
      var login_button = angular.element(document.querySelector("#loginbtn")); 
      //changin button state to loading
      login_button.button('loading')
      //gets resolved promise with the auth token 
      signinService
        .isUserValid($scope.uname, $scope.password) 
        .then(function (response) {
          //reseting login button state
          login_button.button('reset') 
          //setting the auth token in the localstorage
          authService.setUser(response.entity.application_user.authtoken); 
          //rendering userdashboard
          $state.go('userdashboard') 
        },function(xhr){
          //reseting login button state
          login_button.button('reset')
          //notifying user 
          PNotify.error({ 
            title: 'Please try again with the valid Credentials!',
            delay: 2000
          });
          $state.go('signin');
        })
    }
  }
];