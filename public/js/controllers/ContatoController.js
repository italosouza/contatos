/**
 * @ngdoc controller
 * @name ContatosController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('contato').controller('ContatoController', function($scope, $routeParams, Contato){

  if ($routeParams.id)
  {
      Contato.get({id: $routeParams.id},
        function(contato) {
          $scope.contato = contato;
        },
        function(error) {
          $scope.mensagem = {
            texto: 'Contato não existe. Novo contato.'
          }
          console.log(error);
        });

    }
    else
    {
      $scope.contato = new Contato();
    }


    $scope.salva = function() {
      $scope.contato.$save()
        .then(function() {
          $scope.mensagem = { texto: 'Salvo com sucesso' };
          $scope.contato = new Contato();
        })
        .catch(function(erro) {
          $scope.mensagem = { texto: 'Não foi possível salvar'};
        });
    };

});
