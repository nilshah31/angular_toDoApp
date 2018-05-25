var rest = require('rest');
var mime = require('rest/interceptor/mime')
var errorCode = require('rest/interceptor/errorCode');
var pathPrefix = require('rest/interceptor/pathPrefix');
var api_url = "https://api.built.io/v1/application/users/logout"
var app_key = "bltdeeaf3338f327727"

module.exports = [
  function () {
    this.logout = function (access_token) {
      var headers_value = { "application_api_key": app_key, "authtoken": access_token }
      var client = rest
        .wrap(mime, { mime: 'application/json' })
        .wrap(pathPrefix, { prefix: api_url })
        .wrap(errorCode, { code: 400 })
      return client({
        method: 'DELETE',
        headers: headers_value
      }).then(
        function (response) {
          return response;
        });
    }
  }
];

