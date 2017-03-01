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