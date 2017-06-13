(function() {
  'use strict'

  angular.module('app')
    .component('voterecord', {
      templateUrl: "components/voterecord/voterecord.html",
      controller: voterecord
    });

    function voterecord($http, showPage, repData, APP_CONFIG) {
      const vm = this
      vm.selector = 0
      vm.show = showPage
      

      $http({
        method: 'GET',
        url: APP_CONFIG.api_baseurl+'/bills/api'
      }).then(function (response) {
      }, function(response) {
      })

      $http({
        method: 'GET',
        url: APP_CONFIG.api_baseurl+'/bills/db'
      }).then(function (response) {
        vm.votesDb = response.data
        console.log(vm.votesDb);
      }, function(response) {
        console.log(response);
      })

      vm.forwardCycle = function() {
        vm.selector++
      }

    }

})()
