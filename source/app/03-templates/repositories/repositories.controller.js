app.controller('ReposController', ['WebService', function( WebService ){
  
  var vm = this;

  WebService.getRepoUser( function( res ) {
    vm.repos = res;
  });

}]);