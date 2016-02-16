(function() {
  'use strict';

  angular.module('coreApp.home', ['ngRoute'])

  //define as rotas do modulo
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider
      .when('/home', {
        templateUrl: 'modules/home/home.html',
        controller: 'HomeController'
      });
  }])

  //define o service do modulo
  // .factory('HomeService', ['$resource', function($resource) {
  //   return $resource('/home/:id');
  // }])

  //define a controller do modulo
  .controller('HomeController', ['$scope', '$mdBottomSheet', function($scope, $mdBottomSheet) {

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
