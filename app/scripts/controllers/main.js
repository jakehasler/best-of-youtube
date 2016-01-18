'use strict';

/**
 * @ngdoc function
 * @name bestOfYoutubeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bestOfYoutubeApp
 */
angular.module('bestOfYoutubeApp')
  .controller('MainCtrl', function ($scope, $http, $firebaseObject, $firebaseArray) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var ref = new Firebase("https://the-best-of-youtube.firebaseio.com/urls");
    var ref2 = new Firebase("https://the-best-of-youtube.firebaseio.com/data");

    var syncObject = $firebaseObject(ref2);

    syncObject.$bindTo($scope, "data");

    $scope.urls = $firebaseArray(ref);

    $scope.addUrl = function() {
	    $scope.urls.$add({
	      text: $scope.newUrlText
	    });
	 };

	 var getParameterByName = function(name) {
	 	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));

	 }

	$scope.getYoutube = function(youtubeUrl) {

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
		}
		else {
			console.log('Desktop URL');
			id = getParameterByName("v", youtubeUrl);
		}

		console.log("Inside getYoutube()")

		var url = "https://www.googleapis.com/youtube/v3/videos?id=";
		var videoID = id;
		var apiKey = "AIzaSyDEOt5nyqmEtKbJxDXeb83IFkOnPPvqtYk";
		var params = "&part=snippet,contentDetails,statistics,status";

		url = url + videoID + "&key=" + apiKey + params;

		$http.get(url).success(function(res) {
			console.log(res);
		});
	}


  });
