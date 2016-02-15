(function() {
  'use strict';

  // declare os modulos criados como dependencia da aplicação
  angular.module('coreApp', [
    'ngMaterial',
    'angular-loading-bar',
    'ngRoute',
    'ngResource',
    'coreApp.home'
  ])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/home',
        controller: 'HomeController'
      });
  }])

  .controller('appCtrl', ['$scope', function($scope) {
    $scope.painel = {
      titulo: 'IASK'
    };

  }]);

})();
