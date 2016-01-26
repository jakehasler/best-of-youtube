'use strict';

describe('Controller: GroupIdCtrl', function () {

  // load the controller's module
  beforeEach(module('bestOfYoutubeApp'));

  var GroupIdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GroupIdCtrl = $controller('GroupIdCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GroupIdCtrl.awesomeThings.length).toBe(3);
  });
});
