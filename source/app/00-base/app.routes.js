(function() {

  'use strict';

  angular 
    .module( 'App' )
    .config( ConfigRoutes );

    ConfigRoutes.$inject = [ '$stateProvider', '$urlRouterProvider', '$locationProvider' ];

    function ConfigRoutes( $stateProvider, $urlRouterProvider, $locationProvider ) {

      $locationProvider.html5Mode(false);
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'public/app/03-templates/home/home.html'
        })

        .state('repository', {
          url: '/repository/:user/:repository',
          templateUrl: 'public/app/03-templates/repository/repository.html'
        })

        .state('search', {
          url: '/search/:s',
          templateUrl: 'public/app/03-templates/search/search.html'
        })

    }

})();