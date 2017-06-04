(function() {
  'use strict'

  angular.module('app', [])
  .service('showPage', function () {
    this.map = false
    this.houseToggle = false;
    this.repModule = true;
    this.login = true;
  })
  .service('params', function () {
    this.senate = []
    this.house = []
    this.state_id = ''
  })
  .service('repData', function () {
    this.single = {}
    this.donors = {}
  })


})();
