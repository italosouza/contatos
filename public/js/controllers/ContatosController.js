/**
 * @ngdoc controller
 * @name ContatosController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('contato').controller('ContatosController', function($scope){

  $scope.total = 0;
  $scope.filtro = '';
  $scope.contatos = [
    {
      "_id": 1,
      "nome": "Contato Angular 1",
      "email": "cont1@empresa.com.br"
    },
    {
      "_id": 2,
      "nome": "Contato Angular 2",
      "email": "cont2@empresa.com.br"
    },
    {
      "_id": 3,
      "nome": "Contato Angular 3",
      "email": "cont3@empresa.com.br"
    }];


  $scope.incrementa = function () {
    $scope.total++;
  }



});
