(function() {
  'use strict';

  angular
    .module('upcomingStops', ['ngMaterial', 'upcomingStops.event', 'upcomingStops.livebus', 'upcomingStops.map'])
    .config(['GoogleMapsApiProvider', configureApp])
    .run(['$rootScope', '$mdBottomSheet', function($rootScope, $mdBottomSheet) {

      $rootScope.fullscreen = false;
      $rootScope.initialized = false;

      llb_app.addListener('window_state', function(data){
        if(data.fullscreen) {
          $rootScope.$apply(function() {
            $rootScope.fullscreen = true;
          });
        } else {
          $rootScope.$apply(function() {
            $mdBottomSheet.cancel();
            $rootScope.fullscreen = false;
          });
        }
      });

      llb_app.request('window_dimensions');

      llb_app.addListener('window_dimensions', function(data) {
        $rootScope.$apply(function() {
          $rootScope.window_dimensions = data;
          $rootScope.initialized = true;
        });
      });
    }]);

    function configureApp(GoogleMapsApiProvider) {
      GoogleMapsApiProvider.setConfig({
        apiKey: 'GET_YOUR_OWN_API_KEY'
      });
    }
})();
