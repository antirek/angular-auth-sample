angular.module('test')
  .controller('InvoiceDetailController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    '$stateParams',
    function ($scope, $state, Feathers, Invoice, $stateParams) {
      Invoice.get($stateParams.id).then(res => {
        $scope.invoice = res;
        $scope.invoice.data = JSON.parse(res.data);
        $scope.$apply();
      });
    }
  ]);