(function() {
  'use strict';

  angular.module('upcomingStops.bus', [])
    .run(['$interval', 'busLocationMockingService', function($interval, busLocationMockingService) {
      $interval(busLocationMockingService.runMockBus, 1000);
    }]);
})();
