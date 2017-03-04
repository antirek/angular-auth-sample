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
      .state('invoices_detail', {
        url: '/invoices/detail/:id',
        controller: 'InvoiceDetailController',
        templateUrl: '/views/invoices/detail.html',
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
app.factory('AuthUser', [
  'Feathers',
  'User',
  function (Feathers, User) {

    var authenticated = false;

    var getUser = function () {
        return Feathers.get('user');
    };

    var isAuthenticated = function () {
        var user = Feathers.get('user');
        var token = Feathers.get('token');
        //console.log('user', user, 'token', token);

        return user && token;
    };

    var authByToken = function(){
        return Feathers.authenticate({
            type: 'token',
            token: Feathers.get('token')
        });
    };

    return {
        isAuthenticated: isAuthenticated,
        authByToken: authByToken,
        getUser: getUser
    }
  }
]);
app.factory('Feathers', function () {
  var host = 'http://localhost:3030';

  var feathersApp = feathers()
    .configure(feathers.rest(host).jquery(jQuery))
    .configure(feathers.hooks())
    .configure(feathers.authentication({
      storage: window.localStorage
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
app.factory('User', [
  'Feathers', 
  function (Feathers) {
    return Feathers.service('users');
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
  .controller('InvoiceDetailController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    '$stateParams',
    function ($scope, $state, Feathers, Invoice, $stateParams) {
      Invoice.get($stateParams.id).then(res => {
        $scope.invoice = res;
        $scope.invoice.data = JSON.parse(res.data);
        $scope.$apply();
      });
    }
  ]);
angular.module('test')
  .controller('InvoiceInListController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    'AuthUser',
    function ($scope, $state, Feathers, Invoice, AuthUser) {
      $scope.models = [];
      $scope.title = "Incoming";

      Invoice.find({
        query: {
          to: AuthUser.getUser().phone
        }
      }).then(function (res) {
        console.log(res);
        $scope.models = res.data;
        $scope.$apply();
      }).catch(function (err) {
        console.log('err', err);
      });
    }
  ]);

angular.module('test')
  .controller('InvoiceOutListController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    'AuthUser',
    function ($scope, $state, Feathers, Invoice, AuthUser) {
      $scope.models = [];
      $scope.title = "Outgoing";

      Invoice.find({
        query: {
          from: AuthUser.getUser().phone
        }
      }).then(function (res) {
        console.log(res);
        $scope.models = res.data;
        $scope.$apply();
      }).catch(function (err) {
        console.log('err', err);
      });
    }
  ]);
angular.module('test')
  .controller('LoginController', [
    '$scope',
    'Feathers',
    '$state',
    'AuthUser',
    function ($scope, Feathers, $state, AuthUser) {
      $scope.auth = {};

      if(Feathers.get('token')) {
        AuthUser.authByToken().then(res => {
          if(res.token){
            $state.go('main', null, {reload: true})
          }
        }).catch(err => {
          Feathers.logout();
          $state.go('login');
        })
      }

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
              $state.go('login');
          });
      }
    }
  ]);
angular.module('test')
  .controller('MainController', [
    '$scope',
    'Feathers',
    '$state',
    'AuthUser',
    function ($scope, Feathers, $state, AuthUser) {
      //console.log('main AuthUser.isAuthenticated()', AuthUser.isAuthenticated());
      if(!AuthUser.isAuthenticated()){
        $state.go('login');
      }

      $scope.logout = function () {
        Feathers.logout();
        //console.log('user', Feathers.get('user'));
        $state.go('main', null, {reload:true});
      }
    }
  ]);
angular.module('test')
  .controller('ProfileController', [
    '$scope',
    'Feathers',
    '$state',
    'AuthUser',
    'User',
    function ($scope, Feathers, $state, AuthUser, User) {
        var authUser = AuthUser.getUser();

        User.get(authUser.id).then(res => {
          $scope.user = res;
          $scope.$apply();
        });
        //console.log('user', $scope.user);
        /*User.get().then(res => {
          console.log(res);
        });
        */

    }
  ]);
angular.module('test')
  .controller('RegisterController', [
    '$scope',
    'Feathers',
    '$state',
    function ($scope, Feathers, $state) {

      if(Feathers.get('token')) {
        $state.go('main');
      }

      $scope.register = function () {
        console.log('register');
      }
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