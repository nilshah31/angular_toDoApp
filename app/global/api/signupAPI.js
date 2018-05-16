var rest = require('rest');
mime = require('rest/interceptor/mime')
errorCode = require('rest/interceptor/errorCode');
var pathPrefix = require('rest/interceptor/pathPrefix');
var api_url = "https://api.built.io/v1/application/users"
var app_key = "bltdeeaf3338f327727"

module.exports = [
  function () {
    this.registerUser = function (email,fname,lname,password,password_conf) {
        var app_user = {
            "email": email,
            "first_name": fname,
            "last_name": lname,
            "password": password,
            "password_confirmation": password_conf
        }
        var client = rest
          .wrap(mime,{ mime: 'application/json' })
          .wrap(pathPrefix, { prefix: api_url })
          .wrap(errorCode, { code: 400 });
        return client( {  
          method: 'POST', 
          headers: { 'application_api_key': app_key },
          entity: { "application_user": app_user }  
        }).then(
          function(response) {
            return response;
          },
          function(response) {
            return new Error("Error!!")
          }
        )
              
    }
  }
];

