// There are too many things in here. Some would be better elsewhere and
// some should be refactored to their own components.
(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .controller('EventController', EventController);

  EventController.$inject = ['eventFactory', 'eventSort', '$mdSidenav', '$mdBottomSheet', '$scope', '$rootScope', 'isDemoMode'];

  function EventController(eventFactory, eventSort, $mdSidenav, $mdBottomSheet, $scope, $rootScope, isDemoMode) {
    var vm = this;

    vm.events = [];
    vm.selectedEvent = null;
    vm.latestLocation = { lat: 61.498180, lng: 23.762195 };
    vm.dragStartListener = null;
    // Tried to do this with $mdMedia but it didn't work
    if ($rootScope.window_dimensions.fullscreen_width < 321) {
      vm.fullDetails = false;
    } else {
      vm.fullDetails = true;
    }

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

    function renderEventsOnMap(events) {
      var eventCategoryColors = {
        'culture': 'purple',
        'education': 'light-blue',
        'entertainment': 'blue',
        'food': 'orange',
        'leisure': 'pink',
        'sport': 'green'
      };
      for (var i = 0; i < events.length; ++i) {
        var event = events[i];
        var previousEvent = events[i-1] || event;
        var categoryColor = eventCategoryColors[event.category] || 'amber';
        var eventLoc = { lat: Number(event.lat),
                         lng: Number(event.lng) };
        var marker = vm.map.createMarker({
          position: eventLoc,
          title: event.name,
          icon: 'img/icons/marker.event.' + categoryColor + '.png'
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
      };
    }

    function selectEvent(event) {
      vm.selectedEvent = event;
      var eventLoc = {
        lat: Number(event.lat),
        lng: Number(event.lng)
      };
      vm.map.panTo(eventLoc);
    }

    function toggleEventList() {
      $mdSidenav('left').toggle();

      // This is just a quick hook up for the perfect-scrollbar library.
      // And is currently disabled because it had issues with touch events
      // on mobile browsers.
      //var container = document.getElementById('sidenav');
      //Ps.initialize(container);

    }

    function openBottomSheet(event) {
      // This should definitely be in it's own controller.
      // Was left lingering waiting for a complete UI rewrite
      // which was postponed indefinitely until time ran out.
      $mdBottomSheet.show({
        templateUrl: 'js/event/event-details.template.html',
        controller: function($scope) {this.event = vm.selectedEvent},
        controllerAs: 'bs',
      });
    }

    llb_app.request('location');

    if (isDemoMode) {
      $scope.$on('busLocation', updateEventDistances);
    }
    else {
      llb_app.addListener('location', function(data){
        var coordinates = {
          lat: data.data.latitude,
          lng: data.data.longitude
        };
        $scope.$apply(function (){
          vm.latestLocation = coordinates;
          eventSort.proximity(vm.latestLocation, vm.events);
        });
      });
    }

    llb_app.addListener('window_dimensions', function(data) {
      $scope.$apply(function() {
        // Hide some details (distance), from the left navigation event list
        // if the screen is small. This doesn't trigger when the view is chaged
        // to portrait/landscape mode. Tried to do this with $mdMedia, no dice.
        if (data.fullscreen_width < 321) {
          vm.fullDetails = false;
        } else {
          vm.fullDetails = true;
        }
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
