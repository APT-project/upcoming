(function() {
  'use strict';

  upcoming.controller('EventController', ['$scope', 'eventFactory', function($scope, eventFactory) {

    eventFactory.getEvents().then(function success(response) {
      $scope.events = response.data;
    }, function error(response) {
      console.log(response.status + response.statusText);
    });

  }]);
})();
