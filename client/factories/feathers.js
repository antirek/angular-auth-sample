app.factory('Feathers', function () {
  var host = 'http://localhost:3030';

  var feathersApp = feathers()
    .configure(feathers.rest(host).jquery(jQuery))
    .configure(feathers.hooks())
    .configure(feathers.authentication({
      storage: window.localStorage,
    }));

  feathersApp.set('token', window.localStorage['feathers-jwt']);
  return feathersApp;
});