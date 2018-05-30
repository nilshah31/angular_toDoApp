var app = angular.module("globalModules",[])
    .service('authService',require('./services/authService'))
    .service('signinService',require('./api/signinAPI'))
    .service('signOutService',require('./api/signoutAPI'))
    .service('getUserAPI',require('./api/getuserAPI'))
    .service('signUpService',require('./api/signupAPI'))
    .service('toDoService',require('./api/todoAPI'))
    .service('getUserService',require('./services/getuserservice'))
    .directive('userDirective',require('./directives/userDirective'))

    
module.exports = app
