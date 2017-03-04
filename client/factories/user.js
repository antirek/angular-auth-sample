app.factory('User', [
  'Feathers', 
  function (Feathers) {
    return Feathers.service('users');
  }
]);