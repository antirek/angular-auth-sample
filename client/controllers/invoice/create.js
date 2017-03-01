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