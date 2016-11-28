(function() {
  'use strict';
  angular.module('upcomingStops.shared').provider('LoadGoogleMapsApi', LoadGoogleMapsApiProvider);

  function LoadGoogleMapsApiProvider() {
      var myConfig = {
        baseUrl: 'https://maps.googleapis.com/maps/api/js',
        apiKey: null,
        libraries: null,
        language: 'en'
      };

      this.setConfig = function(config) {
        angular.extend(myConfig, config);
      }

      var loadDeferred = null;
      this.$get = function($window, $document, $q) {
        if (loadDeferred !== null) {
          return loadDeferred.promise;
        }

        loadDeferred = $q.defer();

        function loadGMapsScript() {
          if (myConfig.baseUrl == null) {
            console.log('No Google Maps API URL defined, check Angular config!');
            loadDeferred.reject('No Google Maps API URL');
          }
          else if (myConfig.apiKey == null) {
            console.log('No Google Maps API Key defined, check Angular config!');
            loadDeferred.reject('No Google Maps API Key');
          }
          else {
            var fullUrl = myConfig.baseUrl + '?key=' + myConfig.apiKey;
            if (myConfig.libraries != null) {
              fullUrl += '&libraries=' + myConfig.libraries.join(',');
            }
            if (myConfig.language != null) {
              fullUrl += '&language=' + myConfig.language;
            }

            fullUrl += '&callback=googlemapsapisloaded';

            var scriptElem = document.createElement('script');
            scriptElem.async = true;
            scriptElem.type = 'text/javascript';
            scriptElem.src = fullUrl;

            document.body.appendChild(scriptElem);
          }
        };

        $window.googlemapsapisloaded = function() {
          loadDeferred.resolve();
        };

        $document.ready(loadGMapsScript);

        return loadDeferred.promise;
      };

      this.$get.$inject = ['$window', '$document', '$q'];
  };
})();
