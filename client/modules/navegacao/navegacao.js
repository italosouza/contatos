(function() {
  'use strict';

  angular.module('coreApp.navegacao', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/navegacao', {
        templateUrl: 'modules/navegacao/navegacao.html',
        controller: 'NavegacaoController'
      })
      .when('/navegacao/edit', {
        templateUrl: 'modules/navegacao/navegacao.html',
        controller: 'NavegacaoController'
      })
      .when('/navegacao/edit/:id', {
        templateUrl: 'modules/navegacao/navegacao.html',
        controller: 'NavegacaoController'
      });
  }])

  //define o service do modulo
  .factory('NavegacaoService', ['$resource', function($resource) {
    return $resource('/navegacao/:id');
  }])

  //define a controller do modulo
  .controller('NavegacaoController', ['$scope', '$routeParams', 'NavegacaoService', '$mdDialog', function($scope, $routeParams, NavegacaoService, $mdDialog) {
    var bItemSelecionado = false;
    $scope.itemSelecionado = null;
    $scope.tabs = {
      selectedIndex: 0
    };

    $scope.lista = [];
    $scope.mensagem = {
      texto: ''
    };

    $scope.selecionarItemCadastro = function(pItem) {
      $scope.buscar(pItem);
      
      $scope.itemSelecionado = 1;
      bItemSelecionado = true;
      $scope.tabs.selectedIndex = 1;
    };

    $scope.$watch('tabs.selectedIndex', function(current){
      if(!bItemSelecionado && current === 1) {
        $scope.itemSelecionado = new NavegacaoService();
      }
      else if (current === 0) {
        $scope.listar();
      }
      bItemSelecionado = false;
    });

    $scope.removerItemCadastro = function(pItem, event) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Deseja remover este registro?')
        .textContent('Ao confirmar esta operação o registro será removido e não será possível recuperá-lo.')
        .ariaLabel('Remover')
        .targetEvent(event)
        .ok('SIM')
        .cancel('NÃO');
  
      $mdDialog.show(confirm)
        .then(function() {
          $scope.mensagem = { texto: 'Registro removido.', status: 'ok', obj: pItem};
        }, function() {
          $scope.mensagem = { texto: 'Operação cancelada.', status: 'nok', obj: pItem};
        });
      
    };
    
    $scope.submit = function() {
      $scope.salvar();
    };

    //setup inicial do objeto (editar/cadastrar)
    $scope.buscar = function(pItem) {
      if (pItem._id) {
        NavegacaoService.get({
            id: pItem._id
          },
          function(pItem) {
            $scope.itemSelecionado = pItem;
          },
          function(error) {
            $scope.mensagem = {
              texto: 'Navegação não existe.'
            };
            console.error(error);
          });
    
        } else {
          $scope.itemSelecionado = new NavegacaoService();
        }
    };

    $scope.salvar = function() {
      $scope.itemSelecionado.$save()
        .then(function() {
          // console.log('Salvo', obj);
          $scope.mensagem = {
            texto: 'Salvo com sucesso'
          };
          $scope.itemSelecionado = new NavegacaoService();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possível salvar',
            error: erro
          };
        });
    };

    $scope.listar = function() {
      NavegacaoService.query(
        function(pLista) {
          $scope.lista = pLista;
        },
        function(error) {
          console.error('Não foi possível obter a lista de navegação');
          console.table(error);
        });
    };

    $scope.remover = function(pItem) {
      NavegacaoService.delete({
          id: pItem._id
        },
        $scope.listar,
        function(error) {
          console.error('Não foi possível obter a lista de navegação');
          console.table(error);
        });
    };

  }]);

})();
