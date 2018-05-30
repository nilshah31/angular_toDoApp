/*
  Retireves user information based on the auth token
*/
module.exports = [
  'getUserService',
  function (getUserService,authService) {
    return {
      restrict: 'A',
      template: '',
      link: function (scope, element, attr) {
        getUserService
          .getUser()
          .then(function(user){
            element.append(user.first_name+" "+user.last_name);   
          }) 
      }
    };
  }
];