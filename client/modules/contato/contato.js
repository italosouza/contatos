(function() {
  'use strict';

  angular.module('coreApp.contato', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contato', {
        templateUrl: 'modules/contato/contato_con.html',
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
  .controller('ContatoController', ['$scope', '$routeParams', 'ContatoService', function($scope, $routeParams, ContatoService) {

    $scope.lista = [];
    $scope.titulo = 'IASK';
    $scope.mensagem = {
      texto: ''
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
            texto: 'ContatoService não existe.'
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
