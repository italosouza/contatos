(function() {
  'use strict';

  angular.module('coreApp.home', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider
      .when('/home', {
        templateUrl: 'modules/home/home.html',
        controller: 'HomeController'
      });
  }])

  //define o service do modulo
  // .factory('HomeService', ['$resource', function($resource) {
  //   return $resource('/home/:id');
  // }])

  //define a controller do modulo
  .controller('HomeController', ['$scope', '$mdBottomSheet','$mdDialog', function($scope, $mdBottomSheet, $mdDialog) {
    var bItemSelecionado = false;
    $scope.itemSelecionado = null;
    
    $scope.tabs = {
      selectedIndex: 0
    };
    
    // placeholder
    $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function(state) {
        return {abbrev: state};
      });
    
    $scope.selecionarItemCadastro = function(pItem) {
      $scope.itemSelecionado = pItem;
      bItemSelecionado = true;
      $scope.tabs.selectedIndex = 1;
    };
    
    $scope.$watch('tabs.selectedIndex', function(current){
      if(!bItemSelecionado && current === 1) {
        $scope.itemSelecionado = null;
      }
      bItemSelecionado = false;
    });
    
    $scope.removerItemCadastro = function(pItem, event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Secondary Action')
          .textContent('Secondary actions can be used for one click actions')
          .ariaLabel('Secondary click demo')
          .ok('Neat!')
          .targetEvent(event)
      );
    };
  
    $scope.doPrimaryAction = function(event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Primary Action')
          .textContent('Primary actions can be used for one click actions')
          .ariaLabel('Primary click demo')
          .ok('Awesome!')
          .targetEvent(event)
      )
      .finally(function() {
        $scope.tabs.selectedIndex = 1;
      });
    };
  
  }]);

})();
