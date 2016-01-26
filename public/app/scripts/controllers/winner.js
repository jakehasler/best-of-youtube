'use strict';

/**
 * @ngdoc function
 * @name bestOfYoutubeApp.controller:WinnerCtrl
 * @description
 * # WinnerCtrl
 * Controller of the bestOfYoutubeApp
 */
angular.module('bestOfYoutubeApp')
  .controller('WinnerCtrl', function ($scope, $http, $firebaseObject, $firebaseArray, $mdDialog, $window, $routeParams) {

  	var firebaseUrl = "https://the-best-of-youtube.firebaseio.com/groups/finals"; 
  	console.log(firebaseUrl);
  	var ref = new Firebase(firebaseUrl);
    var syncObject = $firebaseObject(ref);

    syncObject.$bindTo($scope, "finals");

    $scope.groups = $firebaseArray(ref);

    console.log($scope.groups);

  });
