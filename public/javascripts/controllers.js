var app = angular.module('broadcastsApp', []);

app.controller('DashboardController', function ($scope, $http) {
  $http.get('http://localhost:3000/broadcasts/')
    .success(function(data) {
      $scope.broadcasts = data.broadcasts;
  });
});
