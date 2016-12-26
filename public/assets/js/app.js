var app = angular.module('App', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function( $stateProvider, $urlRouterProvider, $locationProvider ) {

  $locationProvider.html5Mode(false);

  // Routes
  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('default', {
      url: '/',
      templateUrl: 'public/app/03-templates/default/default.html'
    })

    .state('default.user', {
      url: ':user',
      views: {
        'content': {
          templateUrl: 'public/app/03-templates/user/user.html'
        },
        'sidebar': {
          templateUrl: 'public/app/02-contents/sidebar/sidebar.html'
        }
      }
    })

    .state('default.repository', {
      url: ':user/:repository',
      views: {
        'content': {
          templateUrl: 'public/app/03-templates/repository/repository.html'
        },
        'sidebar': {
          templateUrl: 'public/app/02-contents/sidebar/sidebar.html'
        }
      }
    })
  
}]);
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
app.controller('SidebarController', ['WebService', '$cookies', '$window', '$state', '$stateParams', function( WebService, $cookies, $window, $state, $stateParams ){
  
  var vm = this;

  WebService.getDataUser( $stateParams.user, function( res ) {
    vm.user = res;
  });

  vm.changeUser = function( username ) {
    $state.go( '.', { user: username }, {reload: true} );
  }

}]);
app.controller('DefaultController', ['$stateParams', '$state', function( $stateParams, $state ){
    
  var vm = this;

  // Ao iniciar verifica se existe um parametro com o nome do usuário
  if ( !$stateParams.user ){
    // Se existir, redireciona a página que busca os dados e repositórios do usuário
    $state.go( 'default.user', { 'user': 'camposdev' } );
  }

}]);
app.controller('RepositoryController', ['WebService', '$stateParams', function( WebService, $stateParams ){

  var vm = this;
  
  vm.user = $stateParams.user;

  WebService.getRepository( $stateParams.user, $stateParams.repository, function( res ) {
    vm.repository = res;
    vm.owner = res.owner;
  });

  WebService.getRepositoryContents( $stateParams.user, $stateParams.repository, null, function( res ) {
    res.sort(changeOrder);
    vm.path = res;
  });

  WebService.getRepositoryReadme( $stateParams.user, $stateParams.repository, function( res ) {
    vm.readme = res;
  });

  function changeOrder(a,b) {
    if (a.type < b.type)
      return -1;
    if (a.type > b.type)
      return 1;
    return 0;
  }

}]);
app.controller('UserController', ['WebService', '$stateParams', function( WebService, $stateParams ){
  
  var vm = this;

  WebService.getRepoUser( $stateParams.user, function( res ) {
    vm.repos = res;
    vm.user = $stateParams.user;
  });

}]);