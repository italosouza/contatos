(function() {
  'use strict';

  // declare os modulos criados como dependencia da aplicação
  angular.module('coreApp', [
    'ngMaterial',
    'angular-loading-bar',
    'ngRoute',
    'ngResource',
    'coreApp.home',
    'coreApp.contato'
  ])

  .config(['$routeProvider', '$mdThemingProvider', '$mdIconProvider', function($routeProvider, $mdThemingProvider, $mdIconProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $mdIconProvider
      .defaultIconSet("./static/assets/svg/avatars.svg", 128)
      .icon("menu", "./static/assets/svg/menu.svg", 24)
      .icon("share", "./static/assets/svg/share.svg", 24)
      .icon("google_plus", "./static/assets/svg/google_plus.svg", 512)
      .icon("hangouts", "./static/assets/svg/hangouts.svg", 512)
      .icon("twitter", "./static/assets/svg/twitter.svg", 512)
      .icon("phone", "./static/assets/svg/phone.svg", 512);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');

  }])
  
  .factory('CoreAppService', ['$resource', function($resource) {
    return $resource('/navegacao/:sistema');
  }])

  .controller('appCtrl', ['$scope', '$mdSidenav', '$location', 'CoreAppService', function($scope, $mdSidenav, $location, CoreAppService) {
    $scope.painel = {
      titulo: 'IASK'
    };
    $scope.menuSelecionado = null;

    $scope.listaMenu = [{
      name: 'Home',
      icon: 'svg-1',
      rota: 'home',
      content: 'Exibe o painel principal do portal.'
    }, {
      name: 'Contato',
      icon: 'svg-2',
      rota: 'contato',
      content: 'Permite o gerenciamento de contatos.'
    }, {
      name: 'Usuário',
      icon: 'svg-5',
      rota: 'usuario',
      content: 'Permite o gerenciamento de contas de usuário.'
    }, {
      name: 'Menu',
      icon: 'svg-6',
      rota: 'menu',
      content: "Permite que novas rotas de navegação sejam configuradas."
    }];
    
    $scope.listaMenu = CoreAppService.query({sistema: 'admin'});

    $scope.selecionarItemMenu = function(pItemMenu) {
      $scope.menuSelecionado = pItemMenu;
      $location.path('/' + pItemMenu.rota);
    };

    $scope.toggleMenu = function() {
      $mdSidenav('left').toggle();
    };

  }]);

})();
