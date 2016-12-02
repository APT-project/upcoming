(function() {
  'use strict';

  angular
    .module('upcomingStops.event')
    .factory('eventSort', eventSort);

  eventSort.$inject = ['$http'];

  // function eventSort($http) {
  //
  //     var getEvents = function() {
  //         return $http.get('data/mock.events.json');
  //     };
  //
  //     return {
  //         getEvents: getEvents
  //     };
  //
  // };

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
  });
  llb_app.request('location');

  var distance_list = new Array();
  function proximity(userCoordinates, $http) {
    var events = $http.get('data/mock.events.json')
    for(var i = 0; i < events.length; i++) {
      // distance_list.push(events[i].name + " " + getDistanceFromLatLonInKm(Number(events[i].latitude), Number(events[i].longitude), Number(userCoordinates.latitude), Number(userCoordinates.longtitude)));
      distance_list[getDistanceFromLatLonInKm(Number(events[i].latitude), Number(events[i].longitude), Number(userCoordinates.latitude), Number(userCoordinates.longtitude))] = events[i].name;
    }
    return distance_list;
  };

  console.log(distance_list);

})();