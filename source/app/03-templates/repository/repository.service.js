(function() {

  'use strict';

  angular
    .module( 'App' )
    .factory( 'RepositoryData', RepositoryData );

  RepositoryData.$inject = [ '$http', 'urlAPI' ];

  function RepositoryData( $http, urlAPI ) {

    return {
      getRepository: getRepository,
      getRepositoryContents: getRepositoryContents,
      getRepositoryReadme: getRepositoryReadme,
      getRepositoryFile: getRepositoryFile
    }

    ///////////////

    /**
     * Busca dados de um repositórios
     * @params {string}   user
     * @params {string}   repository
     * Doc: https://developer.github.com/v3/repos/contents/
     */
    function getRepository( user, repository ){
      return $http.get( urlAPI + 'repos/' + user + '/' + repository );
    }

    /**
     * Busca estrutura de arquivos de um repositórios
     * @params {string}   repository
     * @params {string}   path
     * @params {function} callback
     * Doc: https://developer.github.com/v3/repos/contents/#get-contents
     */
    function getRepositoryContents( user, repository, path ){

      if ( path ) {
        var url = urlAPI + 'repos/' + user + '/' + repository + '/contents/' + path;
      } else {
        var url = urlAPI + 'repos/' + user + '/' + repository + '/contents';
      }
      return $http.get( url );
    }

    /**
     * Busca readme de um repositórios
     * @params {string}   repository
     * @params {function} callback
     * Doc: https://developer.github.com/v3/repos/contents/#get-contents
     */
    function getRepositoryReadme( user, repository ){
      return $http.get( urlAPI + 'repos/' + user + '/' + repository + '/readme', {
        headers: { 'accept': 'application/vnd.github.VERSION.html' }
      });
    }

    /**
     * Busca conteúdo de um arquivo
     * @params {string}   user
     * @params {string}   repository
     * @params {string}   path
     * Doc: https://developer.github.com/v3/repos/contents/#get-contents
     */
    function getRepositoryFile( user, repository, path ){
      return $http.get( urlAPI + 'repos/' + user + '/' + repository + '/contents/' + path, {
        headers: { 'accept': 'application/vnd.github.VERSION.html' }
      });
    }

  }

})();