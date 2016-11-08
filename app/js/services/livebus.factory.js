(function() {
  'use strict';

  upcoming.factory('livebusFactory', ['$http', function($http) {

    let getLiveBus = function() {
      return $http.get('data/mock.livebus.json');
    };

    return {
      getLiveBus: getLiveBus
    };
  }]);
})();
