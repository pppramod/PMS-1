'use strict';

/**
 * @ngdoc function
 * @name pmsApp.controller:GenricCtrl
 * @description
 * # GenricCtrl
 * Controller of the pmsApp
 */
 
angular.module('pmsApp').controller('GenricCtrl', ['$scope', 'generic','genericService', 
                                      function ($scope, generic, genericService) {

    $scope.metadata = {
      genericData: "",
      gname: ""
    }
    function init() {
      generic.get(function (argument) {
        $scope.metadata.genericData = argument.data;
      }); 
    }

    $scope.add = function(){

      var postData = {
        generic_name: $scope.metadata.gname,
        category_id: $scope.selectedItem.id
      };

      var postData = {
        generic_name: $scope.metadata.gname,
        generic_id: $scope.selectedItem.id
      };

      genericService.save(angular.toJson(postData), function(responce) {
        $scope.metadata.gname = "";
        if(responce.data.message === "User added succefully") {
          $scope.gridOptions.data.push(postData);
        }
      });
  };

  $scope.getSelectedCategoryData = function() {
    $scope.id = $scope.selectedItem.id;
    genericService.get({id:$scope.id}, function (valu){
      var selectedCategoryData = {
        data: valu.data
      };
      $scope.pms = valu.data;

      $scope.gridOptions.data = selectedCategoryData.data;
    });
  };

  $scope.singleFilter = function( renderableRows ){
    console.log("in single filter");
    var matcher = new RegExp($scope.filterValue);
    renderableRows.forEach( function( row ) {
      var match = false;
      [ 'category_id', 'generic_name', 'generic_id', 'Action' ].forEach(function( field ){
        if ( row.entity[field].match(matcher) ){
          match = true;
        }
      });
      if ( !match ){
        row.visible = false;
      }
    });
    return renderableRows;
  };

  $scope.gridOptions = {
    enableFiltering: false,
    onRegisterApi: function(gridApi){
      console.log("in registerApi");
      $scope.gridApi = gridApi;
      $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
    },
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    columnDefs: [
      { name: 'generic_name', displayName: 'Name' },
      { name: 'generic_id', enableCellEdit: false },
      { name: 'Action', enableCellEdit: false, cellTemplate:'<button class="btn primary" ng-click="grid.appScope.deleteRecord(row.entity.category_id,row.entity.generic_id)"><span class="glyphicon glyphicon-trash"></span></button>'}
    ]
  };
  
  $scope.filter = function() {
    console.log($scope.filterValue);
    console.log("in filter function");
    $scope.gridApi.grid.refresh();
  };

  $scope.deleteRecord = function(category_id, generic_id){
      var testData = {
        category_id: category_id,
        generic_id: generic_id

    }
      
      genericService.recordDelete(testData, function(responce) {
        console.log(responce);
      });
  };

  $scope.saveRow = function(rowEntity) {
    genericService.updateGenericData.$promise.then(angular.toJson(rowEntity), function(responce) {
      $scope.gridOptions = responce.data[0];
    });
    
  };
 
  $scope.gridOptions.onRegisterApi = function(gridApi){
    //set gridApi on scope
    $scope.gridApi = gridApi;
    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
  };

  init();
}]); 
