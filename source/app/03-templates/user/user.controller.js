app.controller('UserController', ['WebService', '$stateParams', function( WebService, $stateParams ){
  
  var vm = this;

  WebService.getRepoUser( $stateParams.user, function( res ) {
    vm.repos = res;
    vm.user = $stateParams.user;
  });

}]);