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
          $scope.groupNames.$remove(group);
	      $scope.status = 'You decided to get rid of your debt.';
	    }, function() {
	      $scope.status = 'You decided to keep your debt.';
	    });
    }


    $scope.generateBest = function() {
    	var ref = new Firebase("https://the-best-of-youtube.firebaseio.com/groups/finals");
    	var ref2 = new Firebase("https://the-best-of-youtube.firebaseio.com/groups");
    	var syncObject = $firebaseObject(ref);
    	syncObject.$bindTo($scope, "finals");
		$scope.finals = $firebaseArray(ref);
    	
    	ref2.once("value", function(snapshot) {
    		// Going into each group
    		snapshot.forEach(function(childSnapshot) {
    			// Going into object of each group
    			var best = {upvotes: 0};
    			console.log("Best Upvotes: " + best.upvotes);
    			childSnapshot.forEach(function(newSnap) {
    			console.log("Snapshot Upvotes: " + newSnap.val().upvotes);
    				if(newSnap.val().upvotes > best.upvotes) {
    					best = newSnap;

    				}
    			})
    			console.log("Best Upvotes After: " + best.val().upvotes);
    			console.log("Best:");
    			$scope.finals.$add(best.val());
    			console.log(best.val());
    		})
    	})
    
    }



  });
