(function() {
  'use strict';

  angular.module('upcomingStops.bus', [])
    .run(['$interval', 'busLocationMockingService', 'isDemoMode', function($interval, busLocationMockingService, isDemoMode) {
      if (isDemoMode) {
        $interval(busLocationMockingService.runMockBus, 1750);
      }
    }]);
})();
