app.factory('Message', [
  'Feathers', 
  function (Feathers) {
    return Feathers.service('invoices');
  }
]);