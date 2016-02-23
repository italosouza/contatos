(function() {
  'use strict';

  angular.module('coreApp.login', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/navegacao', {
        templateUrl: 'modules/navegacao/navegacao.html',
        controller: 'NavegacaoController'
      })
      .when('/navegacao/edit', {
        templateUrl: 'modules/navegacao/navegacao.html',
        controller: 'NavegacaoController'
      })
      .when('/navegacao/edit/:id', {
        templateUrl: 'modules/navegacao/navegacao.html',
        controller: 'NavegacaoController'
      });
  }])

  .controller('loginController', ['$http', '$window', function($http, $window) {
    var vm = this;

    // vm.activate = activate;
    vm.isAuthenticated = false;
    // vm.callRestricted = callRestricted;
    // vm.logout = logout;
    vm.message = '';
    // vm.submit = submit;
    vm.user = {
      username: 'john.papa',
      password: 'secret'
    };
    vm.welcome = '';


    //this is used to parse the profile
    var url_base64_decode = function(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output); //polyfill https://github.com/davidchambers/Base64.js
    };


    this.submit = function() {
      $http
        .post('/login', vm.user)
        .success(function(data) {
          $window.sessionStorage.token = data.token;
          vm.isAuthenticated = true;
          var encodedProfile = data.token.split('.')[1];
          var profile = JSON.parse(url_base64_decode(encodedProfile));
          vm.welcome = 'Welcome ' + profile.firstName + ' ' + profile.lastName;
        })
        .error(function() {
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.token;
          vm.isAuthenticated = false;

          // Handle login errors here
          vm.error = 'Error: Invalid user or password';
          vm.welcome = '';
        });
    };

    this.logout = function() {
      vm.welcome = '';
      vm.message = '';
      vm.isAuthenticated = false;
      delete $window.sessionStorage.token;
    };

    this.callRestricted = function() {
      $http({
          url: '/api/restricted',
          method: 'GET'
        })
        .success(function(data) {
          vm.message = vm.message + ' ' + data.name; // Should log 'foo'
        })
        .error(function(data) {
          console.log('falha: ' + data);
          //toastr.error('failed: ' + data);
          //interceptor is handling the alert
        });
    };

  }]);

})();
