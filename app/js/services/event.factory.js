(function() {
  'use strict';

  upcoming.factory('eventFactory', eventFactory);

  eventFactory.$inject = ['$http'];

  function eventFactory($http) {

    let getEvents = function() {
      return $http.get('data/mock.events.json');
    };

    return {
      getEvents: getEvents
    };
  };
})();
