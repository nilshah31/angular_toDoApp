/*
  login controller validates user credentials and starts the user session
*/
module.exports = [
  '$scope',
  'authService', //auth service maintains user session
  'getUserService',
  '$state',
  function ($scope, authService, getUserService, $state) {
    $scope.initUserData = function () {
      getUserService
        .getUserByAuthToken(authService.getAuthToken())
        .then(function (response) {
          $scope.uname = response.entity.objects[0].first_name+" "+response.entity.objects[0].last_name
          $scope.$apply();
        })
        .catch(function (err) {
          console.log(err)
          //notifyUser new error message
        })
    }
  }
];