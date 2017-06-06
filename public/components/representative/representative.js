(function() {
  'use strict'

  angular.module('app')
    .component('representative', {
      templateUrl: "components/representative/representative.html",
      controller: representative
    });

    function representative($http, showPage, params, repData) {
      const vm = this
      vm.toggle = showPage
      vm.showMod = showPage
      vm.state = params
      params.renderCongress = function() {
        $http({
          method: 'GET',
          url: '/people/house/'+params.state_id
        }).then(function (response) {
          vm.reps = response.data.results;
          console.log(vm.reps);
        }, function(response) {
          console.log(response);
        })

        $http({
          method: 'GET',
          url: '/people/senate/'+params.state_id
        }).then(function (response) {
          vm.senators = response.data.results;
          console.log(vm.senators);
        }, function(response) {
          console.log(response);
        })
      }

      vm.getRep = function(key) {
        var id = key.slice(-12,-5)

        $http({
          method: 'GET',
          url: '/people/single/'+id
        }).then(function (response) {
          vm.rep = response.data.results;
          repData.single = vm.rep
          console.log(repData.single);

          $http({
            method: 'GET',
            url: '/people/donors/'+repData.single[0].crp_id
          }).then(function (response) {
            vm.donors = response.data.response.contributors.contributor
            repData.donors = vm.donors
          }, function(response) {
            console.log(response);
          })

        }, function(response) {
          console.log(response);
        })

      }
    }

})()
