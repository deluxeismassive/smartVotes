(function() {
  'use strict'

  angular.module('app')
    .component('login', {
      templateUrl: "components/login/login.html",
      controller: login
    });

    function login(showPage, authService, $http, APP_CONFIG, votes) {
      const vm = this
      vm.votes = votes
      vm.show = showPage
      vm.auth = authService

      if (localStorage.access_token) {
        vm.email = JSON.parse(localStorage.profile).email

        $http({
          method: 'GET',
          url: APP_CONFIG.api_baseurl+'/votes/'+vm.email
        }).then(function (response) {
          vm.votes.userVotes = response.data
        }, function(response) {
          console.log(response);
        })
      }



      vm.representativeToggle = function() {
        vm.show.login = !vm.show.login
        vm.show.map = !vm.show.map
      }

      vm.gotoVotes = function() {
        vm.show.login = !vm.show.login
        vm.show.votes = !vm.show.votes
      }


    }

})()
