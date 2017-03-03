app.factory('Invoice', [
  'Feathers', 
  function (Feathers) {
    return Feathers.service('invoices');
  }
]);