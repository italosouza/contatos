(function() {
  'use strict';

  angular.module('coreApp')

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', ['$rootScope', '$q', '$window', function($rootScope, $q, $window) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          // console.log(config.headers.Authorization);
        }
        return config;
      },
      responseError: function(rejection) {
        // console.log(rejection);
        var msg = rejection.data + ': ' + rejection.config.url;
        // console.log(msg);
        // toastr.error(msg);
        if (rejection.status === 401) {
          // handle the case where the user is not authenticated
        }
        return $q.reject(rejection);
      }
    };
  }]);

})();
