//var fb = new Firebase("https://photocollab.firebaseio.com/");

angular.module('starter.services', ['firebase']);
angular.module('starter.controllers', ['starter.services']);
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(config)
    .constant('$ionicLoadingConfig', {
        templateUrl: 'templates/loadingTemplate.html'
    });

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: "LoginController",
            controllerAs: 'vm',
            cache: false
        })
        .state("menu", {
            url: '/menu',
            templateUrl: "templates/menu.html",
            controller: "MenuController",
            controllerAs: "vm"
        })
        .state("menu.dashboard", {
            url: "/dashboard",
            views: {
                "menuContent": {
                    templateUrl: "templates/dashboard.html",
                    controller: "DashboardController",
                    controllerAs: 'vm'
                }
            }

        });
    $urlRouterProvider.otherwise('/login');
}
