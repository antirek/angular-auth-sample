app.factory('AuthUser', [
  'Feathers',
  'User',
  function (Feathers, User) {

    var authenticated = false;

    var getUser = function () {
        return Feathers.get('user');
    };

    var isAuthenticated = function () {
        var user = Feathers.get('user');
        var token = Feathers.get('token');
        //console.log('user', user, 'token', token);

        return user && token;
    };

    var authByToken = function(){
        return Feathers.authenticate({
            type: 'token',
            token: Feathers.get('token')
        });
    };

    return {
        isAuthenticated: isAuthenticated,
        authByToken: authByToken,
        getUser: getUser
    }
  }
]);