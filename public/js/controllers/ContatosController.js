/**
 * @ngdoc controller
 * @name ContatosController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('contato').controller('ContatosController', function($scope, $resource){

  $scope.filtro = '';
  $scope.contatos = [];

  var Contato = $resource('/contatos/:id');
  var promise = Contato.query().$promise;


  function buscarContatos () {
    Contato.query(
      function(contatos) {
        $scope.contatos = contatos;
      },
      function(error) {
        console.log('Não foi possível obter a lista de contatos');
        console.log(error);
      });
  }

  $scope.remove = function(contato) {
    console.lgo(contato);
  };

  // promise
  //   .then(function(contatos) {
  //     $scope.contatos = contatos;
  //   })
  //   .catch(function(error) {
  //     console.log('Não foi possível obter a lista de contatos');
  //     console.log(error);
  //   });

  buscarContatos();
});
