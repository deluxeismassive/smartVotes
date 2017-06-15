(function() {
  'use strict'

  angular.module('app')
    .component('voterecord', {
      templateUrl: "components/voterecord/voterecord.html",
      controller: voterecord
    });

    function voterecord($http, showPage, repData, APP_CONFIG, $window, votes) {
      const vm = this
      vm.selector = 0
      vm.show = showPage
      vm.votes = votes
      vm.billArray = []


      $http({
        method: 'GET',
        url: APP_CONFIG.api_baseurl+'/bills/api'
      }).then(function (response) {
        var tempArray = response.data.results[0].bills
        tempArray.forEach((bill) => {
          vm.billArray.push(bill.bill_uri)
        });
        vm.votes.billURIarray = vm.billArray;;
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
        var vote = {bill_id: vm.votesDb[vm.selector].id, yes_no: true, user_id: localStorage.userId, bill_uri: vm.votesDb[vm.selector].bill_uri}
        $http({
          method: 'PUT',
          url: APP_CONFIG.api_baseurl+'/votes',
          data: vote
        }).then(function (response) {
          console.log(response);
          console.log(vm.votes);
        }, function(response) {
          console.log(response);
        })
      }

      vm.noVote = function(index) {
        console.log(vm.votesDb);
        var vote = {bill_id: vm.votesDb[vm.selector].id, yes_no: false, user_id: localStorage.userId, bill_uri: vm.votesDb[vm.selector].bill_uri}
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

      vm.backwardCycle = function() {
        vm.selector--
      }

      vm.displayPdf = function() {
        $window.open(vm.votesDb[vm.selector].pdf)
      }

    }

})()
