(function() {
  'use strict';

  upcoming.factory('eventsFactory', ['$http', function($http) {

    let getEvents = function() {
      return $http.get('data/mock.events.json');
    };

    return {
      getEvents: getEvents
    };
  }]);
})();
