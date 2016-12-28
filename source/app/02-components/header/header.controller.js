(function() {

  'use strict';

  angular
    .module( 'App' )
    .controller( 'HeaderController', HeaderController );

    HeaderController.$inject = [ '$rootScope', '$state' ];

    function HeaderController( $rootScope, $state ) {

      var vm = this;

      vm.search = search;

      //////////////////

      /**
       * Armazena termo da busca e envia para a rota de buscas
       * com o termo da pesquisa como parâmetro
       * @params {object}   form
       */
      function search( form ) {
        if ( form.$valid ){
          var term = vm.term;
          $state.go( 'search', { 's': term } );
        }
      }

    }

})();