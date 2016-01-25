'use strict';

/**
 * @ngdoc function
 * @name bestOfYoutubeApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the bestOfYoutubeApp
 */
angular.module('bestOfYoutubeApp')
  .controller('AdminCtrl', function ($scope, $firebaseObject, $firebaseArray, $mdDialog) {


    var ref = new Firebase("https://the-best-of-youtube.firebaseio.com/config");

    var syncObject = $firebaseObject(ref);

    syncObject.$bindTo($scope, "config");

    $scope.groupNames = $firebaseArray(ref);

  	$scope.addGroup = function(groupName) {
  		//ConfigOptions.addGroupName(groupName);
  		$scope.groupNames.$add(groupName);
  		$scope.newGroup = "";
  	}

  	$scope.remove = function(group, ev) {
    	//console.log(ev);
    	var confirm = $mdDialog.confirm()
          .title('Would you like to delete this video entry?')
          .textContent('You will have to input the link again')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes, Delete')
          .cancel('No, Don\'t Do it');

        $mdDialog.show(confirm).then(function() {
          $scope.groups.$remove(group);
	      $scope.status = 'You decided to get rid of your debt.';
	    }, function() {
	      $scope.status = 'You decided to keep your debt.';
	    });
    }


    $scope.generateBest = function() {
    	var ref = new Firebase("https://the-best-of-youtube.firebaseio.com/groups");
    	ref.once("value", function(snapshot) {
    		snapshot.forEach(function(childSnapshot) {
    			console.log(childSnapshot.key());
    			console.log(childSnapshot.val());
    		})
    	})
    	console.log($scope.groups);

    	$scope.groups[3].forEach(function() {

    		console.log(obj);
    	}) 
    
    }



  });
