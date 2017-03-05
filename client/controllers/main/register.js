angular.module('test')
  .controller('RegisterController', [
    '$scope',
    'Feathers',
    '$state',
    'User',
    function ($scope, Feathers, $state, User) {

      /*
      if(Feathers.get('token')) {
        $state.go('main');
      }
      */

      $scope.register = function () {
        console.log('register');
        User.create({phone: $scope.auth.phone}).then(res => {
          console.log(res);
        })
      }
    }
  ]);