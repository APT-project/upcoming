(function() {
  'use strict';

  angular
    .module('upcomingStops.shared')
    .service('routeFetchingService', RouteFetchingService);

    RouteFetchingService.$inject = ['$http'];

    function RouteFetchingService($http) {
      var service = this;

      service.fetchRoute = fetchRoute;
      function fetchRoute() {
        return $http.get('data/mock.route.json');
      }
    }
})();
