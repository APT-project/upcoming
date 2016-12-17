(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .controller('EventController', EventController);

  EventController.$inject = ['eventFactory', 'eventSort', '$mdSidenav', '$mdBottomSheet', '$scope'];

  function EventController(eventFactory, eventSort, $mdSidenav, $mdBottomSheet, $scope) {
    var vm = this;

    vm.events = [];
    vm.selectedEvent = null;
    vm.latestLocation = { latitude: 61.498180, longitude: 23.762195 };
    vm.dragStartListener = null;

    vm.renderEventsOnMap = renderEventsOnMap;
    vm.selectEvent = selectEvent;
    vm.toggleEventList = toggleEventList;
    vm.openBottomSheet = openBottomSheet;

    $scope.$on('mapReady', onMapReady);

    function onMapReady(e, map) {
      e.preventDefault();
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      vm.dragStartListener = map.addListener('dragstart', function() {
          $scope.$apply(function() {
            vm.selectedEvent = null;
          });
      });
      vm.map = map;
    }

    function renderEventsOnMap(events) {
      for (var i = 0; i < events.length; ++i) {
        var event = events[i];
        var eventLoc = vm.map.createLatLng(Number(event.latitude),
                                           Number(event.longitude));
        var marker = vm.map.createMarker({
          position: eventLoc,
          title: event.name,
          icon: 'img/icons/marker.event.png'
        });

        vm.map.showMarker(marker);
      }
    }

    function selectEvent(event) {
      vm.selectedEvent = event;
    }

    function toggleEventList() {
      $mdSidenav('left').toggle();
    }

    function openBottomSheet(event) {
      $mdBottomSheet.show({
        //template: '<md-bottom-sheet>{{bs.event.name}}</md-bottom-sheet>',
        templateUrl: 'templates/event.bottomsheet.html',
        /* Wish I could just pass the parameter 'event' to the controller instead of referencing EventController's scope here. Waiting for someone to show me how to do it. Until then using this way.*/
        controller: function() {this.event = vm.selectedEvent},
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
      $scope.$apply(function (){
        vm.latestLocation = coordinates;
        eventSort.proximity(vm.latestLocation, vm.events);
        vm.renderEventsOnMap(vm.events);
      });
    });

    eventFactory
      .getEvents()
      .then(function success(response) {
        vm.events = response.data;
      },
      function error(response) {
        console.log(response.status + response.statusText);
      });

  };

})();
