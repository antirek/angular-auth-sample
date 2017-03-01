var app = angular.module('test', [
  'ngRoute', 
  'ngResource', 
  'ui.router'
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