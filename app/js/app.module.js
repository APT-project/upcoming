(function() {
  'use strict';

  angular
    .module('upcomingStops',
      [ 'ngMaterial',
        'ngAnimate',
        'upcomingStops.event',
        'upcomingStops.bus',
        'upcomingStops.map',
        'upcomingStops.shared'
      ])
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
            // Why is the bottom sheet handled here? git blame to see that it
            // "fixed" a bug where the BS remained open even in tile mode after
            // clicking LLB back button. In hindsight, this could be handled
            // better, or at least somewhere else than here.
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
        // Enter your own Google Maps API key here. This will probably
        // be revoked soon and the app won't have a map. We did not have time
        // to integrate build tools to handle this better.
        apiKey: 'AIzaSyBevZCT08ZBaZV6t4ZF_sBKncJg7kecZ94'
      });
    }
})();
