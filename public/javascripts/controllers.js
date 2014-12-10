var app = angular.module('broadcastsApp', [ 'config', 'ngSanitize' ]);

app.controller('DashboardController', function ($scope, $http, ENV) {
  $http.get('/broadcasts/')
    .success(function(data) {
      $scope.broadcasts = data.broadcasts;
  });
});

app.controller('LinksController', function($scope, $http) {
  $http.get('/links/for/' + '?broadcast_id=56789')
    .success(function(data) {
      $scope.links = data.links;
  });
});

app.controller('VideoController', function($scope, $http) {
  $http.get('/broadcasts/' + '547fe734c80c16181d3c8b8a')
    .success(function(data) {
      console.log(data.uri);
      $scope.video = data;
  });
});

app.controller('NotesController', function($scope, $http) {
  $http.get('/notes/' + '547fe734c80c16181d3c8b8a')
    .success(function(data) {
      console.log(data.uri);
      $scope.video = data;
  });
});

app.filter('trusted', ['$sce', function($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);
