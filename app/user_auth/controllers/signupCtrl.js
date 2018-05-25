module.exports = [
  '$scope',
  'signUpService',
  '$state',
  'PNotify',
  function ($scope, signUpService, $state, PNotify) {
    //creates new user in the system
    $scope.registerUser = function () {
      //validating user password
      if ($scope.confirm_password === $scope.password) {
        // signup button object
        var signup_button = angular.element(document.querySelector("#signup-btn"));
        signup_button.button('loading')
        //defining parameters
        var email = $scope.email,
          fname = $scope.fname,
          lname = $scope.lname,
          password = $scope.password,
          confirm_password = $scope.confirm_password
        //calling an api to register an user
        signUpService
          .registerUser(email, fname, lname, password, confirm_password)
          .then(function (response) {
            //notifying user about the success
            PNotify.info({
              title: 'Please Activate your account to login!User Register Successfully!',
              delay: 9000
            });
            //reseting signup button 
            signup_button.button('reset')
            //redicting user to the sign in page
            $state.go('signin')
          }, function (xhr) {
            //checking the error code
            var err_msg = xhr.entity.errors.email?"Email ID is already Registered!!":"Something Went Wrong! Please try again" 
            //reseting signup button 
            signup_button.button('reset')
            //notifying user about the error
            PNotify.error({
              title: err_msg,
              delay: 6000
            });
          })
      }
      //if entered password and confirm password did not matched
      else {
        PNotify.error({
          title: "Entered Password should match with the confirmed password!!",
          delay: 5000
        })
      }
    }
  }
];

