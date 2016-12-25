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