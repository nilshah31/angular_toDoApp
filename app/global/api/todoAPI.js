/*
  ToDo Api service deals withe the todomanger class and performs CRUD operations
*/
var rest = require('rest');
var mime = require('rest/interceptor/mime')
var errorCode = require('rest/interceptor/errorCode');
var pathPrefix = require('rest/interceptor/pathPrefix');
var app_key = "bltdeeaf3338f327727"
var api_url = "https://api.built.io/v1/classes/todomanager/objects"

module.exports = [
  function () {
    // User task based on the user id
    this.getUserToDoList = function (uid) {
      var api_url = "https://api.built.io/v1/classes/todomanager/objects"
      var headers_value = { "application_api_key": app_key }
      //json body and get query
      var entity_value = {
        "_method": "get",
        "query": {
          "user_id": uid,
        },
        "desc": "created_at"
      }
      //setting up error code, mime type, and setting api path 
      var client = rest
        .wrap(mime, { mime: 'application/json' })
        .wrap(pathPrefix, { prefix: api_url })
        .wrap(errorCode, { code: 400 });
      //calling an api and returing promise respose
      return client({
        method: 'POST',
        headers: headers_value,
        entity: entity_value
      }).then(
        //sucess function
        function (response) {
          return response;
        });
    }
    //new task, accepts newobj which will directly get stores into the database 
    this.addUserTask = function (newObj) {
      var headers_value = { "application_api_key": app_key }
      //json body and get query
      var entity_value = {
        "object": newObj
      }
      //setting up error code, mime type, and setting api path 
      var client = rest
        .wrap(mime, { mime: 'application/json' })
        .wrap(pathPrefix, { prefix: api_url })
        .wrap(errorCode, { code: 400 });
      //calling an api and returing promise respose
      return client({
        method: 'POST',
        headers: headers_value,
        entity: entity_value
      }).then(
        //sucess function
        function (response) {
          return response;
        });
    }
    // removing object from the database based on the object uid
    this.removeUserTask = function (uid) {
      var headers_value = { "application_api_key": app_key }
      var client = rest
        .wrap(mime, { mime: 'application/json' })
        .wrap(pathPrefix, { prefix: api_url + "/" + uid })
        .wrap(errorCode, { code: 400 });
      return client({
        method: 'DELETE',
        headers: headers_value,
      }).then(
        function (response) {
          return response;
        });
    }
    // updates database object, accepts updated object and object uid
    this.updateUserTask = function (deltaObject, uid) {
      var headers_value = { "application_api_key": app_key }
      var entity_value = {
        "object": deltaObject
      }
      var client = rest
        .wrap(mime, { mime: 'application/json' })
        .wrap(pathPrefix, { prefix: api_url + "/" + uid })
        .wrap(errorCode, { code: 400 });
      return client({
        method: 'PUT',
        headers: headers_value,
        entity: entity_value
      }).then(
        function (response) {
          return response;
        });
    }
  }
];

