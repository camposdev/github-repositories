app.factory('WebService', ['$http', '$cookies', function( $http, $cookies ){

  var _url = 'https://api.github.com/',
      _user = $cookies.get('userDefault');

  /**
   * Busca os dados do usuário
   * @params {string}   user
   * @params {function} callback
   * Doc: https://developer.github.com/v3/users/
   */
  function getDataUser( callback ){
    return $http.get( _url + 'users/' + _user ).then( function success( res ) {
      callback( res.data );
    });
  }

  /**
   * Busca repositórios
   * @params {string}   user
   * @params {function} callback
   * Doc: https://developer.github.com/v3/repos/#list-your-repositories
   */
  function getRepoUser( callback ){
    return $http.get( _url + 'users/' + _user + '/repos' ).then( function success( res ) {
      callback( res.data );
    });
  }

  var service = {
    getDataUser: getDataUser,
    getRepoUser: getRepoUser
  }

  return service;


}]);