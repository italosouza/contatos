(function() {
  'use strict';

    angular.module('coreApp.navegacao', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/navegacao', {
          templateUrl: 'modules/navegacao/navegacao.html',
          controller: 'NavegacaoController'
        });
    }])

    //define o service do modulo
    .service('NavegacaoService', ['CoreService', function(CoreService) {
      return angular.extend(this, CoreService);
    }])

    .controller('NavegacaoController', ['$scope', '$mdDialog', 'NavegacaoService', function($scope, $mdDialog, NavegacaoService) {

      //init
      NavegacaoService.setServiceName('navegacao');

      //bindings
      $scope.data = NavegacaoService.data;

      var bItemSelecionado = false;
      $scope.tabs = {
        selectedIndex: 0
      };

      $scope.selecionarItemCadastro = function(pItem) {
        $scope.data.itemSelecionado = pItem;
        bItemSelecionado = true;
        $scope.tabs.selectedIndex = 1;
      };

      $scope.$watch('tabs.selectedIndex', function(current) {
        if (current === 0) {
          NavegacaoService.consultar();
        } else if (!bItemSelecionado && current === 1) {
          NavegacaoService.initCadastro();
        }

        bItemSelecionado = false;
      });


      //todo: refatorar em coreFactory
      $scope.removerItemCadastro = function(pItem, pEvent) {
        var confirm = $mdDialog.confirm()
          .title('Deseja remover este registro?')
          .textContent('Ao confirmar esta operação o registro será removido e não será possível recuperá-lo.')
          .ariaLabel('Remover')
          .targetEvent(pEvent)
          .ok('SIM')
          .cancel('NÃO');

        $mdDialog.show(confirm)
          .then(function() {
            NavegacaoService.remover(pItem);
          });
      };


      //core behavior
      $scope.salvar = function() {
        NavegacaoService.salvar($scope.data.itemSelecionado);
      };


    }]);


})();
