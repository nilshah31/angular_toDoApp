var rest = require('rest');
mime = require('rest/interceptor/mime')
errorCode = require('rest/interceptor/errorCode');
var pathPrefix = require('rest/interceptor/pathPrefix');
var api_url = "https://api.built.io/v1/classes/built_io_application_user/objects"
var app_key = "bltdeeaf3338f327727"

module.exports = [
  function () {
    this.getUserByAuthToken = function (authToken) {
      var headers_value = { "application_api_key": app_key }
      var entity_value = {
        "_method": "get",
        "query": {
          "authtokens": authToken
        }
      }
      var client = rest
        .wrap(mime, { mime: 'application/json' })
        .wrap(pathPrefix, { prefix: api_url })
        .wrap(errorCode, { code: 400 });
      return client({
        method: 'POST',
        headers: headers_value,
        entity: entity_value
      }).then(function (response) {
        return response;
      });
    }
  }
];

