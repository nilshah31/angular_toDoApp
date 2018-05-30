module.exports = [
  'authService',
  'getUserAPI',
  function (authService, getUserAPI) {
    var user = null;
    this.getUser = function () {
      if (user!==null){ 
        return new Promise(function(resolve,reject){resolve(user)});
      }
      else {
        //get the user based on auth token
        return getUserAPI
          .getUserByAuthToken(authService.getAuthToken())
          .then(function (response) {
            //if authtoken is invalid, response will be emty array
            if (response.entity.objects.length === 0)
              throw new Error('User Not Found')
            else { 
              user = response.entity.objects[0];
              return user;
            }
          })
          .catch(function (err) {
            //if user is not valid or had invalid auth token
            authService.removeAuthToken();
            //removing user 
            user = null;
            //redting to the signing page
            $state.go('signin');
          })
      }
    }
  }
];

