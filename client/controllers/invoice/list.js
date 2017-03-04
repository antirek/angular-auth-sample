angular.module('test')
  .controller('InvoiceInListController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    function ($scope, $state, Feathers, Invoice) {
      $scope.models = [];
      $scope.title = "Incoming";

      Invoice.find({
        query: {
          to: '9135292926'
        }
      }).then(function (res) {
        console.log(res);
        $scope.models = res.data;
        $scope.$apply();
      }).catch(function (err) {
        console.log('err', err);
      });
    }
  ]);

angular.module('test')
  .controller('InvoiceOutListController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    function ($scope, $state, Feathers, Invoice) {
      $scope.models = [];
      $scope.title = "Outgoing";

      Invoice.find({
        query: {
          from: '9135292926'
        }
      }).then(function (res) {
        console.log(res);
        $scope.models = res.data;
        $scope.$apply();
      }).catch(function (err) {
        console.log('err', err);
      });
    }
  ]);