(function() {
  'use strict'

  angular.module('app')
    .component('singlerep', {
      templateUrl: "components/singlerep/singlerep.html",
      controller: singlerep
    });

    function singlerep($http, showPage, repData) {
      const vm = this
      vm.show = showPage
      vm.rep = repData
      vm.display = vm.rep.single[0]

      vm.getAge = function() {
        var age = vm.rep.single[0].date_of_birth.slice(0, 4)*1
        return 2018 - age
      }


    }

})()
