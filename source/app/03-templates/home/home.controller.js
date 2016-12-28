(function() {

  'use strict';

  angular
    .module( 'App' )
    .controller( 'UserController', UserController );

  UserController.$inject = [ '$rootScope', 'UserData', '$log' ]

  function UserController( $rootScope, UserData, $log ) {
  
    var vm = this;

    vm.errorRepos;
    vm.repos = [];

    getRepositories();

    //////////////////

    /**
     * Busca repositórios do usuário
     */
    function getRepositories() {
      return UserData.getRepoUser( $rootScope.userName ).then( success ).catch( error );

      function success( res ) {
        vm.repos = res.data;
        return vm.repos;
      }

      function error( error ) {
        $log.error( error.data );
        vm.errorRepos = error.data;
        return vm.errorRepos;
      }
    }
  }

})();