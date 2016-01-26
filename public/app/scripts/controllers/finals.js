'use strict';

/**
 * @ngdoc function
 * @name bestOfYoutubeApp.controller:GroupIdCtrl
 * @description
 * # GroupIdCtrl
 * Controller of the bestOfYoutubeApp
 */
angular.module('bestOfYoutubeApp')
  .controller('FinalsCtrl', function ($scope, $http, $firebaseObject, $firebaseArray, $mdDialog, $window, $routeParams) {

  	var firebaseUrl = "https://the-best-of-youtube.firebaseio.com/groups/finals"; 
  	console.log(firebaseUrl);
  	var ref = new Firebase(firebaseUrl);
    var syncObject = $firebaseObject(ref);

    syncObject.$bindTo($scope, "finals");

    $scope.groups = $firebaseArray(ref);

    console.log($scope.groups);

    $scope.groupName = $routeParams.id;

    if(!parseInt(sessionStorage.getItem("upvotes"))) {
    	$window.sessionStorage.setItem("upvotes", 0);
    }

    $scope.upvote = function(object, ev) {
    	var upvotes = parseInt(sessionStorage.getItem("upvotes"));
    	$window.sessionStorage.setItem("upvotes", upvotes + 1);
    	if(parseInt($window.sessionStorage.getItem("upvotes")) > 2) {
    		$mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('#popupContainer')))
		        .clickOutsideToClose(true)
		        .title('Vote Count Exceeded!')
		        .textContent('Sorry, you can only vote twice.')
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Okay!')
		        .targetEvent(ev)
		    );
    	}
    	else {
    		var item = $scope.groups.$getRecord(object.$id);
	    	item.upvotes++;
	    	$scope.groups.$save(item).then(function() {
				console.log($scope.groups);
	    	})
    	}
    		
    }


    $scope.remove = function(url, ev) {
    	//console.log(ev);
    	var confirm = $mdDialog.confirm()
          .title('Would you like to delete this video entry?')
          .textContent('You will have to input the link again')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Yes, Delete')
          .cancel('No, Don\'t Do it');

        $mdDialog.show(confirm).then(function() {
          $scope.groups.$remove(url);
	      $scope.status = 'You decided to get rid of your debt.';
	    }, function() {
	      $scope.status = 'You decided to keep your debt.';
	    });
    }


	 var getParameterByName = function(name) {
	 	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

	 }

	$scope.getYoutube = function(youtubeUrl, ev) {

		var getParameterByName = function(name, youtubeUrl) {
		 	var match = RegExp('[?&]' + name + '=([^&]*)').exec(youtubeUrl);
	    	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
		}

		var id = "";

		if(/youtu.be/.test(youtubeUrl))
		{
			console.log('Mobile URL');
			var test = RegExp('.be/([^]*)').exec(youtubeUrl);
			test = decodeURIComponent(test[1].replace(/\+/g, ' '));
			id = test;
			$scope.runYouTubeData(id);
		}
		else if(/youtube/.test(youtubeUrl)) {
			console.log('Desktop URL');
			id = getParameterByName("v", youtubeUrl);
			$scope.runYouTubeData(youtubeUrl, id);
		}
		else {
			$mdDialog.show(
		      $mdDialog.alert()
		        .parent(angular.element(document.querySelector('#popupContainer')))
		        .clickOutsideToClose(true)
		        .title('Sorry!')
		        .textContent('Please Enter a valid YouTube URL')
		        .ariaLabel('Alert Dialog Demo')
		        .ok('Okay!')
		        .targetEvent(ev)
		    );
		    $scope.newUrlText = "";
		}

	}

	$scope.runYouTubeData = function(youtubeUrl, id) {
	console.log("Inside getYoutube()")

	var url = "https://www.googleapis.com/youtube/v3/videos?id=";
	var videoID = id;
	var apiKey = "AIzaSyDEOt5nyqmEtKbJxDXeb83IFkOnPPvqtYk";
	var params = "&part=snippet,contentDetails,statistics,status";

	url = url + videoID + "&key=" + apiKey + params;

	$http.get(url).success(function(res) {
		console.log(res);
		var youtube = {
			title: res.items[0].snippet.title,
			imgUrl: res.items[0].snippet.thumbnails.medium.url,
			viewCount: res.items[0].statistics.viewCount,
			likeCount: res.items[0].statistics.likeCount,
			url: youtubeUrl,
			upvotes: 0
		};

		$scope.groups.$add(youtube);
		$scope.newUrlText = "";

	});

		
	}


  });
