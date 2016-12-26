app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function( $stateProvider, $urlRouterProvider, $locationProvider ) {

  $locationProvider.html5Mode(false);

  // Routes
  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('default', {
      url: '/',
      templateUrl: 'public/app/03-templates/default/default.html'
    })

    .state('default.user', {
      url: ':user',
      views: {
        'content': {
          templateUrl: 'public/app/03-templates/user/user.html'
        },
        'sidebar': {
          templateUrl: 'public/app/02-contents/sidebar/sidebar.html'
        }
      }
    })

    .state('default.repository', {
      url: ':user/:repository',
      views: {
        'content': {
          templateUrl: 'public/app/03-templates/repository/repository.html'
        },
        'sidebar': {
          templateUrl: 'public/app/02-contents/sidebar/sidebar.html'
        }
      }
    })
  
}]);