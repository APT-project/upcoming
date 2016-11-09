(function() {
  'use strict';

  angular
    .module('upcomingStops')
    .controller('EventController', EventController);

  EventController.$inject = ['eventFactory'];

  function EventController(eventFactory) {

    let vm = this;

    eventFactory.getEvents().then(function success(response) {
      vm.events = response.data;
    }, function error(response) {
      console.log(response.status + response.statusText);
    });

  };
})();
