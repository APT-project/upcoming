(function() {
  'use strict';

  angular
    .module('upcomingStops.bus')
    .service('busLocationMockingService', BusLocationMockingService);

    BusLocationMockingService.$inject = ['$rootScope'];

    function BusLocationMockingService($rootScope) {
      var service = this;

      var counter = 0;
      var busLineCoordinates = [
        {latitude: 61.495348, longitude: 23.760619},
        {latitude: 61.495447, longitude: 23.761440},
        {latitude: 61.495454, longitude: 23.761564},
        {latitude: 61.495467, longitude: 23.761616},
        {latitude: 61.495921, longitude: 23.761476},
        {latitude: 61.496722, longitude: 23.761223},
        {latitude: 61.497021, longitude: 23.761116},
        {latitude: 61.497247, longitude: 23.761027},
        {latitude: 61.497278, longitude: 23.761443},
        {latitude: 61.497306, longitude: 23.761789},
        {latitude: 61.497536, longitude: 23.761746},
        {latitude: 61.497723, longitude: 23.761711},
        {latitude: 61.497755, longitude: 23.761706},
        {latitude: 61.497787, longitude: 23.762009},
        {latitude: 61.497853, longitude: 23.762822},
        {latitude: 61.497929, longitude: 23.763838},
        {latitude: 61.497989, longitude: 23.764546},
        {latitude: 61.498011, longitude: 23.764873},
        {latitude: 61.497960, longitude: 23.764970},
        {latitude: 61.497733, longitude: 23.765418},
        {latitude: 61.497310, longitude: 23.766231},
        {latitude: 61.496684, longitude: 23.767317},
        {latitude: 61.496278, longitude: 23.767934},
        {latitude: 61.495519, longitude: 23.768985},
        {latitude: 61.494658, longitude: 23.769723},
        {latitude: 61.494393, longitude: 23.769908},
        {latitude: 61.494434, longitude: 23.770090},
        {latitude: 61.494724, longitude: 23.771332},
        {latitude: 61.494861, longitude: 23.771971},
        {latitude: 61.494949, longitude: 23.772649},
        {latitude: 61.494951, longitude: 23.773148},
        {latitude: 61.494902, longitude: 23.774768},
        {latitude: 61.494839, longitude: 23.775557},
        {latitude: 61.494798, longitude: 23.775935},
        {latitude: 61.494778, longitude: 23.777067},
        {latitude: 61.494843, longitude: 23.779644},
        {latitude: 61.494864, longitude: 23.779891},
        {latitude: 61.495040, longitude: 23.779864},
        {latitude: 61.495982, longitude: 23.779832},
        {latitude: 61.497337, longitude: 23.779778},
        {latitude: 61.498791, longitude: 23.779703},
        {latitude: 61.498985, longitude: 23.779714},
        {latitude: 61.498985, longitude: 23.779049},
        {latitude: 61.498967, longitude: 23.776748},
        {latitude: 61.498944, longitude: 23.774189},
        {latitude: 61.498921, longitude: 23.772907},
        {latitude: 61.498824, longitude: 23.772365},
        {latitude: 61.498622, longitude: 23.771807},
        {latitude: 61.498542, longitude: 23.771480},
        {latitude: 61.498468, longitude: 23.771079},
        {latitude: 61.498408, longitude: 23.770114},
        {latitude: 61.498276, longitude: 23.768532},
        {latitude: 61.498183, longitude: 23.766979},
        {latitude: 61.498129, longitude: 23.766088},
        {latitude: 61.498152, longitude: 23.765729},
        {latitude: 61.498098, longitude: 23.764898},
        {latitude: 61.498016, longitude: 23.763707},
        {latitude: 61.497870, longitude: 23.761947},
        {latitude: 61.497741, longitude: 23.760126},
        {latitude: 61.497721, longitude: 23.759922},
        {latitude: 61.497524, longitude: 23.759973},
        {latitude: 61.496974, longitude: 23.760104},
        {latitude: 61.496643, longitude: 23.760231},
        {latitude: 61.495677, longitude: 23.760520}
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
