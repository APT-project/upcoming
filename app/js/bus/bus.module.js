(function() {
  'use strict';

  angular.module('upcomingStops.bus', [])
    .run(['$interval', 'busLocationMockingService', 'isDemoMode', function($interval, busLocationMockingService, isDemoMode) {
      $interval(busLocationMockingService.runMockBus, 1000);
    }]);
})();
