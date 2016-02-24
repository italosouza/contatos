(function() {
  'use strict';

  angular.module('coreApp')

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', ['$rootScope', '$q', '$window', '$location', function($rootScope, $q, $window, $location) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        //adiciona o conteudo de $window.sessionStorage.token no token de autorização
        if ($window.sessionStorage.token) {
          config.headers['x-auth'] = $window.sessionStorage.token;
          // console.log(config.headers.Authorization);
        }
        return config;
      },
      responseError: function(rejection) {
        // console.log(rejection);
        // var msg = rejection.data + ': ' + rejection.config.url;
        // console.log(msg);
        // toastr.error(msg);
        if (rejection.status === 401) {
          // handle the case where the user is not authenticated
          // console.log(rejection);
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  }]);

})();
