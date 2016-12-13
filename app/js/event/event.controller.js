(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .controller('EventController', EventController);

  EventController.$inject = ['eventFactory', 'eventSort', '$mdSidenav', '$mdBottomSheet', '$scope'];

  function EventController(eventFactory, eventSort, $mdSidenav, $mdBottomSheet, $scope) {
    // var vm = this;

    $scope.vm = [];

    $scope.vm.events = [];
    $scope.vm.selectedEvent = null;
    $scope.vm.latestLocation = { latitude: 61.498180, longitude: 23.762195 };

    $scope.vm.selectEvent = selectEvent;
    $scope.vm.toggleEventList = toggleEventList;
    $scope.vm.openBottomSheet = openBottomSheet;

    $scope.$watch('vm',function(newValue, oldValue){
      $scope.$apply();
    });

    function selectEvent(event) {
      $scope.vm.selectedEvent = event;
    }

    function toggleEventList() {
      $mdSidenav('left').toggle();
    }

    function openBottomSheet(event) {
      $mdBottomSheet.show({
        //template: '<md-bottom-sheet>{{bs.event.name}}</md-bottom-sheet>',
        templateUrl: 'templates/event.bottomsheet.html',
        /* Wish I could just pass the parameter 'event' to the controller instead of referencing EventController's scope here. Waiting for someone to show me how to do it. Until then using this way.*/
        controller: function() {this.event = $scope.vm.selectedEvent},
        //controller: function(event) {this.event = event},
        controllerAs: 'bs',
        //locals: event
      });
    }

    llb_app.request('location');
    llb_app.addListener('location', function(data){
      var coordinates = {
        latitude: data.data.latitude,
        longitude: data.data.longitude
      };
      $scope.vm.latestLocation = coordinates;

      eventSort
        .proximity($scope.vm.latestLocation, $scope.vm.events);
    });

    eventFactory
      .getEvents()
      .then(function success(response) {
          $scope.vm.events = response.data;
      },
      function error(response) {
        console.log(response.status + response.statusText);
      });

  };

})();
