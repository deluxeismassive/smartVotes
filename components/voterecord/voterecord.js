(function() {
  'use strict'

  angular.module('app')
    .component('voterecord', {
      templateUrl: "components/voterecord/voterecord.html",
      controller: voterecord
    });

    function voterecord($http, showPage, repData, APP_CONFIG, $window) {
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
      }, function(response) {
        console.log(response);
      })

      vm.yesVote = function(index) {
        var vote = {bill_id: vm.votesDb[vm.selector].id, yes_no: true, user_id: localStorage.userId}
        $http({
          method: 'PUT',
          url: APP_CONFIG.api_baseurl+'/votes',
          data: vote
        }).then(function (response) {
          console.log(response);
        }, function(response) {
          console.log(response);
        })
      }

      vm.noVote = function(index) {
        var vote = {bill_id: vm.votesDb[vm.selector].id, yes_no: false, user_id: localStorage.userId}
        $http({
          method: 'PUT',
          url: APP_CONFIG.api_baseurl+'/votes',
          data: vote
        }).then(function (response) {
          console.log(response);
        }, function(response) {
          console.log(response);
        })
      }

      vm.forwardCycle = function() {
        vm.selector++
      }

      vm.displayPdf = function() {
        $window.open(vm.votesDb[vm.selector].pdf)
      }

    }

})()
