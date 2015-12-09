/**
 * @ngdoc controller
 * @name ContatosController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('contato').controller('AtividadeController', function($scope, $http){

  $scope.filtro = '';
  $scope.contatos = [];

  $http.get('/atividade')
    .success(function(data) {
      $scope.contatos = data;
    })
    .error(function(statusText) {
      console.log('Não foi possível obter a lista de contatos.', statusText);
    });

});
