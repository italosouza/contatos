(function() {
  'use strict';

  // declare os modulos criados como dependencia da aplicação
  angular.module('coreApp', [
    'ngMaterial',
    'angular-loading-bar',
    'ngRoute',
    'ngResource',
    'coreApp.login',
    'coreApp.home',
    'coreApp.contato',
    'coreApp.navegacao'
  ])

  .constant('MENSAGENS', {
    corNormal: 'md-primary',
    corAviso: 'md-primary md-hue-1',
    corErro: 'md-warn'
  })

  .config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/navegacao'
      });

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');

  }])

  .factory('LoginData', function() {
    return {
      usuario: {
        nome: '',
        senha: ''
      },
      bAutenticado: false
    };
  })

  .controller('appCtrl', ['$scope', '$mdSidenav', '$location', 'NavegacaoService', '$window', 'LoginData', function($scope, $mdSidenav, $location, NavegacaoService, $window, LoginData) {
    $scope.painel = {
      titulo: 'IASK'
    };
    $scope.menuSelecionado = null;
    $scope.loginData = LoginData;

    var carregarMenu = function() {
      $scope.listaMenu = NavegacaoService.query();
    };

    $scope.loginData.bAutenticado = $window.sessionStorage.token || false;
    if ($scope.loginData.bAutenticado) {
      carregarMenu();
    }

    $scope.selecionarItemMenu = function(pItemMenu) {
      $scope.menuSelecionado = pItemMenu;
      $location.path('/' + pItemMenu.rota);
    };

    $scope.toggleMenu = function() {
      $mdSidenav('left').toggle();
    };

    $scope.$on('carregarMenu', carregarMenu);

  }])
  
  .directive('routeLoadingIndicator', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      // template: "<div ng-show='isRouteLoading'>CARREGANDO</div>",
      replace: true,
      link: function(scope) {
        scope.isRouteLoading = false;

        $rootScope.$on('$routeChangeStart', function() {
          scope.isRouteLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
          scope.isRouteLoading = false;
        });
      }
    };
  
    
  }]);

})();
