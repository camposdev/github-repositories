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