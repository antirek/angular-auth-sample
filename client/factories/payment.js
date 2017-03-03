app.factory('Payment', [
  'Feathers', 
  function (Feathers) {
    return Feathers.service('payments');
  }
]);