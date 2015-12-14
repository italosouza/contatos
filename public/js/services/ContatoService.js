

angular.module('contato').factory('Contato', function($resource){
  return $resource('/contatos/:id');
});