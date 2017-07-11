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
        vm.yesVotes = []
        vm.votes.userVotes.forEach( e => {
          if (e.yes_no === true) {
            vm.yesVotes.push(e.bill_id)
          }
        })
        vm.noVotes = []
        vm.votes.userVotes.forEach( e => {
          if (e.yes_no === false) {
            vm.noVotes.push(e.bill_id)
          }
        })
      }, function(response) {
        console.log(response);
      })



      vm.yesVote = function($event, index) {
        var el = angular.element($event.currentTarget)
        el.parent().children().removeClass('noVoted')
        el.addClass('yesVoted')
        var vote = {bill_id: vm.votesDb[index].id, yes_no: true, user_id: localStorage.userId, bill_uri: vm.votesDb[index].bill_uri}

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

      vm.noVote = function($event, index) {
        var el = angular.element($event.currentTarget)
        el.parent().children().removeClass('yesVoted')
        el.addClass('noVoted')
        var vote = {bill_id: vm.votesDb[index].id, yes_no: false, user_id: localStorage.userId, bill_uri: vm.votesDb[index].bill_uri}
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

      vm.displayPdf = function(index) {
        $window.open(vm.votesDb[index].pdf)
      }

      vm.votes.getExistingYesVote = function() {

      }

    }

})()
