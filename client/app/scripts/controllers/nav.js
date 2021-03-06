'use strict';

angular.module('locativeApp')

.controller('NavCtrl', 
  ['$scope', '$rootScope', '$state', '$browser', 'AuthService', 
  function ($scope, $rootScope, $state, $browser, AuthService) {

  // See if we already have a session
  AuthService.getSession().success(function(user) {
    $scope.user = user;
  });

  $scope.tabs = [
    { state: 'home',     label: 'Home',        active: true,  isPublic: true  },
    { state: 'user({userId: user.id})',     label: 'My Journeys', active: false, isPublic: false }
  ];

  $scope.getTabClass = function(tab) {
    return tab.active ? 'active' : '';
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.tabs.forEach(function(tab) {
      tab.active = $state.is(tab.state);
    });
  });

  $scope.isAuthenticated = function() {
    return !!$scope.user;
  };

  // attached to an ngShow attribute on the tab itself
  $scope.showTab = function(tab) {
    return tab.isPublic || $scope.isAuthenticated();
  };

  // See if we already have a session
  AuthService.getSession().success(function(user) {
    $scope.user = user;
  });

  $scope.signOut = function() {
    console.log('NavCtrl.logout');
    AuthService.signOut().success(function() {
      $rootScope.$emit('auth:sign-out');
    });
  };

  $rootScope.$on('auth:new-sign-up', function(event, user) {
    
    $scope.user = user;
    $state.go('users');
  });

  $rootScope.$on('auth:sign-in', function(event, user) {
    $scope.user = user;
    $state.go('users');
  });

  $rootScope.$on('auth:sign-out', function(/* event, user */) {
    $scope.user = null;
    $state.go('home');
  });
}]);
