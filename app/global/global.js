var app = angular.module("globalModules",[])
    .service('authService',require('./services/authService'))
    .service('signinService',require('./api/signinAPI'))
    .service('signOutService',require('./api/signoutAPI'))
    .service('getUserService',require('./api/getuserAPI'))
    .service('signUpService',require('./api/signupAPI'))
    
module.exports = app
