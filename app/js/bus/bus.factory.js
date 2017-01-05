(function() {
  'use strict';

  angular
    .module('upcomingStops.bus')
    .factory('busFactory', busFactory);

  busFactory.$inject = ['$http'];

  function busFactory($http) {

    var getBus = function() {
      return $http.get('data/mock.bus.json');
    };

    return {
      getBus: getBus
    };
  };
})();
