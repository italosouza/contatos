(function() {
  'use strict';

  // declare os modulos criados como dependencia da aplicação
  angular.module('coreApp', [
    'ngMaterial',
    'angular-loading-bar',
    'ngRoute'
  ])

  .config(['$routeProvider', '$mdThemingProvider', '$mdIconProvider', function($routeProvider, $mdThemingProvider, $mdIconProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/home'
      });
  }])

  .controller('appCtrl', ['$scope', '$mdSidenav', '$mdBottomSheet', function($scope, $mdSidenav, $mdBottomSheet) {
    $scope.painel = {
      titulo: 'IASK'
    };



  }]);

})();
