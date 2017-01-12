(function() {
  'use strict';

  angular.module('upcomingStops.bus', ['upcomingStops.shared'])
    .run(['$interval', 'busLocationMockingService', 'routeFetchingService', 'isDemoMode', function($interval, busLocationMockingService, routeFetchingService, isDemoMode) {
      if (isDemoMode) {
        var routeCoordinates;
        routeFetchingService.fetchRoute()
          .then(function success(response) {
            routeCoordinates = response.data;
            busLocationMockingService.setBusLineCoordinates(routeCoordinates);
            $interval(busLocationMockingService.moveMockBus, 1750);
          },
          function error(response) {
            console.log("Could not load the demo route for location mocking: ", response.status, response.statusText);
          });
      }
    }]);
})();
