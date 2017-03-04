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