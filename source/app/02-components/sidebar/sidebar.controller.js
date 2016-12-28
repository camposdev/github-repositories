(function() {

  'use strict';

  angular
    .module( 'App' ) 
    .controller( 'SidebarController', SidebarController );

  SidebarController.$inject = [ '$rootScope', 'UserData', '$log' ];

  function SidebarController( $rootScope, UserData, $log ) {
      
    var vm = this;

    vm.errorUser;
    vm.user = {};

    getUser();

    ///////////////
    
    /**
     * Busca dados do usuário
     */
    function getUser() {
      return UserData.getDataUser( $rootScope.userName ).then( success ).catch( error );

      function success( res ) {
        vm.user = res.data;
        return vm.user;
      }

      function error( error ) {
        $log.error( error.data );
        vm.errorUser = error.data;
        return vm.errorUser;
      }
    }

  }

})();