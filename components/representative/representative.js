(function() {
  'use strict'

  angular.module('app')
    .component('representative', {
      templateUrl: "components/representative/representative.html",
      controller: representative
    });

    function representative($http, showPage, params, repData, APP_CONFIG) {
      const vm = this
      vm.toggle = showPage
      vm.showMod = showPage
      vm.state = params
      params.renderCongress = function() {
        $http({
          method: 'GET',
          url: APP_CONFIG.api_baseurl+'/people/house/'+params.state_id
        }).then(function (response) {
          vm.reps = response.data.results;
        }, function(response) {
          console.log(response);
        })

        $http({
          method: 'GET',
          url: APP_CONFIG.api_baseurl+'/people/senate/'+params.state_id
        }).then(function (response) {
          vm.senators = response.data.results;
        }, function(response) {
          console.log(response);
        })
      }

      vm.getRep = function(key) {
        var id = key.slice(-12,-5)
        vm.showMod.donorDetails = false
        $http({
          method: 'GET',
          url: APP_CONFIG.api_baseurl+'/people/single/'+id
        }).then(function (response) {
          vm.rep = response.data.results;
          repData.single = vm.rep
          $http({
            method: 'GET',
            url: APP_CONFIG.api_baseurl+'/people/donors/'+repData.single[0].crp_id
          }).then(function (response) {
            vm.donors = response.data.response.contributors.contributor
            repData.donors = vm.donors

            $http({
              method: 'GET',
              url: APP_CONFIG.api_baseurl+'/people/sector/'+repData.single[0].crp_id
            }).then(function (response) {
              vm.showMod.repDetails = true
              vm.showMod.donorDetails = true
              vm.sectors = response.data.response.sectors.sector
              repData.sectors = vm.sectors
            }, function(response) {
              console.log(response);
            })

          }, function(response) {
            console.log(response);
          })

        }, function(response) {
          console.log(response);
        })

      }
    }

})()
