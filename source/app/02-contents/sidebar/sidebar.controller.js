app.controller('SidebarController', ['WebService', '$cookies', '$window', '$state', '$stateParams', function( WebService, $cookies, $window, $state, $stateParams ){
  
  var vm = this;

  WebService.getDataUser( $stateParams.user, function( res ) {
    vm.user = res;
  });

  vm.changeUser = function( username ) {
    $state.go( '.', { user: username }, {reload: true} );
  }

}]);