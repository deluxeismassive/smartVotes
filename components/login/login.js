(function() {
  'use strict'

  angular.module('app')
    .component('login', {
      templateUrl: "components/login/login.html",
      controller: login
    });

    function login(showPage, authService) {
      const vm = this
      vm.show = showPage
      vm.auth = authService

      vm.representativeToggle = function() {
        vm.show.login = !vm.show.login
        vm.show.map = !vm.show.map
      }
    }

})()
