angular.module('test')
  .controller('MainController', [
    '$scope',
    'Feathers',
    '$state',
    function ($scope, Feathers, $state) {
      $scope.logout = function () {
        window.localStorage.removeItem('feathers-jwt');
        Feathers.set('token','');
        $state.go('login');
      }
    }
  ]);