var app = angular.module('broadcastsApp', [ 'config', 'ngSanitize' ]);

app.controller('DashboardController', function ($scope, $http, $window, ENV) {
  var loadBroadcasts = function() {
    $http.get('/broadcasts/')
      .success(function(data) {
        $scope.broadcasts = data.broadcasts;
    });
  }
  loadBroadcasts();
  $scope.createForm = {
    name: '',
    uri: ''
  };

  // helper function for submitting
  function submit(callback) {
    var dataObject = {
      name: $scope.createForm.name,
      uri: $scope.createForm.uri
    };
    $http.post("/broadcasts/create", dataObject, {})
      .success(function(data, status, headers, config) {
        callback(true);
      }).error(function() {
        callback(false);
      });
  }

  // submits the form to create a broadcast and opens the broadcast
  $scope.createForm.submitAndOpen = function(item, event) {
    submit(function (result) {
      if (result) {
        $window.location.href = '/broadcast';
      } else {
        console.log("submitting the form failed");
      }
    });
  };

  // submits the form to create a broadcast and opens the broadcast
  $scope.createForm.submit = function(item, event) {
    submit(function (result) {
      if (result) {
        loadBroadcasts();
      } else {
        console.log("submitting the form failed");
      }
    });
  };

  // deletes the given broadcast
  $scope.delete = function(id) {
    $http.post("/broadcasts/delete/" + id, {}, {})
      .success(function(data, status, headers, config) {
        loadBroadcasts();
      })
      .error(function(data, status, headers, config) {
        console.log("deleting the broadcast failed");
      });
  };
});

app.controller('LinksController', function($scope, $http) {
  $http.get('/links/for/' + '?broadcast_id=56789')
    .success(function(data) {
      $scope.links = data.links;
  });
});

app.controller('VideoController', function($scope, $http) {
  $http.get('/broadcasts/' + '547fe728c80c16181d3c8b89')
    .success(function(data) {
      $scope.video = data;
  });
});

// TODO: how to get the broadcast id
app.controller('NotesController', function($scope, $http) {
  $http.get('/notes/' + '547fe728c80c16181d3c8b89')
    .success(function(data) {
      $scope.note = data.content;
  });
});

app.filter('trusted', ['$sce', function($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);

// TODO: how to populate note area after NotesController loads
app.directive("populateNote", function() {
  var linkFunction = function(scope, element, attributes) {
    var editor = $('.CodeMirror')[0].CodeMirror;

    //You can then use it as you wish
    editor.setValue($('#hidden-note').text());
    //editor.setValue('# test\n> blockquote');
  };

  return {
    restrict: "E",
    link: linkFunction
  };
});
