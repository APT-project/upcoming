(function() {
  'use strict';

  upcoming.controller('EventController', ['$scope', 'eventFactory', function($scope, eventFactory) {

    let vm = this;

    eventFactory.getEvents().then(function success(response) {
      vm.events = response.data;
    }, function error(response) {
      console.log(response.status + response.statusText);
    });

  }]);
})();
