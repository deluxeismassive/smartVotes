(function() {
  'use strict'

  angular.module('app', [])
  .service('showPage', function () {
    this.map = false
    this.houseToggle = false;
    this.repModule = true;
    this.login = true;
    this.repDetails = false;
    this.donorDetails = false;
  })
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
  .constant('APP_CONFIG', {
    api_baseurl: /\/\/localhost/.test(location.href) ? '//localhost:3000' : 'https://smartvotes.herokuapp.com'
  })


})();
