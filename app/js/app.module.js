(function() {
  'use strict';

  angular
    .module('upcomingStops', ['ngMaterial', 'upcomingStops.event', 'upcomingStops.bus', 'upcomingStops.map', 'upcomingStops.shared'])
    .config(['GoogleMapsApiProvider', configureApp])
    .value('isDemoMode', true)
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
        apiKey: 'AIzaSyBevZCT08ZBaZV6t4ZF_sBKncJg7kecZ94'
      });
    }
})();
