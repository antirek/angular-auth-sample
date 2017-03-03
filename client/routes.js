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
      .state('invoices', {
        url: '/invoices',
        controller: 'InvoiceListController',    
        templateUrl: '/views/invoices/list.html',
        authenticate: true
      })
      .state('invoices_create', {
        url: '/invoices/create',
        controller: 'InvoiceCreateController',
        templateUrl: '/views/invoices/create.html',
        authenticate: true
      })
      .state('payments', {
        url: '/payments',
        controller: 'PaymentListController',    
        templateUrl: '/views/payments/list.html',
        authenticate: true
      })
      .state('payments_create', {
        url: '/payments/create',
        controller: 'PaymentCreateController',
        templateUrl: '/views/payments/create.html',
        authenticate: true
      })
  }
]);