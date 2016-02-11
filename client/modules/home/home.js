(function() {
  'use strict';

  angular.module('coreApp.home', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', '$mdThemingProvider', '$mdIconProvider', function($routeProvider, $mdThemingProvider, $mdIconProvider) {

    $routeProvider.when('/home', {
      templateUrl: 'modules/home/home.html',
      controller: 'HomeController'
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

  //define o service do modulo
  // .factory('HomeService', ['$resource', function($resource) {
  //   return $resource('/home/:id');
  // }])

  //define a controller do modulo
  .controller('HomeController', ['$scope', '$mdSidenav', '$mdBottomSheet', function($scope, $mdSidenav, $mdBottomSheet) {


    $scope.selected = null;



    /**
     * Show the Contact view in the bottom sheet
     */
    $scope.makeContact = function(selectedUser) {

      /**
       * User ContactSheet controller
       */
      var ContactSheetController = function($mdBottomSheet) {
        this.user = selectedUser;
        this.actions = [{
          name: 'Phone',
          icon: 'phone',
          icon_url: 'assets/svg/phone.svg'
        }, {
          name: 'Twitter',
          icon: 'twitter',
          icon_url: 'assets/svg/twitter.svg'
        }, {
          name: 'Google+',
          icon: 'google_plus',
          icon_url: 'assets/svg/google_plus.svg'
        }, {
          name: 'Hangout',
          icon: 'hangouts',
          icon_url: 'assets/svg/hangouts.svg'
        }];
        this.contactUser = function(action) {
          // The actually contact process has not been implemented...
          // so just hide the bottomSheet

          $mdBottomSheet.hide(action);
        };
      };

      $mdBottomSheet.show({
        controllerAs: "cp",
        templateUrl: './modules/home/parte.html',
        controller: ['$mdBottomSheet', ContactSheetController],
        parent: angular.element(document.getElementById('content'))
      }).then(function(clickedItem) {
        console.log(clickedItem.name + ' clicked!');
      });
    };
  }]);

})();
