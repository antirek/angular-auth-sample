
var app = angular.module('test', [
  'ngRoute', 
  'ngResource', 
  'ui.router'
  ]);

app.config([
  '$stateProvider', 
  '$urlRouterProvider', 
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state({
        name: 'main',
        url: '/',
        controller: 'MainController',
        templateUrl: '/views/main.html',
        authenticate: false
      })
      .state({
        name: 'messages',
        url: '/messages/',
        controller: 'MessageController',
        templateUrl: '/views/messages.html',
        authenticate: true
      })
  }
]);

angular.module("test")
  .run(function ($rootScope, $state, Feathers) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !Feathers.get('token')){
        // User isn’t authenticated
        $state.transitionTo("main");
        event.preventDefault(); 
      }
    });
  });
