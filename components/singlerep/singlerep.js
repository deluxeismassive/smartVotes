(function() {
  'use strict'

  angular.module('app')
    .component('singlerep', {
      templateUrl: "components/singlerep/singlerep.html",
      controller: singlerep
    });

    function singlerep($http, showPage, repData, votes, APP_CONFIG) {
      const vm = this
      vm.show = showPage
      vm.rep = repData
      vm.display = vm.rep.single[0]
      vm.showMessage = ''
      vm.votes = votes
      var count = 0

      vm.getAge = function() {
        var age = vm.rep.single[0].date_of_birth.slice(0, 4)*1
        return 2018 - age
      }

      vm.getTotal = function() {
        var total = 0;
        for (var i=0; i<vm.rep.donors.length; i++) {
          total += parseInt(vm.rep.donors[i]['@attributes'].total)
        }
        return total;
      }

      vm.getSectorTotal = function() {
        var stotal = 0;
        for (var i=0; i<vm.rep.sectors.length; i++) {
          stotal += parseInt(vm.rep.sectors[i]['@attributes'].total)
        }
        return stotal;
      }

      vm.getEleWidth = function(sector) {
        var percent = (sector/vm.getSectorTotal())
        return percent*100;
      }

      vm.getColor = function(sector) {
        var percent = (sector/vm.getSectorTotal())
        var color = percent.toString().slice(3,6)
        return color
      }

      vm.condenseRepVotes = function(array) {
        var score = 0
        var repYesNoVotes = []
        var newArray = vm.votes.billURIarray.forEach(uri => {
          array.forEach(vote => {
            if (uri === vote.bill.bill_uri) {
              repYesNoVotes.push({'Y_N': vote.position, 'uri': uri})
            }
          })
        });
        vm.voteScore = repYesNoVotes.forEach(vote => {
          vm.votes.userVotes.forEach(uri => {
            if (uri.bill_uri === vote.uri) {
              if ((uri.yes_no === true && vote.Y_N === 'Yes') || (uri.yes_no === false && vote.Y_N === 'No')) {
                score++
              }
            }
          })
        })
        vm.voteScore = (score/vm.votes.userVotes.length)*100
        return (score/vm.votes.userVotes.length)*100
      }

      vm.compareVotes = function() {
        $http({
          method: 'GET',
          url: APP_CONFIG.api_baseurl+'/votes/single/'+vm.rep.single[0].member_id
        }).then(function (response) {
          vm.votes.repVotesArray = response.data.results[0].votes
          vm.condenseRepVotes(vm.votes.repVotesArray);
        }, function(response) {
          console.log(response);
        })
      }
    }

})()
