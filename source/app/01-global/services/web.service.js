app.factory('WebService', ['$http', '$cookies', '$sce', function( $http, $cookies, $sce ){

  var _url = 'https://api.github.com/',
      _user = $cookies.get('userDefault');

  /**
   * Busca os dados do usuário
   * @params {function} callback
   * Doc: https://developer.github.com/v3/users/
   */
  function getDataUser( user, callback ){
    return $http.get( _url + 'users/' + user ).then( function success( res ) {
      callback( res.data );
    });
  }

  /**
   * Busca repositórios
   * @params {function} callback
   * Doc: https://developer.github.com/v3/repos/#list-your-repositories
   */
  function getRepoUser( user, callback ){
    return $http.get( _url + 'users/' + user + '/repos?sort=updated' ).then( function success( res ) {
      callback( res.data );
    });
  }

  /**
   * Busca dados de um repositórios
   * @params {string}   repository
   * @params {function} callback
   * Doc: https://developer.github.com/v3/repos/contents/
   */
  function getRepository( user, repository, callback ){
    return $http.get( _url + 'repos/' + user + '/' + repository ).then( function success( res ) {
      callback( res.data );
    });
  }

  /**
   * Busca estrutura de arquivos de um repositórios
   * @params {string}   repository
   * @params {string}   path
   * @params {function} callback
   * Doc: https://developer.github.com/v3/repos/contents/#get-contents
   */
  function getRepositoryContents( user, repository, path, callback ){

    if ( path ) {
      var url = _url + 'repos/' + user + '/' + repository + '/contents/' + path;
    } else {
      var url = _url + 'repos/' + user + '/' + repository + '/contents';
    }
    return $http.get( url ).then( function success( res ) {
      callback( res.data );
    });
  }

  /**
   * Busca readme de um repositórios
   * @params {string}   repository
   * @params {function} callback
   * Doc: https://developer.github.com/v3/repos/contents/#get-contents
   */
  function getRepositoryReadme( user, repository, callback ){
    return $http.get( _url + 'repos/' + user + '/' + repository + '/readme', {
      headers: { 'accept': 'application/vnd.github.VERSION.html' }
    } ).then( function success( res ) {
      callback( res.data );
    });
  }

  var service = {
    getDataUser: getDataUser,
    getRepoUser: getRepoUser,
    getRepository: getRepository,
    getRepositoryContents: getRepositoryContents,
    getRepositoryReadme: getRepositoryReadme
  }

  return service;


}]);