(function() {
  'use strict';

  angular
    .module('upcomingStops', ['ngMaterial', 'upcomingStops.event', 'upcomingStops.livebus']);

  angular
    .module('upcomingStops')
    .run(['$rootScope', function($rootScope) {

      $rootScope.fullscreen = false;
      $rootScope.initialized = false;

      llb_app.addListener('window_state', function(data){
        if(data.fullscreen) {
          $rootScope.$apply(function() {
            $rootScope.fullscreen = true
          })
        } else {
          $rootScope.$apply(function() {
            $rootScope.fullscreen = false
            $rootScope.$broadcast("changed_window_state");
          })
        }
      });

      llb_app.request('window_dimensions');

      llb_app.addListener('window_dimensions', function(data) {
        $rootScope.$apply(function() {
          $rootScope.window_dimensions = data
          $rootScope.initialized = true;
        })
      });
    }]);
})();
