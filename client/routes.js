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
        url: '/messages',
        controller: 'MessageListController',
        templateUrl: '/views/messages/list.html',
        authenticate: true
      })
      .state({
        name: 'messages.create',
        url: '/create',
        controller: 'MessageCreateController',
        templateUrl: '/views/messages/create.html',
        authenticate: true
      })
  }
]);