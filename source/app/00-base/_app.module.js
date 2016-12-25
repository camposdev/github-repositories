var app = angular.module('App', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router']);

app.run(['$cookies', '$http', function( $cookies, $http ){
  
  // Se não existir um cookie de usuário é configurado manualmente
  if ( !$cookies.get('userDefault') ) {
    $cookies.put('userDefault', 'camposdev' );
  }

  // Autorização para acesso a API
  $http.defaults.headers.common.Authorization = 'Basic 2215e815067099f28eb1cacf703d1020320d36d4';

}]);