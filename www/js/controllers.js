/* global angular, document, window */
'use strict';

SampleApp



.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,$localStorage) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $localStorage.provider = '';
    $localStorage.accessToken = '';
    $scope.login = true;
    $scope.logout = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})



.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk,$state,$http,UserSession,$location,$ionicPopup,$cordovaOauth,$localStorage) {
    $scope.$parent.clearFabs();
    $scope.logout = true;
   
    $scope.facebookLogin = function() { 
        if($localStorage.hasOwnProperty("accessToken") === true && $localStorage.provider == 'facebook') {         
            $state.go("app.profile");
        }else{
             $cordovaOauth.facebook("777797839022496", ["email"]).then(function(result) { 
                $localStorage.accessToken = result.access_token;
                $localStorage.provider = 'facebook'
                 $state.go("app.profile");
            }, function(error) {
                 alert("Error -> " + error);
                  $state.go("app.login");
            });
        }
    }

    $scope.googleLogin = function() {
        if($localStorage.hasOwnProperty("accessToken") === true && $localStorage.provider == 'google') {         
            $state.go("app.profile");
        }else{
            $cordovaOauth.google("197590823023-9t821mcovg3nuh21t10dggubdk3lk21t.apps.googleusercontent.com", ["email"]).then(function(result) {
                $localStorage.accessToken = result.access_token;
                $localStorage.provider = 'google';
                $state.go("app.profile");
            }, function(error) {
                alert("Error -> " + error);
                $state.go("app.login");
            });
        }
    }

    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})


.controller("ProfileCtrl", function($scope, $http, $location,$localStorage) {
    $scope.hideBackButton = true;
    if($localStorage.hasOwnProperty("accessToken") === true){
        $scope.$parent.showHeader();  
        $scope.$parent.setHeaderFab('right');
        $scope.profileData = {};
    }
   

   
    if ($localStorage.provider == 'google'){      
        $scope.init = function() {
            if($localStorage.hasOwnProperty("accessToken") === true) {
                $http.get('https://www.googleapis.com/oauth2/v1/userinfo', { params: { access_token: $localStorage.accessToken}}).then(function(result) {
                    $scope.profileData = result.data;                   
                }, function(error) {
                    alert("There was a problem getting your profile.  Check the logs for details."+ error);
                    // console.log(error);
                });
            } else {
                alert("Not signed in");
                $location.path("/login");             
            }
         };
    }else if ($localStorage.provider == 'facebook'){
        $scope.init = function() {
            if($localStorage.hasOwnProperty("accessToken") === true) {
                $http.get('https://graph.facebook.com/v2.3/me', { params: { access_token: $localStorage.accessToken, ffields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
                    $scope.profileData = result.data;
                    $scope.login = false;
                    $scope.logout = true;
                }, function(error) {
                    alert("There was a problem getting your profile.  Check the logs for details.");
                    console.log(error);
                });
            } else {
                alert("Not signed in");
                $location.path("/login");   
            }
         };
    }else {
        alert("Not signed in");
        $location.path("/login");            
    }

});

