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
  $scope.incrementa = function () {
    $scope.total++;
  }

});
