(function() {
  'use strict';

  upcoming.factory('livebusFactory', livebusFactory);

  livebusFactory.$inject = ['$http'];

  function livebusFactory($http) {

    let getLiveBus = function() {
      return $http.get('data/mock.livebus.json');
    };

    return {
      getLiveBus: getLiveBus
    };
  };
})();
