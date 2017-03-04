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