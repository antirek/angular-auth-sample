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