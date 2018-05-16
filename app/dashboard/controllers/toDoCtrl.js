/*
  Used built.io beckend storage service to store todoList.
  user can add a new item to the list, can update exisiting item
  user can also delete the existing item.
  @scope.toDoList maintans all the user to-do task

*/

module.exports = [
  '$scope',
  'signOutService', //api for the signin
  'authService', //auth service maintains user session
  '$state', //to chenage the state of an application
  '$location',
  function ($scope, $window) {
    //getting item from the localstorage  
    //initlizeToDoList();
    //$scope.deltaObject = [];
    $scope.removeListItem = function (id) {
      index = $scope.toDoList.findIndex(element => element.object_id == id);
      //removing element from the array 
      $scope.toDoList.splice(index, 1);
      //updating localstorage object
      $window.localStorage.setItem('toDoListArray', JSON.stringify($scope.toDoList));
    }
    $scope.addListItem = function () {
      //checking whether user has passed value or not
      if (isVauePresent($scope.toDoItemTxtBox)) {
        //creating newObject with unique ID and default staus of the task 
        let newObj = {}
        newObj.object_id = $scope.toDoList.length;
        newObj.text = $scope.toDoItemTxtBox;
        newObj.status = false;
        $scope.toDoList.unshift(newObj); //inserting at the begining of the array
        $window.localStorage.setItem('toDoListArray', JSON.stringify($scope.toDoList)); //converting array into string
        $scope.toDoItemTxtBox = ""; //clearing new element textbox
      }
    }
    $scope.updateValue = function (value, id) {
      let index = $scope.toDoList.findIndex(element => element.object_id == id);
      //checking whether user has passed value or not
      if (isVauePresent(value)) {
        $scope.toDoList[index].text = value; //updating value based on index
        //converting array into string object and storing into localstorage
        $window.localStorage.setItem('toDoListArray', JSON.stringify($scope.toDoList));
        index = $scope.deltaObject.findIndex(element => element.object_id == id);
        $scope.deltaObject.splice(index, 1);
        if ($scope.deltaObject.length === 0) $scope.isUserEditing = false;
      }
    }

    $scope.cancleUpdateOperation = function (id) {
      index = $scope.deltaObject.findIndex(element => element.object_id == id);
      let oldValue = $scope.deltaObject[index].value;
      $scope.deltaObject.splice(index, 1);
      if ($scope.deltaObject.length === 0) $scope.isUserEditing = false;
      return (oldValue);
    }

    $scope.maintainUpdateValue = function (value, id) {
      let updateObj = {}
      updateObj.object_id = id;
      updateObj.value = value;
      $scope.deltaObject.push(updateObj);
      $scope.isUserEditing = true;
    }

    $scope.updateTaskStatus = function (index) {
      $scope.toDoList[index].status = !$scope.toDoList[index].status //updating value based on index
      //converting array into string object and storing into localstorage
      $window.localStorage.setItem('toDoListArray', JSON.stringify($scope.toDoList));
      initlizeToDoList();
    }

    function initlizeToDoList() {
      $scope.toDoList = JSON.parse($window.localStorage.getItem('toDoListArray')); //getting item from the localstorage
      if (angular.isUndefined($scope.toDoList) || $scope.toDoList === null || $scope.toDoList === '') $scope.toDoList = []
    }

    function isVauePresent(value) {
      if (value === '' || angular.isUndefined(value)) {
        $window.alert('Oops! you forget to enter your todo list value');
      } else {
        return true;
      }
    }

    $scope.filterData = function (newValue) {
      $scope.highlightedDiv = newValue;
      if (newValue === 0) $scope.displayStatus = false;
      else if (newValue == 1) $scope.displayStatus = true;
      else $scope.displayStatus = 2;
    }

  }];