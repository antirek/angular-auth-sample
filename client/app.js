var app = angular.module('test', [
  'ngRoute', 
  'ngResource', 
  'ui.router'
  ]);

angular.module("test")
  .run(function ($rootScope, $state, Feathers, AuthUser) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      //console.log('AuthUser.isAuthenticated()', toState, !AuthUser.isAuthenticated());
      if (toState.authenticate && !AuthUser.isAuthenticated()){
        // User isn’t authenticated
        $state.go("login");
        event.preventDefault(); 
      }
    });
  });