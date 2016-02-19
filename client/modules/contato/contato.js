(function() {
  'use strict';

  angular.module('coreApp.contato', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contato', {
        templateUrl: 'modules/contato/contato.html',
        controller: 'ContatoController'
      })
      .when('/contato/edit', {
        templateUrl: 'modules/contato/contato_cad.html',
        controller: 'ContatoController'
      })
      .when('/contato/edit/:id', {
        templateUrl: 'modules/contato/contato.html',
        controller: 'ContatoController'
      });
  }])

  //define o service do modulo
  .factory('ContatoService', ['$resource', function($resource) {
    return $resource('/contato/:id');
  }])

  //define a controller do modulo
  .controller('ContatoController', ['$scope', '$routeParams', 'ContatoService', '$mdDialog', function($scope, $routeParams, ContatoService, $mdDialog) {
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
        $scope.itemSelecionado = new ContatoService();
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
      console.log(pItem);
      if (pItem._id) {
  
        ContatoService.get({
            id: pItem._id
          },
          function(pItem) {
            $scope.itemSelecionado = pItem;
          },
          function(error) {
            $scope.mensagem = {
              texto: 'Contato não existe.'
            };
            console.error(error);
          });
    
        } else {
          $scope.itemSelecionado = new ContatoService();
        }
    };

    $scope.salvar = function() {
      $scope.itemSelecionado.$save()
        .then(function() {
          // console.log('Salvo', obj);
          $scope.mensagem = {
            texto: 'Salvo com sucesso'
          };
          $scope.itemSelecionado = new ContatoService();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possível salvar',
            error: erro
          };
        });
    };

    $scope.listar = function() {
      ContatoService.query(
        function(pLista) {
          $scope.lista = pLista;
        },
        function(error) {
          console.error('Não foi possível obter a lista de contato');
          console.table(error);
        });
    };

    $scope.remover = function(pItem) {
      ContatoService.delete({
          id: pItem._id
        },
        $scope.listar,
        function(error) {
          console.error('Não foi possível obter a lista de contato');
          console.table(error);
        });
    };

  }]);

})();
