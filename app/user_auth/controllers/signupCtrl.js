module.exports = [
  '$scope',
  'signUpService',
  '$state',
  function ($scope, signUpService,$state) {
    $scope.registerUser = function () {
      $scope.loading = true;
      var email = $scope.email,
          fname = $scope.fname,
          lname = $scope.lname,
          password = $scope.password,
          confirm_password = $scope.confirm_password
      signUpService
        .registerUser(email,fname,lname,password,confirm_password)
        .then(function (response) {
          $scope.loading = false;
          $state.go('signin') //rendering userdashboard
        })
        .catch(function (err) {
          $scope.loading = false;
        })
    }
  }
];

