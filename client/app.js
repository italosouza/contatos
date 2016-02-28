//https://gist.github.com/brucecoddington/92a8d4b92478573d0f42

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

  .factory('api', function ($resource) {
    var api = {
      defaultConfig : {id: '@id'},

      extraMethods: {
        'update' : {
          method: 'PUT'
        }
      },

      add : function (config) {
        var params,
          url;

        // If the add() function is called with a
        // String, create the default configuration.
        if (angular.isString(config)) {
          var configObj = {
            resource: config,
            url: '/' + config
          };

          config = configObj;
        }


        // If the url follows the expected pattern, we can set cool defaults
        if (!config.unnatural) {
          var orig = angular.copy(api.defaultConfig);
          params = angular.extend(orig, config.params);
          url = config.url + '/:id';

        // otherwise we have to declare the entire configuration.
        } else {
          params = config.params;
          url = config.url;
        }

        // If we supply a method configuration, use that instead of the default extra.
        var methods = config.methods || api.extraMethods;

        api[config.resource] = $resource(url, params, methods);
      }
    };

    return api;
  })


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

  .directive('loadingOverlayIndicator', ['$rootScope', '$timeout', function($rootScope, $timeout) {
    return {
      restrict: 'E',
      template: "<div id='overlay' ng-show='loginData.bAutenticado && isRouteLoading'></div>",
      replace: true,
      link: function(scope) {

        scope.isRouteLoading = false;
        
        $rootScope.$on('cfpLoadingBar:started', function() {
          scope.isRouteLoading = true;
        });
        
        $rootScope.$on('cfpLoadingBar:completed', function() {
          var completeTimeout;
          
          $timeout.cancel(completeTimeout);
          completeTimeout = $timeout(function() {
            scope.isRouteLoading = false;
          }, 500);
          
        });
        
      }
    };


  }]);

})();
