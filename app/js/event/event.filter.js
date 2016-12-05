(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .filter('distanceFormat', distanceFormat);

  distanceFormat.$inject = [];

  function distanceFormat() {

    return function(x) {
      var distance;
      if(isNaN(x)){
        return;
      } else {
        distance = x.toFixed(2);
        return distance;
      }
    };
  };

})();