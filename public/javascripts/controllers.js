var app = angular.module('broadcastsApp', [ 'config' ]);

app.controller('DashboardController', function ($scope, $http, ENV) {
  $http.get(ENV.root_uri + '/broadcasts/')
    .success(function(data) {
      $scope.broadcasts = data.broadcasts;
  });
});
