angular.module('test').config([
  '$stateProvider', 
  '$urlRouterProvider', 
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainController',
        templateUrl: '/views/main.html',
        authenticate: false
      })
      .state('messages', {
        url: '/messages',        
        templateUrl: '/views/messages/list.html',
        authenticate: true
      })
      .state('create', {
        url: '/create',
        controller: 'MessageCreateController',
        templateUrl: '/views/messages/create.html',
        authenticate: true
      })
  }
]);