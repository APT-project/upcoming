(function() {
  'use strict';

  angular
    .module('upcomingStops.bus')
    .service('busLocationMockingService', BusLocationMockingService);

    BusLocationMockingService.$inject = ['$rootScope'];

    function BusLocationMockingService($rootScope) {
      var service = this;

      var counter = 0;
      var busLineCoordinates;

      service.setBusLineCoordinates = setBusLineCoordinates;
      service.moveMockBus = moveMockBus;

      function setBusLineCoordinates(coordinates) {
        busLineCoordinates = coordinates;
      }

      function moveMockBus() {
        $rootScope.$broadcast(
          'busLocation', busLineCoordinates[counter]
        );

        counter = (counter + 1) % busLineCoordinates.length;
      }
    }
})();
