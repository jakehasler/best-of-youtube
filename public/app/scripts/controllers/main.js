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

    var ref3 = new Firebase("https://the-best-of-youtube.firebaseio.com/config");

    var syncObject = $firebaseObject(ref3);

    syncObject.$bindTo($scope, "config");

    $scope.groups = $firebaseArray(ref3);


  });
