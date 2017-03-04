angular.module('test')
  .controller('InvoiceInListController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    'AuthUser',
    function ($scope, $state, Feathers, Invoice, AuthUser) {
      $scope.models = [];
      $scope.title = "Incoming";

      Invoice.find({
        query: {
          to: AuthUser.getUser().phone
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
    'AuthUser',
    function ($scope, $state, Feathers, Invoice, AuthUser) {
      $scope.models = [];
      $scope.title = "Outgoing";

      Invoice.find({
        query: {
          from: AuthUser.getUser().phone
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