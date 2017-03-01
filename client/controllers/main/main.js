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