(function() {

  'use strict';

  angular
    .module( 'App' )
    .run( appRun );

  appRun.$inject = [ '$http', '$rootScope' ];

  function appRun( $http, $rootScope ) {

    $rootScope.userName = 'camposdev';

    // Insira aqui o token
    

  }

})();