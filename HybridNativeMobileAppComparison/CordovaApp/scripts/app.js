// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('cordovaApp', ['ionic', 'cordovaApp.controllers', 'cordovaApp.services'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($compileProvider, $stateProvider, $urlRouterProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
    // // Use $compileProvider.urlSanitizationWhitelist(...) for Angular 1.2
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);

    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppController'
    })

    .state('app.main', {
        url: "/main",
        views: {
            'menuContent': {
                templateUrl: "templates/main.html"
            }
        }
    })

    .state('app.camera', {
        url: "/camera",
        views: {
            'menuContent': {
                templateUrl: "templates/camera.html",
                controller: 'CameraController'
            }
        }
    })

    .state('app.accelerometer', {
        url: "/accelerometer",
        views: {
            'menuContent': {
                templateUrl: "templates/accelerometer.html",
                controller: 'AccelerometerController'
            }
        }
    })

    .state('app.battery', {
        url: "/battery",
        views: {
            'menuContent': {
                templateUrl: "templates/battery.html",
                controller: 'BatteryController'
            }
        }
    })

    .state('app.contacts', {
        url: "/contacts",
        views: {
            'menuContent': {
                templateUrl: "templates/contacts.html",
                controller: 'ContactsController'
            }
        }
    })

    .state('app.device', {
        url: "/device",
        views: {
            'menuContent': {
                templateUrl: "templates/device.html",
                controller: 'DeviceController'
            }
        }
    })

    .state('app.compass', {
        url: "/compass",
        views: {
            'menuContent': {
                templateUrl: "templates/compass.html",
                controller: 'CompassController'
            }
        }
    })

    .state('app.geolocation', {
        url: "/geolocation",
        views: {
            'menuContent': {
                templateUrl: "templates/geolocation.html",
                controller: 'GeolocationController'
            }
        }
    })

    .state('app.vibration', {
        url: "/vibration",
        views: {
            'menuContent': {
                templateUrl: "templates/vibration.html",
                controller: 'VibrationController'
            }
        }
    })

    .state('app.globalization', {
        url: "/globalization",
        views: {
            'menuContent': {
                templateUrl: "templates/globalization.html",
                controller: 'GlobalizationController'
            }
        }
    })

    .state('app.notifications', {
        url: "/notifications",
        views: {
            'menuContent': {
                templateUrl: "templates/notifications.html",
                controller: 'NotificationsController'
            }
        }
    })

    .state('app.inappbrowser', {
        url: "/inappbrowser",
        views: {
            'menuContent': {
                templateUrl: "templates/inappbrowser.html",
                controller: 'InAppBrowserController'
            }
        }
    })

    .state('app.ui', {
        url: "/ui",
        views: {
            'menuContent': {
                templateUrl: "templates/UI.html",
                controller: 'UIController'
            }
        }
    })

    .state('app.events', {
        url: "/ui/events",
        views: {
            'menuContent': {
                templateUrl: "templates/events.html",
                controller: 'EventsController'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');
});