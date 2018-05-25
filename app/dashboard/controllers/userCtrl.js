/*
  user controller validates user credentials and starts the user session
  initUserData also makes getData call for the todo objects
*/
module.exports = [
  '$rootScope',
  '$scope',
  'authService', //auth service maintains user session
  'getUserService', //get user api service
  '$state', //state management service
  'PNotify', //notification service
  'toDoService', //todoService
  function ($rootScope, $scope, authService, getUserService, $state, PNotify, toDoService) {
    //initilizing user todo list and will gets the user profile
    $rootScope.initUserData = function () {
      if ($rootScope.user) { //rootScope.user maange user details
        toDoService
          .getUserToDoList($rootScope.user.uid) //getting user todo list
          .then(function (response) {
            var toDoList = response.entity.objects; //a local todolist varibable intilization
            $rootScope.displayStatus = 2 //displayFilter
            $rootScope.toDoList = [] //initilizing todo list
            for (var key in toDoList) //looping entire user database todolist
              $rootScope.toDoList.push(toDoList[key]) //pushing all the todo list with respect to the user
            $rootScope.$apply(); //updating scope variables
          });
      }
      else { //if user has been not initlized
        getUserService
          .getUserByAuthToken(authService.getAuthToken()) //trying to get the user based on auth token
          .then(function (response) {
            if (response.entity.objects.length === 0) //if authtoken is invalid, response will be emty array
              throw new Error('User Not Found')
            else {
              $rootScope.user = response.entity.objects[0]; //aleays first respose object will be the user
              $scope.uname = $rootScope.user.first_name + " " + $rootScope.user.last_name //setting up user name
            }
          })
          .then(function () {
            //Ininilizing user todo list data 
            toDoService
              .getUserToDoList($rootScope.user.uid)
              .then(function (response) {
                $rootScope.isLoading = false; //loader
                var toDoList = response.entity.objects; //initilizing todoList
                $rootScope.toDoList = []
                for (var key in toDoList)
                  $rootScope.toDoList.push(toDoList[key]) //pushing all the reponse object to the scope array
                $scope.$apply();
              });
          })
          .catch(function (err) {
            authService.removeAuthToken(); //if user is not valid or had invalid user auth token
            $rootScope.user = null; //removing user
            $rootScope.$apply();
            $state.go('signin'); //redting to the signing page
          })
      }
    }
  }
];