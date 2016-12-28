(function() {

  'use strict';

  angular
    .module( 'App' )
    .factory( 'SearchData', SearchData );

  SearchData.$inject = [ '$http', 'urlAPI' ];

  function SearchData( $http, urlAPI ) {

    return {
      getSearch: getSearch
    }

    /////////////////

    /**
     * Busca resultados de repositórios
     * @param {string}  search
     * Doc: https://developer.github.com/v3/search/#search-repositories
     */
    function getSearch( term ) {
      return $http.get( urlAPI + 'search/repositories?q=' + term + '&sort=stars&order=desc' );
    }

  }

})();