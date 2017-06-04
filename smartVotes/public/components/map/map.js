(function() {
  'use strict'

  angular.module('app')
    .component('map', {
      templateUrl: "components/map/map.html",
      controller: map
    });

    function map(showPage, params) {
      const vm = this;
      vm.show = showPage;
      vm.params = params;

    }

  angular.module('app').directive('svgMap', ['$compile', 'params', function ($compile, params) {
    return {
      restrict: 'A',
      templateUrl: '../../images/map.svg',
      link: function (scope, element, attrs) {
        var regions = element[0].querySelectorAll('.state');
        angular.forEach(regions, function (path, key) {
          var regionElement = angular.element(path);
          regionElement.attr("region", "");
          $compile(regionElement)(scope);
          console.log();
        })
      }
    }
  }]);

  angular.module('app').directive('region', ['$compile', 'showPage', 'params', function ($compile, showPage, params) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, element, attrs) {
        scope.elementId = element.attr("id");

        scope.regionClick = function () {
          showPage.map = !showPage.map
          showPage.repModule = !showPage.repModule
          params.state_id = scope.elementId
          params.renderCongress()
          element.addClass('big')
          console.log(params);
        };
        element.attr("ng-click", "regionClick()");
        element.removeAttr("region");
        $compile(element)(scope);
      }
    }
  }]);

})()
