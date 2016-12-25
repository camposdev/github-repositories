var app = angular.module('App', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router']);

app.run(['$cookies', '$http', function( $cookies, $http ){
  
  // Se não existir um cookie de usuário é configurado manualmente
  if ( !$cookies.get('userDefault') ) {
    $cookies.put('userDefault', 'camposdev' );
  }

}]);