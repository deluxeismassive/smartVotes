(function() {
  'use strict'

  angular
  .module('app', ['auth0.auth0', 'ui.router', 'ngLoadingSpinner'])
  .config(config)
  .service('params', function () {
    this.senate = []
    this.house = []
    this.state_id = ''
  })
  .service('repData', function () {
    this.single = {}
    this.donors = {}
    this.sectors ={}
  })
  .service('showPage', function () {
  this.map = false
  this.houseToggle = false;
  this.repModule = true;
  this.login = true;
  this.repDetails = false;
  this.donorDetails = false;
  this.votes = false;
  })
  .service('votes', function () {
    this.userVotes = []
  })
  .constant('APP_CONFIG', {
    api_baseurl: /\/\/localhost/.test(location.href) ? '//localhost:3000' : 'https://smartvotes.herokuapp.com'
  })

  config.$inject = [
   '$stateProvider',
   '$locationProvider',
   '$urlRouterProvider',
   'angularAuth0Provider'
  ];

  function config(
    $stateProvider,
    $locationProvider,
    $urlRouterProvider,
    angularAuth0Provider
  ) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'app/home/home.html',
        controllerAs: 'vm'
      })
      .state('callback', {
        url: '/callback',
        controller: 'CallbackController',
        templateUrl: 'app/callback/callback.html',
        controllerAs: 'vm'
      });

    // Initialization for the angular-auth0 library
    angularAuth0Provider.init({
      clientID: 'HxxZ5Gu2G15ZN20Ovq91zASXax32pocJ',
      domain: 'nathanedlen.auth0.com',
      responseType: 'token id_token',
      audience: 'https://nathanedlen.auth0.com/userinfo',
      redirectUri: 'http://localhost:5000/callback',
      scope: 'openid profile email'
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('');

    /// Comment out the line below to run the app
    // without HTML5 mode (will use hashes in routes)
    $locationProvider.html5Mode(true);
  }

})();
