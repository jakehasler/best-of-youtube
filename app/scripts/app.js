'use strict';

/**
 * @ngdoc overview
 * @name bestOfYoutubeApp
 * @description
 * # bestOfYoutubeApp
 *
 * Main module of the application.
 */
angular
  .module('bestOfYoutubeApp', [
    'ngRoute',
    'ngSanitize',
    'firebase',
    'ngMaterial',
    'ngMdIcons'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .when('/group/:id', {
        templateUrl: 'views/group.html',
        controller: 'GroupIdCtrl',
        controllerAs: 'group'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  });
