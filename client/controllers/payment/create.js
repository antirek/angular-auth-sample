angular.module('test')
  .controller('PaymentCreateController', [
    '$scope',
    '$state',
    'Feathers',
    'Payment',
    function ($scope, $state, Feathers, Payment) {
      
      $scope.save = function(){
        Payment.create($scope.payment)
          .then(function (res) {
            console.log(res);
            $state.go('payments');
          }).catch(function (err) {
            console.log('err', err);
          });
      };

    }
  ]);