(function() {
  'use strict';

  upcoming.factory('livebusFactory', ['$http', function($http) {

    let getLiveBus = function() {
      return $http.get('data/mocklivebus.json');
    };

    return {
      getLiveBus: getLiveBus
    };
  }]);
})();
