(function() {
  'use strict';

  angular
    .module('upcomingStops.livebus')
    .factory('livebusFactory', livebusFactory);

  livebusFactory.$inject = ['$http'];

  function livebusFactory($http) {

    var getLiveBus = function() {
      return $http.get('data/mock.livebus.json');
    };

    return {
      getLiveBus: getLiveBus
    };
  };
})();
