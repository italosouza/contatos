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

  .controller('appCtrl', ['$scope', '$mdSidenav', '$location', function($scope, $mdSidenav, $location) {
    $scope.painel = {
      titulo: 'IASK'
    };
    $scope.menuSelecionado = null;

    $scope.listaMenu = [{
      name: 'Lia Lugo',
      icon: 'svg-1',
      rota: 'home',
      content: 'Ligeira descrição'
    }, {
      name: 'George Duke',
      icon: 'svg-2',
      rota: '',
      content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
    }, {
      name: 'Ernesto Urbina',
      icon: 'svg-5',
      rota: '',
      content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
    }, {
      name: 'Gani Ferrer',
      icon: 'svg-6',
      rota: '',
      content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
    }];

    $scope.selecionarItemMenu = function(pItemMenu) {
      $scope.menuSelecionado = pItemMenu;
      $location.path('/' + pItemMenu.rota);
    };

    $scope.toggleMenu = function() {
      $mdSidenav('left').toggle();
    };

  }]);

})();
