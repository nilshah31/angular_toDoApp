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
        //logout api call with the help of the auth token
        signOutService
          .logout(authService.getAuthToken()) 
          .then(function (response) {
            //removing auth token from the localstorage
            authService.removeAuthToken()
            //making user as Null 
            $rootScope.user = null;
            //clearing todolist 
            $rootScope.toDoList = [];
            $rootScope.isDashboard=false;
            //reseting user action 
            $scope.isDisabled=false;
            //applying scope variable changes
            $rootScope.$apply(); 
            //notifying user 
            PNotify.success({ 
              title: 'Logout successfully!!', 
              delay: 4000
            });
            //rendering to signin page
            $state.go('signin') 
          },function(xhr){
            //notifying error to the user
            PNotify.error({ 
              title: 'Logout fail!!', 
              delay: 4000
            });
          })
      }
    }
  ];