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
        controller: 'MessageListController',    
        templateUrl: '/views/messages/list.html',
        authenticate: true
      })
      .state('messages_create', {
        url: '/messages/create',
        controller: 'MessageCreateController',
        templateUrl: '/views/messages/create.html',
        authenticate: true
      })
  }
]);