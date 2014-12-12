var app = angular.module('broadcastsApp', [ 'config', 'ngSanitize', 'ngCookies' ]);

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
    // https://www.youtube.com/watch?v=3qkbtPyUI08 -- old
    // https://www.youtube.com/embed/3qkbtPyUI08 -- new
    var new_uri = $scope.createForm.uri.replace(/watch/g, "embed").replace(/\?v=/g, "/");
    var dataObject = {
      name: $scope.createForm.name,
      uri: $scope.createForm.uri
    };
    $http.post("/broadcasts/create", dataObject, {})
      .success(function(data, status, headers, config) {
        callback(data);
      }).error(function(data, status, headers, config) {
        callback(data);
      });
  }

  // submits the form to create a broadcast and opens the broadcast
  $scope.createForm.submitAndOpen = function(item, event) {
    submit(function (result) {
      if (result) {
        $window.location.href = '/broadcast/' + result.id;
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

app.controller('LinksController', function($scope, $http, $cookies) {
  var loadLinks = function() {
    $http.get('/links/for/' + $cookies.broadcast_id)
      .success(function(data) {
        $scope.links = data.links;
    });
  }
  loadLinks();
  $scope.linkForm = {
    description: '',
    uri: '',
    time: ''
  };
  console.log($cookies.broadcast_id);
  var b_id = $cookies.broadcast_id;
  $scope.linkForm.create = function(item, event) {
    // www.youtube.com/watch?v=3qkbtPyUI08 -- old
    // http://www.youtube.com/embed/3qkbtPyUI08 -- new
    var new_uri = $scope.linkForm.uri;
    if (!$scope.linkForm.uri.match(/^http[s]?:\/\/?/g)) {
      new_uri = 'http://' + $scope.linkForm.uri;
    }
    var data = {
      description: $scope.linkForm.description,
      uri: new_uri,
      time: $scope.linkForm.time,
      broadcast_id: b_id
    };
    $http.post("/links/create", data, {})
      .success(function(data, status, headers, config) {
        loadLinks();
      })
      .error(function(data, status, headers, config) {
        console.log("could not create link");
      });
  };

  // deletes the given link
  $scope.delete = function(id) {
    console.log('deleting');
    $http.post("/links/delete/" + id, {}, {})
      .success(function(data, status, headers, config) {
        loadLinks();
      })
      .error(function(data, status, headers, config) {
        console.log("deleting the link failed");
      });
  };
  $scope.test = function(id) {
    console.log(id);
  };
});

app.controller('VideoController', function($scope, $http) {
  $http.get('/broadcasts/' + '547fe728c80c16181d3c8b89')
    .success(function(data) {
      $scope.video = data;
  });
});

// TODO: how to get the broadcast id
app.controller('NotesController', function($scope, $http, $cookies) {
  // the html editor
  var editor = $('.CodeMirror')[0].CodeMirror;

  // TODO: in future listen to key-up events and save after 2 seconds have 
  //       passed without event
  // save note every five seconds
  setInterval(function() {
    var dataObject = {
      content: editor.getValue(),
      broadcast_id: $cookies.broadcast_id
    };
    $http.post("/notes/update/" + $scope.note._id, dataObject, {})
      .success(function(data, status, headers, config) {
        console.log('saved successfully');
      }).error(function(data, status, headers, config) {
        console.log('failed to save');
      });
  }, 5000);

  // get notes for user and broadcast
  $http.get('/notes/' + $cookies.broadcast_id)
    .success(function(data) {
      $scope.note = data;
      editor.setValue(data.content);
  });
});

app.filter('trusted', ['$sce', function($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);
