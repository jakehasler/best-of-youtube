'use strict';

/**
 * @ngdoc function
 * @name bestOfYoutubeApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the bestOfYoutubeApp
 */
angular.module('bestOfYoutubeApp')
  .controller('AdminCtrl', function (ConfigOptions, $scope, $firebaseObject, $firebaseArray) {


    var ref = new Firebase("https://the-best-of-youtube.firebaseio.com/config");

    var syncObject = $firebaseObject(ref);

    syncObject.$bindTo($scope, "config");

    $scope.groupNames = $firebaseArray(ref);

  	$scope.addGroup = function(groupName) {
  		//ConfigOptions.addGroupName(groupName);
  		$scope.groupNames.$add(groupName);
  		$scope.newGroup = "";
  		//console.log(ConfigOptions.totalGroups);
  	}

  	$scope.groupList = ConfigOptions.groupNames;





  });
