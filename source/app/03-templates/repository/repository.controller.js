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