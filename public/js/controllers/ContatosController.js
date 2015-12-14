/**
 * @ngdoc controller
 * @name ContatosController
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('contato').controller('ContatosController', function($scope, Contato){

  $scope.filtro = '';
  $scope.contatos = [];
  $scope.mensagem = {texto: ''};

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
    var promise = Contato.delete({id: contato._id},
      buscarContatos,
      function(erro) {
        console.log('Não foi possível obter a lista de contatos');
        console.log(erro);
      });
  };

  buscarContatos();
});
