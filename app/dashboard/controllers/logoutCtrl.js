/*
  logout controller removes user authTken and and clears the user session
*/
module.exports = [
    '$scope',
    'signOutService', //api for the signin
    'authService', //auth service maintains user session
    '$state', //to chenage the state of an application
    '$rootScope',
    'PNotify',
    function ($scope, signOutService, authService, $state,$rootScope,PNotify) {
      $scope.isDisabled=false;
      $scope.logout = function () {      
        signOutService
          .logout(authService.getAuthToken()) //logout api call with the help of the auth token
          .then(function (response) {
            authService.removeAuthToken() //removing auth token from the localstorage
            $rootScope.user = null; //making user as Null
            $rootScope.toDoList = [];
            $rootScope.$apply(); //applying scope variable changes
            PNotify.success({ 
              title: 'Logout successfully!!', //notifying user
              delay: 4000
            });
            $rootScope.isDashboard=false;
            $scope.isDisabled=false;
            $state.go('signin') //rendering to signin page
          },function(xhr){
            console.log("xhr",xhr);
          })
      }
    }
  ];