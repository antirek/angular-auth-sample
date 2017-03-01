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
app.factory('Message', [
  'Feathers', 
  function (Feathers) {
    return Feathers.service('invoices');
  }
]);
angular.module('test')
  .controller('MessageCreateController', [
    '$scope',
    '$state',
    'Feathers',
    'Message',
    function ($scope, $state, Feathers, Message) {
      console.log('MessageCreateController');

      //$scope.message
      
      $scope.save = function(){
        Message.create($scope.message)
          .then(function (res) {
            console.log(res);
            $state.go('messages');
          }).catch(function (err) {
            console.log('err', err);
          });
      };

    }
  ]);
angular.module('test')
  .controller('MessageListController', [
    '$scope',
    '$state',
    'Feathers',
    'Message',
    function ($scope, $state, Feathers, Message) {
      console.log('MessageListController');
      $scope.models = [];
      Message.find({}).then(function (res) {
        console.log(res);
        $scope.models = res.data;
        $scope.$apply();
      }).catch(function (err) {
        console.log('err', err);
      });
    }
  ]);
angular.module('test')
  .controller('MainController', [
    '$scope',
    'Feathers',
    '$state',
    function ($scope, Feathers, $state) {
      //console.log('MainController');
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