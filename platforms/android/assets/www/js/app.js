// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var SampleApp = angular.module('starter', ['ionic', 'ionic-material', 'ionMdInput', 'ngMessages','truncate','ionic.rating', 'ngResource','ngCordova','ngCordovaOauth','ngStorage'])

.run(function($ionicPlatform,$rootScope,$localStorage) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    $rootScope.Logout = function() {     
     delete $localStorage.accessToken;
     delete  $localStorage.provider;
    }
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    // for user login
    $httpProvider.defaults.withCredentials = true;
    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */
    $ionicConfigProvider.backButton.previousTitleText(true);
    // $ionicConfigProvider.registerBackButtonAction(function (event) {
    //                 event.preventDefault();
    //         }, 100);

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })    

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

     .state('app.signup', {
        url: '/signup',
        views: {
            'menuContent': {
                templateUrl: 'templates/signup.html',
                controller: 'SignupCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '',
               
            }
        }
    })



    .state('app.listings', {
        url: '/listings',
        cache: false,
        views: {
            'menuContent': {
                templateUrl: 'templates/listings.html',
                controller: 'ListingCtrl'
            },
            'fabContent': {
                template: ''
            }
        },      
    })
     .state('app.listingview', {
        url: '/listings/:listingsId',
        views: {
            'menuContent': {
                templateUrl: 'templates/listingview.html',
                controller: 'ListingviewCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
