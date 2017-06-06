(function() {
  'use strict'

  angular.module('app')
    .component('singlerep', {
      templateUrl: "components/singlerep/singlerep.html",
      controller: singlerep
    });

    function login(showPage) {
      const vm = this
      vm.show = showPage


    }

})()
