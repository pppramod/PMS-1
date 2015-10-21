'use strict';

describe('Controller: BillMasterDetailViewCtrl', function () {

  // load the controller's module
  beforeEach(module('pmsappApp'));

  var BillMasterDetailViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BillMasterDetailViewCtrl = $controller('BillMasterDetailViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BillMasterDetailViewCtrl.awesomeThings.length).toBe(3);
  });
});
