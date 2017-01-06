(function() {
  'use strict';
  angular.module('upcomingStops.map').controller('MapController', MapController);

  MapController.$inject = ['$scope', 'isDemoMode'];

  function MapController($scope, isDemoMode) {
    var vm = this;
    vm.map = null;

    vm.latestLocation = { lat: 61.498180, lng: 23.762195 };

    vm.showUserPosition = true;
    vm.userPosMarker = null;

    vm.setMap = setMap;
    vm.getMap = getMap;
    vm.centerToUser = centerToUser;

    function setMap(map) {
      vm.map = map;
      initUserPositionMarker(vm.map, vm.latestLocation);

      if (isDemoMode) {
        initBusRoute(vm.map);
      }

      $scope.$emit('mapReady', vm.map);
    }

    function getMap() {
      return vm.map;
    }

    function initUserPositionMarker(map, initPosition) {
      var imageProperties = {
        url: 'img/icons/bus.position.marker.png',
        sizeX: 106,
        sizeY: 122,
        scaledX: 21,
        scaledY: 24,
        originX: 0,
        originY: 0,
        anchorX: 10,
        anchorY: 18
      };
      var image = map.createMarkerImage(imageProperties);
      vm.userPosMarker = map.createMarker({
        position: initPosition,
        icon: image
      });
      vm.userPosMarker.setClickable(false);

      if (vm.showUserPosition) {
        showUserPosMarker();
      }
    }

    function updateUserPosMarker() {
      if (vm.userPosMarker !== null) {
        vm.userPosMarker.setPosition(vm.latestLocation);
      }
    }

    function showUserPosMarker() {
      if (vm.map !== null && vm.latestLocation !== null) {
        if (vm.userPosMarker === null) {
          initUserPositionMarker(vm.map, vm.latestLocation);
        }

        vm.map.showMarker(vm.userPosMarker);
      }
    }

    function centerToUser() {
      if (vm.map !== null && vm.latestLocation !== null) {
        vm.map.setZoom(15);
        vm.map.panTo(vm.latestLocation);
      }
    }

    function updateLocation(latLng) {
      vm.latestLocation = latLng;
      if (vm.showUserPosition) {
        showUserPosMarker();
      }
      updateUserPosMarker();
    }

    function initBusRoute(map) {
      var routeCoordinates = [
        {lat: 61.495348, lng: 23.760619},
        {lat: 61.495447, lng: 23.761440},
        {lat: 61.495454, lng: 23.761564},
        {lat: 61.495467, lng: 23.761616},
        {lat: 61.495921, lng: 23.761476},
        {lat: 61.496722, lng: 23.761223},
        {lat: 61.497021, lng: 23.761116},
        {lat: 61.497247, lng: 23.761027},
        {lat: 61.497278, lng: 23.761443},
        {lat: 61.497306, lng: 23.761789},
        {lat: 61.497536, lng: 23.761746},
        {lat: 61.497723, lng: 23.761711},
        {lat: 61.497755, lng: 23.761706},
        {lat: 61.497787, lng: 23.762009},
        {lat: 61.497853, lng: 23.762822},
        {lat: 61.497929, lng: 23.763838},
        {lat: 61.497989, lng: 23.764546},
        {lat: 61.498011, lng: 23.764873},
        {lat: 61.497960, lng: 23.764970},
        {lat: 61.497733, lng: 23.765418},
        {lat: 61.497310, lng: 23.766231},
        {lat: 61.496684, lng: 23.767317},
        {lat: 61.496278, lng: 23.767934},
        {lat: 61.495519, lng: 23.768985},
        {lat: 61.494658, lng: 23.769723},
        {lat: 61.494393, lng: 23.769908},
        {lat: 61.494434, lng: 23.770090},
        {lat: 61.494724, lng: 23.771332},
        {lat: 61.494861, lng: 23.771971},
        {lat: 61.494949, lng: 23.772649},
        {lat: 61.494951, lng: 23.773148},
        {lat: 61.494902, lng: 23.774768},
        {lat: 61.494839, lng: 23.775557},
        {lat: 61.494798, lng: 23.775935},
        {lat: 61.494778, lng: 23.777067},
        {lat: 61.494843, lng: 23.779644},
        {lat: 61.494864, lng: 23.779891},
        {lat: 61.495040, lng: 23.779864},
        {lat: 61.495982, lng: 23.779832},
        {lat: 61.497337, lng: 23.779778},
        {lat: 61.498791, lng: 23.779703},
        {lat: 61.498985, lng: 23.779714},
        {lat: 61.498985, lng: 23.779049},
        {lat: 61.498967, lng: 23.776748},
        {lat: 61.498944, lng: 23.774189},
        {lat: 61.498921, lng: 23.772907},
        {lat: 61.498824, lng: 23.772365},
        {lat: 61.498622, lng: 23.771807},
        {lat: 61.498542, lng: 23.771480},
        {lat: 61.498468, lng: 23.771079},
        {lat: 61.498408, lng: 23.770114},
        {lat: 61.498276, lng: 23.768532},
        {lat: 61.498183, lng: 23.766979},
        {lat: 61.498129, lng: 23.766088},
        {lat: 61.498152, lng: 23.765729},
        {lat: 61.498098, lng: 23.764898},
        {lat: 61.498016, lng: 23.763707},
        {lat: 61.497870, lng: 23.761947},
        {lat: 61.497741, lng: 23.760126},
        {lat: 61.497721, lng: 23.759922},
        {lat: 61.497524, lng: 23.759973},
        {lat: 61.496974, lng: 23.760104},
        {lat: 61.496643, lng: 23.760231},
        {lat: 61.495677, lng: 23.760520},
        {lat: 61.495348, lng: 23.760619}
      ];
      map.drawRoute(routeCoordinates);
    }

    if (isDemoMode) {
      $scope.$on('busLocation', function(e, busLocation) {
        var latLng = {
          lat: busLocation.latitude,
          lng: busLocation.longitude
        };
        updateLocation(latLng);
      });
    } else {
      llb_app.addListener('location', function(data){
        var latLng = {
          lat: data.data.latitude,
          lng: data.data.longitude
        };
        updateLocation(latLng);
      });
    }
    llb_app.request('location');

    //small hack to ensure that map redraws after being (re)hidden by ng-if
    //needs to wait a bit for some reason, probably the event is fired
    //just a bit too early? Even 1ms timeout worked, added a bit more to be safe
    llb_app.addListener('window_state', forceRedraw);
    function forceRedraw(data) {
      if (vm.map !== null) {
        setTimeout(function(){
          vm.map.forceRedraw();
        }, 5);
      }
    }
  }
})();
