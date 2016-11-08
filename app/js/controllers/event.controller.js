(function() {
  'use strict';

  upcoming.controller('EventController', ['$scope', 'eventsFactory', function($scope, eventsFactory) {

    eventsFactory.getEvents().then(function success(response) {
      $scope.events = response.data;
    }, function error(response) {
      console.log(response.status + response.statusText);
    });

  }]);
})();
