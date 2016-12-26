app.controller('DefaultController', ['$stateParams', '$state', function( $stateParams, $state ){
    
  var vm = this;

  // Ao iniciar verifica se existe um parametro com o nome do usuário
  if ( !$stateParams.user ){
    // Se existir, redireciona a página que busca os dados e repositórios do usuário
    $state.go( 'default.user', { 'user': 'camposdev' } );
  }

}]);