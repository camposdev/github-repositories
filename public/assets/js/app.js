var app = angular.module('App', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router']);

app.run(['$cookies', '$http', function( $cookies, $http ){
  
  // Se não existir um cookie de usuário é configurado manualmente
  if ( !$cookies.get('userDefault') ) {
    $cookies.put('userDefault', 'camposdev' );
  }

  // Autorização para acesso a API
  $http.defaults.headers.common.Authorization = 'Basic 2215e815067099f28eb1cacf703d1020320d36d4';

}]);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function( $stateProvider, $urlRouterProvider, $locationProvider ) {

  $locationProvider.html5Mode(true);

  // Routes
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('repositories', {
      url: '/',
      templateUrl: 'app/03-templates/repositories/repositories.html'
    })
  
}]);
app.factory('WebService', ['$http', '$cookies', function( $http, $cookies ){

  var _url = 'https://api.github.com/',
      _user = $cookies.get('userDefault');

  /**
   * Busca os dados do usuário
   * @params {string}   user
   * @params {function} callback
   * Doc: https://developer.github.com/v3/users/
   */
  function getDataUser( callback ){
    return $http.get( _url + 'users/' + _user ).then( function success( res ) {
      callback( res.data );
    });
  }

  /**
   * Busca repositórios
   * @params {string}   user
   * @params {function} callback
   * Doc: https://developer.github.com/v3/repos/#list-your-repositories
   */
  function getRepoUser( callback ){
    return $http.get( _url + 'users/' + _user + '/repos' ).then( function success( res ) {
      callback( res.data );
    });
  }

  var service = {
    getDataUser: getDataUser,
    getRepoUser: getRepoUser
  }

  return service;


}]);
app.controller('SidebarController', ['WebService', '$cookies', '$window', function( WebService, $cookies, $window ){
  
  var vm = this;

  WebService.getDataUser( function( res ) {
    vm.user = res;
  });

  vm.changeUser = function( user ) {
    $cookies.put('userDefault', user );
    $window.location.reload();
  }

}]);
app.controller('ReposController', ['WebService', function( WebService ){
  
  var vm = this;

  WebService.getRepoUser( function( res ) {
    vm.repos = res;
  });

}]);