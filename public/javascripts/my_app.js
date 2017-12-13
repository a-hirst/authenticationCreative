angular.module('myApp', ['firebase' ]).
  controller('myController', ['$scope', '$http', '$firebaseArray',
                              function($scope, $http, $firebaseArray) {
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      console.log('user: ' + $scope.user);
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
    var ref = firebase.database().ref().child("messages");
   $scope.chats = $firebaseArray(ref);
     console.log($scope.chats);
     $scope.update = function(user) {
       console.log("name:" + $scope.user.username);
       var newmessage = {from: $scope.user.username || "anonymous",body:user.chat};
       console.log(newmessage);
       $scope.chats.$add(newmessage);
       user.chat = "";
   }
  }]);

