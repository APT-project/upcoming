(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .filter('distanceFormat', distanceFormat);

  distanceFormat.$inject = [];

  function distanceFormat() {

    return function(x, symbol) {
      var distance;
      if (isNaN(x)) {
        return x;
      }
      else if (x > 1) {
        distance = x.toFixed(2);
        return distance + symbol;
      }

      else {
        distance = x.toFixed(2) * 1000;
        return distance + symbol;
      }
    }
  };

})();