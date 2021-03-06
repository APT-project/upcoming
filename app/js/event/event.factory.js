(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .factory('eventFactory', eventFactory);

  eventFactory.$inject = ['$http'];

  function eventFactory($http) {

    var getEvents = function() {
      return $http.get('data/mock.events.json');
    };

    return {
      getEvents: getEvents
    };
  };
})();
