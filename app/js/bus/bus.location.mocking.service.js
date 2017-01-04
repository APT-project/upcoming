(function() {
  'use strict';

  angular
    .module('upcomingStops.bus')
    .service('busLocationMockingService', BusLocationMockingService);

    BusLocationMockingService.$inject = ['$rootScope', '$interval'];

    function BusLocationMockingService($rootScope, $interval) {
      var service = this;

      var counter = 0;
      var busLineCoordinates = [
        {latitude: 61.498478, longitude: 23.771710},
        {latitude: 61.498294, longitude: 23.768578},
        {latitude: 61.498110, longitude: 23.765874},
        {latitude: 61.498007, longitude: 23.764844},
        {latitude: 61.496942, longitude: 23.766904},
        {latitude: 61.497106, longitude: 23.767376},
        {latitude: 61.497188, longitude: 23.768835},
        {latitude: 61.497352, longitude: 23.770466},
        {latitude: 61.496512, longitude: 23.770680},
        {latitude: 61.496635, longitude: 23.772440}
      ];

      service.runMockBus = runMockBus;

      function runMockBus() {
        $rootScope.$broadcast(
          'busLocation', busLineCoordinates[counter]
        );

        counter = (counter + 1) % busLineCoordinates.length;
      }
    }
})();
