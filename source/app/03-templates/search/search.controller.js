(function() {

  'use strict';

  angular
    .module( 'App' )
    .controller( 'SearchController', SearchController );

  SearchController.$inject = [ 'SearchData', '$stateParams', '$log' ];

  function SearchController( SearchData, $stateParams, $log ) {

    var vm = this;

    vm.errorSearch;
    vm.results = [];
    vm.term = $stateParams.s;

    resultSearch();

    ///////////////////

    /**
     * Função que busca resultados da pesquisa
     * @param {string}  term
     */
    function resultSearch() {
      return SearchData.getSearch( $stateParams.s ).then( success ).catch( error );

      function success( res ) {
        vm.results = res.data.items;
        return vm.results;
      }

      function error( error ) {
        $log.error( error.data );
        vm.errorSearch = error.data;
        return vm.errorSearch;
      }
    }

  }

})();