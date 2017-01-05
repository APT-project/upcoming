(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .controller('EventController', EventController);

  EventController.$inject = ['eventFactory', 'eventSort', '$mdSidenav', '$mdBottomSheet', '$scope', 'isDemoMode'];

  function EventController(eventFactory, eventSort, $mdSidenav, $mdBottomSheet, $scope, isDemoMode) {
    var vm = this;

    vm.events = [];
    vm.selectedEvent = null;
    vm.latestLocation = { latitude: 61.498180, longitude: 23.762195 };
    vm.dragStartListener = null;

    vm.renderEventsOnMap = renderEventsOnMap;
    vm.showEventDetails = showEventDetails;
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
      vm.renderEventsOnMap(vm.events);
    }

    function updateEventDistances(e, location) {
      vm.latestLocation = location;
      eventSort.proximity(vm.latestLocation, vm.events);
    }

    function resolveCategoryForMarkerUrl(category) {
      var markerUrl;
      switch(category) {
    case 'food':
        markerUrl = 'marker.event.food.png';
        break;
    case 'culture':
        markerUrl = 'marker.event.culture.png';
        break;
    case 'leisure':
        markerUrl = 'marker.event.leisure.png';
        break;
    default:
        markerUrl = 'marker.event.yellow.png';
      }
      return markerUrl;
    }

    function renderEventsOnMap(events) {
      for (var i = 0; i < events.length; ++i) {
        var event = events[i];
        var previousEvent = events[i-1] || event;
        var eventLoc = { lat: Number(event.latitude),
                         lng: Number(event.longitude) };
        var marker = vm.map.createMarker({
          position: eventLoc,
          title: event.name,
          icon: 'img/icons/' + resolveCategoryForMarkerUrl(event.category)
        });

        marker.addListener('click', showEventDetails(event, eventLoc));
        vm.map.showMarker(marker);

        if (event.distanceToUser < previousEvent.distanceToUser) {
          var nearestEventLoc = eventLoc;
        }
      }
      if (nearestEventLoc) {
        vm.map.panTo(nearestEventLoc);
      }
    }

    function showEventDetails(event, eventLoc) {
      return function() {
        $scope.$apply(function(){
          vm.selectedEvent = event;
        });

        vm.map.setZoom(15);
        vm.map.panTo(eventLoc);
        openBottomSheet(event);
      }
    }

    function selectEvent(event) {
      vm.selectedEvent = event;
      var eventLoc = { lat: Number(event.latitude), lng: Number(event.longitude) }
      vm.map.panTo(eventLoc);
    }

    function toggleEventList() {
      $mdSidenav('left').toggle();

      var container = document.getElementById('sidenav');
      Ps.initialize(container);

    }

    function openBottomSheet(event) {
      $mdBottomSheet.show({
        templateUrl: 'js/event/event-details.template.html',
        /* Wish I could just pass the parameter 'event' to the controller instead of referencing EventController's scope here. Waiting for someone to show me how to do it. Until then using this way.*/
        controller: function($scope) {this.event = vm.selectedEvent},
        //controller: function(event) {this.event = event},
        controllerAs: 'bs',
        //locals: event
      });
    }

    llb_app.request('location');

    if (isDemoMode) {
      $scope.$on('busLocation', updateEventDistances);
    }
    else {
      llb_app.addListener('location', function(data){
        var coordinates = {
          latitude: data.data.latitude,
          longitude: data.data.longitude
        };
        $scope.$apply(function (){
          vm.latestLocation = coordinates;
          eventSort.proximity(vm.latestLocation, vm.events);
        });
      });
    }

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
