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