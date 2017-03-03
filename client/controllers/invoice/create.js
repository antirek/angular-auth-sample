angular.module('test')
  .controller('InvoiceCreateController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    function ($scope, $state, Feathers, Invoice) {
      console.log('InvoiceCreateController');

      $scope.save = function(){
        Invoice.create($scope.invoice)
          .then(function (res) {
            console.log(res);
            $state.go('invoices');
          }).catch(function (err) {
            console.log('err', err);
          });
      };

    }
  ]);