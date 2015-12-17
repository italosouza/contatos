/**
 * Created by italo on 12/16/2015.
 */

angular.module('contato').factory('meuInterceptor', function($location, $q) {

  return {
    responseError: function(resposta) {
      if (resposta.status == 401) {
        $location.path('/auth');
      }

      return $q.reject(resposta);
    }
  };

});