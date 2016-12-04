(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .factory('eventSort', eventSort);

  eventSort.$inject = ['$http'];

  function eventSort() {

    var vm = this;

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1); // deg2rad below
      var dLon = deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    };

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    };

    llb_app.addListener('location', function(data){
      var latLng = {
        lat: data.data.latitude,
        lng: data.data.longitude
      };
      vm.latestLocation = latLng;
    });
    llb_app.request('location');

    var proximity = function(userCoordinates, events) {
      for(var i = 0; i < events.length; i++) {
        //change longtitude to longitude
        events[i].distanceToUser = getDistanceFromLatLonInKm(Number(events[i].latitude), Number(events[i].longitude), Number(userCoordinates.latitude), Number(userCoordinates.longitude));
      }
      console.log(events);
    };

    return {
      proximity: proximity
    };
  };


})();
