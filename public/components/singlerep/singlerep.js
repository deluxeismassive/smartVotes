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
      vm.showMessage = ''
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
    }

})()
