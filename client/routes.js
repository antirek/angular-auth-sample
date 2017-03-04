angular.module('test').config([
  '$stateProvider', 
  '$urlRouterProvider', 
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        controller: 'MainController',
        templateUrl: '/views/main/main.html',
        authenticate: true
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: '/views/main/login.html',
        authenticate: false
      })
      .state('register', {
        url: '/register',
        controller: 'RegisterController',
        templateUrl: '/views/main/register.html',
        authenticate: false
      })
      .state('invoices_in', {
        url: '/invoices/in',
        controller: 'InvoiceInListController',    
        templateUrl: '/views/invoices/list.html',
        authenticate: true
      })
      .state('invoices_out', {
        url: '/invoices/out',
        controller: 'InvoiceOutListController',    
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
      .state('profile', {
        url: '/profile',
        controller: 'ProfileController',
        templateUrl: '/views/main/profile.html',
        authenticate: true
      })
  }
]);