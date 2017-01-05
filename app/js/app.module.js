(function() {
  'use strict';

  angular
    .module('upcomingStops',
      [ 'ngMaterial',
        'ngAnimate',
        'upcomingStops.event',
        'upcomingStops.livebus',
        'upcomingStops.map',
        'upcomingStops.shared'
      ])
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

          // Hide some details (distance), from the left navigation event list, if
          // the screen is small.
          // This doesn't trigger when the view is chaged to portrait/landscape mode
          if (data.fullscreen_width < 321) {
            $rootScope.smallEventDetails = true;
          } else {
            $rootScope.smallEventDetails = false;
          }
        });
      });
    }]);


    function configureApp(GoogleMapsApiProvider) {
      GoogleMapsApiProvider.setConfig({
        apiKey: 'AIzaSyBevZCT08ZBaZV6t4ZF_sBKncJg7kecZ94'
      });
    }
})();
