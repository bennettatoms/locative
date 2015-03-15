'use strict';

angular.module('locativeApp')
.controller('UseCtrl', function($scope, $stateParams, UserService) {

  function getUserAndJourneysById(id) {
    UserService.getUserById(id)

    .then(function(user) {
      $scope.user = user; 
      console.log(JSON.stringify($scope.user));
      UserService.getUserJourneys($scope.user)
      .success(function(data) {
        console.log(JSON.stringify(data));
        $scope.journeys = data; 
      })
      .error(function() {
        console.log(status + 'Still Wrong!');
      });

    });
    // .error(function( data, status, headers, config ) {
    //   alert('GET: error');
    // });
  }

  function getUserById(id) {
    UserService.getUserById(id)
    .success(function(data) {
      console.log(JSON.stringify(data));
      $scope.user = data['user']; 
      $scope.journeys = data['journeys'];
      // return $scope.user;
    })
    .error(function(/* data, status, headers, config */) {
      alert('GET: error');
    });
  }

  function getUserJourneys(user) {
    UserService.getUserJourneys(user)
    .success (function(data) {
      console.log(data);
      $scope.journeys = data;
    })
    .error(function() {
      console.log(status + 'Still Wrong!');
    });
  }


  console.log($stateParams.userId);
  // getUserById($stateParams.userId);
  getUserById($stateParams.userId);

  $scope.logUser = function() {
    console.log($scope.user);
  };

  $scope.logJourneys = function() {
    console.log($scope.journeys);
  };

  // getUserJourneys($scope.user);

});

  // function getUserById(id) {
  //   UserService.getUserById(id)
  //   .success(function(data) {
  //     $scope.user = data;
  //   })
  //   .error(function(/* data, status, headers, config */) {
  //     alert('GET: error');
  //   });
  // }

  // function getUser(user) {
  //   UserService.getUser(user)
  //   .success(function(data) {
  //     $scope.user = data;
  //   })
  //   .error(function(/* data, status, headers, config */) {
  //     alert('GET: error');
  //   });
  // }

  // getUser($stateParams);