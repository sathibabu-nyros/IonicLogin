// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var SampleApp = angular.module('starter', ['ionic', 'ionic-material', 'ionMdInput', 'ngMessages','truncate','ionic.rating', 'ngResource','ngCordova','ngCordovaOauth','ngStorage'])

.run(function($ionicPlatform) {
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
    .state('app.fbprofile', {
        url: '/fbprofile',
        views: {
            'menuContent': {
                templateUrl: 'templates/fbprofile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '',
               
            }
        }
    })   
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
