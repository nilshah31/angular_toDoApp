module.exports = [
  'authService',
  'getUserAPI',
  function (authService, getUserAPI) {
    this.getUser = function(){
      //get the user based on auth token
      getUserAPI
        .getUserByAuthToken(authService.getAuthToken())
        .then(function (response) {
          //if authtoken is invalid, response will be emty array
          if (response.entity.objects.length === 0)
            throw new Error('User Not Found')
          else return response;
        })
        .catch(function (err) {
          //if user is not valid or had invalid auth token
          authService.removeAuthToken();
          //removing user 
          $scope.user = null;
          $scope.$apply();
          //redting to the signing page
          $state.go('signin');
        })
    }
  }
];

