(function() {
  
  'use strict';

  angular
    .module( 'App' )
    .controller('RepositoryController', RepositoryController);

    RepositoryController.$inject = [ '$rootScope', 'RepositoryData', '$stateParams', '$log' ];

    function RepositoryController( $rootScope, RepositoryData, $stateParams, $log ) {

      var vm = this;

      vm.getContents = getContents;
      vm.path = [];
      vm.viewFile = {};
      vm.repository = {};
      vm.returnContents = returnContents;
      vm.user = $rootScope.userName;
      vm.selectPath = selectPath;

      getContents();
      getReadme();
      getRepository();

      ///////////////

      /**
       * Busca o arquivo readme.md
       */
      function getReadme() {

        return RepositoryData.getRepositoryReadme( $stateParams.user, $stateParams.repository).then( success ).catch( error );

        function success( res ) {
          vm.viewFile = res.data;
          return vm.viewFile;
        }

        function error( error ) {
          $log.error( error.data );
          vm.errorReadme = error.data;
          return vm.errorReadme;
        }
      }

      /**
       * Busca informações do repositório
       */
      function getRepository() {
        return RepositoryData.getRepository( $stateParams.user, $stateParams.repository ).then( success ).catch( error );

        function success( res ) {
          vm.repository = res.data;
          return vm.repository;
        }

        function error ( error ) {
          $log.error( error.data );
          vm.errorRepository = error.data;
          return vm.errorRepository;
        }
      }

      /**
       * Busca lista de arquivos
       * @param {string}  path
       */
      function getContents( path ) {
        return RepositoryData.getRepositoryContents( $stateParams.user, $stateParams.repository, path ).then( success ).catch( error );
        
        function success( res ) {
          vm.path = res.data.sort(changeOrder);
          return vm.path;
        }

        function error( error ) {
          $log.error( error.data );
          vm.errorContents = error.data;
          return vm.errorContents;
        }
      }

      /**
       * Função que busca o conteúdo do arquivo selecionado
       *
       */
      function selectPath( type, path ) {
        if ( type === 'dir' ) {
          getContents( path );
          vm.subItem = true;

        } else {

          return RepositoryData.getRepositoryFile( $stateParams.user, $stateParams.repository, path ).then( success ).catch( error );

          function success( res ) {
            vm.viewFile = res.data;
            return vm.viewFile;
          }

          function error( error ) {
            $log.error( error.data );
            vm.errorFile = error.data;
            return vm.errorFile;
          }
        }
      }

      /**
       * Volta a lista inicial de arquivos
       */
      function returnContents() {
        getContents();
        vm.subItem = false;
      }
      

      /**
       * Função que filtra altera a ordem de arquivos deixando os do tipo dir em primeiro
       */
      function changeOrder(a,b) {
        if (a.type < b.type)
          return -1;
        if (a.type > b.type)
          return 1;
        return 0;
      }

    };

})();