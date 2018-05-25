var rest = require('rest');
mime = require('rest/interceptor/mime')
errorCode = require('rest/interceptor/errorCode');
var pathPrefix = require('rest/interceptor/pathPrefix');
var api_url = "https://api.built.io/v1/application/users/login"
var app_key = "bltdeeaf3338f327727"

module.exports = [
  function () {
    this.isUserValid = function (userID, userPassword) {
      var client = rest
        .wrap(mime, { mime: 'application/json' })
        .wrap(pathPrefix, { prefix: api_url })
        .wrap(errorCode, { code: 400 });
      return client({
        method: 'POST',
        headers: { 'application_api_key': app_key },
        entity: { "application_user": { "email": userID, "password": userPassword } }
      }).then(
        function (response) {
          return response;
        })
    }
  }
];

