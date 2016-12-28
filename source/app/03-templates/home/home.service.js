(function() {

  'use strict';

  angular 
    .module( 'App' )
    .factory( 'UserData', UserData );

  UserData.$inject = [ '$http', 'urlAPI' ];

  function UserData( $http, urlAPI ) {

    return {
      getDataUser: getDataUser,
      getRepoUser: getRepoUser
    }

    ////////////////

    /**
     * Busca os dados do usuário
     * @params {function} callback
     * Doc: https://developer.github.com/v3/users/
     */
    function getDataUser( user ){
      return $http.get( urlAPI + 'users/' + user );
    }

    /**
     * Busca repositórios
     * @params {function} callback
     * Doc: https://developer.github.com/v3/repos/#list-your-repositories
     */
    function getRepoUser( user ){
      return $http.get( urlAPI + 'users/' + user + '/repos?sort=updated' );
    }

  }

})();