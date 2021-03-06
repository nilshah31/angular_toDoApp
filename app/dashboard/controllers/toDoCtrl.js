/*
  Used built.io beckend storage service to store todoList.
  user can add a new item to the list, can update exisiting item.
  user can also delete the existing item.
  @scope.todolist maintans all the user to-do task
*/
module.exports = [
  'getUserService',
  '$scope',
  '$rootScope',
  'toDoService', //api call service for the todo beck-end class
  'PNotify', //notification service
  function (getUserService,$scope, $rootScope, todoService, PNotify) {
    //delta object maintains updated and old task names (update opeation)
    $scope.deltaObject = "";
    //setting default filter tab to active task's
    $scope.displayStatus = false;
    //tracks user actions
    $rootScope.isUserEditing = false;
    //header view  
    $rootScope.isDashboard = true;
    //initilizing user data
    $rootScope.isLoading = true; //loader
    getUserService.getUser().then(function(user){
      $rootScope.user = user; 
      $scope.getTodoList(user.uid)
      $rootScope.isLoading = false; //loader
    });
    //removing task from the user database
    $scope.removeUserTask = function (uid) {
      //showing loader to the user
      $scope.loading = uid;
      $rootScope.isUserEditing = true;
      //api call for removing user task 
      index = $scope.todolist.findIndex(element => element.uid == uid);
      //removing element from the array 
      $scope.toDoList.splice(index, 1);
      //based on the uid of the object removing task and notifying user
      todoService
        .removeUserTask(uid)
        .then(function (response) {
          $scope.loading = "";
          PNotify.info({
            title: 'Task Removed Successfully',
            delay: 4000
          });
          //enabling other buttons
          $rootScope.isUserEditing = false;
        }, function (xhr) {
          $rootScope.isUserEditing = false;
          PNotify.error({
            title: 'Something went wrong!!', //notifying user
            delay: 4000
          });
        })
    }
    $scope.addTask = function () {
      //checking whether user has passed value or not"
      if (isVauePresent($scope.toDoItemTxtBox)) {
        $scope.isUserEditing = true;
        //addTaskBtn changes the status of the button to the loading and vice versa
        var addTaskbtn = angular.element(document.querySelector("#addTaskbtn"));
        addTaskbtn.button('loading');
        //creating newObject with the default staus of the task
        var newObj = {
          "task_name": $scope.toDoItemTxtBox,
          "status": false, //default status 
          "user_id": $rootScope.user.uid //user id tracks the user respictive tasks
        }
        todoService
          .addUserTask(newObj) //api call to add user task
          .then(function (response) {
            PNotify.success({ //notifying user 
              title: 'Task Added Successfully',
              delay: 4000 //notification delay time
            });
            $scope.isUserEditing = false;
            addTaskbtn.button('reset'); //enabling add task button
            $scope.getTodoList($rootScope.user.uid); //inilizing todo list
            $scope.toDoItemTxtBox = ""; //clearing new task textbox
          }, function (xhr) {
            $scope.isUserEditing = false;
            addTaskbtn.button('reset'); //enabling add task button
            PNotify.error({
              title: 'Something went wrong!!',
              delay: 4000
            });
          })
      }
    }
    $scope.updateValue = function (value, uid) {
      //checking whether user has passed value or not    
      if (isVauePresent(value)) { //value must be present to update 
        if ($scope.deltaObject !== value) { //should be a new value
          //updating user task name.
          var deltaObj = {
            "task_name": value,
          }
          //api which updates user task, takes two parameter updated object and objct uid 
          todoService
            .updateUserTask(deltaObj, uid)
            .then(function (response) {
              PNotify.success({
                title: 'Task Updated Successfully',
                delay: 4000
              });
            }, function (xhr) {
              $scope.isUserEditing = false;
              PNotify.error({
                title: 'Something went wrong!!',
                delay: 4000
              });
            });
          //updating scope todoList
          index = $scope.todolist.findIndex(element => element.uid == uid);
          $scope.todolist[index].task_name = value;
          $scope.isUserEditing = false; //enabling other action buttons
        }
        //if new value is same as old value
        else {
          //enabling other action buttons
          $scope.isUserEditing = false;
        }
      }
      //if user has removed value from the text box
      else {
        $scope.removeUserTask(uid);
        //enabling other action buttons
        $scope.isUserEditing = false;
      }
    }
    //when user starts performing update operation, deltaObject maintains old value
    $scope.maintainUpdateValue = function (value) {
      //stores old value for the update
      $scope.deltaObject = value;
      //disabling user actions
      $scope.isUserEditing = true;
    }
    //updating user task
    $scope.updateTaskStatus = function (element) {
      //calling user task update api
      todoService
        .updateUserTask(element, element.uid)
        .then(function (response) {
          //notifying staus to user
          PNotify.success({
            title: 'Task Status Updated Successfully',
            delay: 4000
          });
        }, function (xhr) {
          PNotify.error({
            title: 'Something went wrong!!',
            delay: 4000
          });
        })
      //updating scope todolist for a quick response 
      var uid = element.uid;
      index = $scope.todolist.findIndex(element => element.uid == uid);
      $scope.todolist[index].status = element.status;
    }
    /* Utility functions */
    function isVauePresent(value) {
      if (!(value === '' || angular.isUndefined(value)))
        return true
    }
    //toggles between active task and completed tasks
    $scope.filterData = function (newValue) {
      $scope.isAllSelected = newValue;
      $scope.displayStatus = newValue;
    }
    //select all or batch update
    $scope.toggleAll = function () {
      //checkbox toggle status value
      var toggleStatus = $scope.isAllSelected;
      //checking filter tab
      if ($scope.displayStatus == false) {
        //updating all the not completed task to completed
        angular.forEach($scope.toDoList, function (element) {
          if (element.status == false) {
            element.status = toggleStatus;
            //update user task api call updated object and object id
            todoService.updateUserTask(element, element.uid)
          }
        });
      }
      //updating all the completed task to not completed
      else {
        angular.forEach($scope.toDoList, function (element) {
          if (element.status == true) {
            element.status = toggleStatus;
            todoService.updateUserTask(element, element.uid) //updated object and object id
          }
        });
      }
    }
    $scope.getTodoList = function (uid) {
      todoService
      .getUserToDoList(uid)
      .then(function (response) {
        var toDoList = response.entity.objects; //initilizing todoList
        $scope.todolist = []
        for (var key in toDoList)
          $scope.todolist.push(toDoList[key]) //pushing all the reponse object to the scope array
        $scope.$apply();
      });
    }
  }];