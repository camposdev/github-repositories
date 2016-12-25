app.controller('SidebarController', ['WebService', '$cookies', function( WebService, $cookies ){
  
  var vm = this;

  WebService.getDataUser( function( res ) {
    vm.user = res;
  });

}]);