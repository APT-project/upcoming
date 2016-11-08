(function() {
  'use strict';

  upcoming.factory('eventFactory', ['$http', function($http) {

    let getEvents = function() {
      return $http.get('data/mock.events.json');
    };

    return {
      getEvents: getEvents
    };
  }]);
})();
