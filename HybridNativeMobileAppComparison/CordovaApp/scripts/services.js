angular.module('cordovaApp.services', [])

.factory('Camera', ['$q', function ($q) {
    return {
        getPicture: function (options) {
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        }
    }
}])

.factory('Accelerometer', ['$q', function ($q) {
    return {
        getCurrentAcceleration: function (options) {
            var q = $q.defer();

            navigator.accelerometer.getCurrentAcceleration(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            });

            return q.promise;
        }
    }
}])

.factory('Compass', ['$q', function ($q) {
    return {
        getCurrentHeading: function (options) {
            var q = $q.defer();

            navigator.compass.getCurrentHeading(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            });

            return q.promise;
        }
    }
}])

.factory('Geolocation', ['$q', function ($q) {
    return {
        getCurrentPosition: function (options) {
            var q = $q.defer();

            navigator.geolocation.getCurrentPosition(function (result) {
                // Do any magic you need
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            });

            return q.promise;
        }
    }
}]);