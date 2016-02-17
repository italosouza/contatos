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
        templateUrl: 'modules/contato/contato_cad.html',
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

    //setup inicial do objeto (editar/cadastrar)
    if ($routeParams.id) {

      ContatoService.get({
          id: $routeParams.id
        },
        function(contato) {
          $scope.contato = contato;
        },
        function(error) {
          $scope.mensagem = {
            texto: 'Contato não existe.'
          };
          console.error(error);
        });

    } else {
      $scope.contato = new ContatoService();
    }

    $scope.salvar = function() {
      $scope.contato.$save()
        .then(function() {
          // console.log('Salvo', obj);
          $scope.mensagem = {
            texto: 'Salvo com sucesso'
          };
          $scope.contato = new ContatoService();
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possível salvar',
            error: erro
          };
        });
    };

    function buscar() {
      ContatoService.query(
        function(contato) {
          $scope.lista = contato;
        },
        function(error) {
          console.error('Não foi possível obter a lista de contato');
          console.table(error);
        });
    }

    $scope.listar = function() {
      buscar();
    };

    $scope.remover = function(contato) {
      ContatoService.delete({
          id: contato._id
        },
        buscar,
        function(error) {
          console.error('Não foi possível obter a lista de contato');
          console.table(error);
        });
    };

  }]);

})();
