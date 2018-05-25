module.exports = [
  '$scope',
  'signUpService',
  '$state',
  'PNotify',
  function ($scope, signUpService,$state,PNotify) {
    $scope.registerUser = function () {
      if($scope.confirm_password===$scope.password){  
      var signup_button = angular.element(document.querySelector("#signup-btn"));
      signup_button.button('loading')
      var email = $scope.email,
          fname = $scope.fname,
          lname = $scope.lname,
          password = $scope.password,
          confirm_password = $scope.confirm_password
      signUpService
        .registerUser(email,fname,lname,password,confirm_password)
        .then(function (response) {
          if(response instanceof Error) throw new Error("Email ID is already Registered!!")
          signup_button.button('reset')
          PNotify.info({
            title: 'Please Activate your account to login!User Register Successfully!',
            delay: 9000
          });
          $state.go('signin') //rendering userdashboard
        })
        .catch(function (err) {
          signup_button.button('reset')
          PNotify.error({
            title: err,
            delay: 6000
          });
        })
      }
      else{
        PNotify.error({
          title:"Entered Password should match with the confirmed password!!",
          delay:5000
        })
      }
    }
  }
];

