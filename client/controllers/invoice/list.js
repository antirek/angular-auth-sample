angular.module('test')
  .controller('InvoiceInListController', [
    '$scope',
    '$state',
    'Feathers',
    'Invoice',
    'AuthUser',
    function ($scope, $state, Feathers, Invoice, AuthUser) {
      $scope.models = [];

      Invoice.find({
        query: {
          to: AuthUser.getUser().phone,
          $limit: 25,
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

      Invoice.find({
        query: {
          from: AuthUser.getUser().phone,
          $limit: 25          
        },
      }).then(function (res) {
        console.log(res);
        $scope.models = res.data;
        $scope.$apply();
      }).catch(function (err) {
        console.log('err', err);
      });
    }
  ]);