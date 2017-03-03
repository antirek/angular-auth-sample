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
app.factory('Feathers', function () {
  var host = 'http://localhost:3030';

  var feathersApp = feathers()
    .configure(feathers.rest(host).jquery(jQuery))
    .configure(feathers.hooks())
    .configure(feathers.authentication({
      storage: window.localStorage,
    }));

  feathersApp.set('token', window.localStorage['feathers-jwt']);
  return feathersApp;
});
app.factory('Invoice', [
  'Feathers', 
  function (Feathers) {
    return Feathers.service('invoices');
  }
]);
app.factory('Payment', [
  'Feathers', 
  function (Feathers) {
    return Feathers.service('payments');
  }
]);
angular.module('test')
  .controller('InvoiceCreateController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    function ($scope, $state, Feathers, Invoice) {

      $scope.save = function(){
        Invoice.create($scope.invoice)
          .then(function (res) {
            console.log(res);
            $state.go('invoices');
          }).catch(function (err) {
            console.log('err', err);
          });
      };

    }
  ]);
angular.module('test')
  .controller('InvoiceListController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    function ($scope, $state, Feathers, Invoice) {
      $scope.models = [];

      Invoice.find({}).then(function (res) {
        console.log(res);
        $scope.models = res.data;
        $scope.$apply();
      }).catch(function (err) {
        console.log('err', err);
      });
    }
  ]);
angular.module('test')
  .controller('PaymentCreateController', [
    '$scope',
    '$state',
    'Feathers',
    'Payment',
    function ($scope, $state, Feathers, Payment) {
      
      $scope.save = function(){
        Payment.create($scope.payment)
          .then(function (res) {
            console.log(res);
            $state.go('payments');
          }).catch(function (err) {
            console.log('err', err);
          });
      };

    }
  ]);
angular.module('test')
  .controller('PaymentListController', [
    '$scope',
    '$state',
    'Feathers',
    'Payment',
    function ($scope, $state, Feathers, Payment) {
      $scope.models = [];
      
      Payment.find({}).then(res => {
        console.log(res);
        $scope.models = res.data;
        $scope.$apply();
      }).catch(err => {
        console.log('err', err);
      });

      $scope.remove = function(payment){
        Payment.remove(payment.id).then(res => {
          console.log(res);
          $state.go('payments', null, {reload: true});
        }).catch(err => {
          console.log('err', err);
        });
      }
    }
  ]);
angular.module('test')
  .controller('MainController', [
    '$scope',
    'Feathers',
    '$state',
    function ($scope, Feathers, $state) {
      $scope.auth = {};
      $scope.auth.authenticated = Feathers.get('token');

      $scope.authenticate = function () {
        console.log('$scope.auth.phone', $scope.auth.phone);
        console.log('$scope.auth.password', $scope.auth.password);

        Feathers.authenticate({
              type: 'local',
              phone: $scope.auth.phone,
              password: $scope.auth.password
          }).then(function (result) {
              console.log(result);
              $scope.auth.authenticated = true;
              $scope.auth.phone = '';
              $scope.auth.password = '';
              $scope.$apply();
              $state.go('main', null, {reload: true});
          }).catch(function (err) {
              $scope.auth.authenticated = false;
              $scope.auth.phone = '';
              $scope.auth.password = '';
              console.log('err', err);
              $state.go('main');
          });
      }
    }
  ]);