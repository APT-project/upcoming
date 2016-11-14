(function() {
  'use strict';

  angular
    .module('upcomingStops')
    .controller('EventController', EventController);

  EventController.$inject = ['eventFactory', '$mdSidenav', '$mdBottomSheet'];

  function EventController(eventFactory, $mdSidenav, $mdBottomSheet) {
    let vm = this;

    vm.events = [];
    vm.selectedEvent = null;
    vm.selectEvent = selectEvent;
    vm.toggleEventList = toggleEventList;
    vm.openBottomSheet = openBottomSheet;

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
