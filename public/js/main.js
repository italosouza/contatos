/**
 * Created by italo on 12/7/2015.
 */

angular.module('contato', ['ngRoute'])
  .config(function($routeProvider) {

    $routeProvider.when('/contatos', {
      templateUrl: 'partials/contatos.html',
      controller: 'ContatosController'
    });

    $routeProvider.when('/contato/:id', {
      templateUrl: 'partials/contato.html',
      controller: 'ContatosController'
    });

    $routeProvider.when('/atividade', {
      templateUrl: 'partials/atividade_con.html',
      controller: 'AtividadeController'
    });

    $routeProvider.otherwise({redirectTo: '/contatos'});

  });