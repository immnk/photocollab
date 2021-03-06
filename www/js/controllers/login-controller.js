(function() {
    'use strict';
    angular.module('starter.controllers')
        .controller("LoginController", LoginController);
    LoginController.inject = ['state', 'FireBaseService'];

    function LoginController($state, FireBaseService) {
        var vm = this;
        vm.login = login;
        vm.register = register;

        init();

        function init() {
            FireBaseService.checkLogin().then(function(response) {
                if (response.isAuthenticated) {
                    console.log('Logged in successfully...');
                    $state.go("menu.dashboard");
                }
            }, function(error) {

            });
        }

        function login() {

            FireBaseService.login(vm.username, vm.password).then(function(response) {
                console.log('Logged in successfully...');
                $state.go("menu.dashboard");
            }, function(fail) {
                console.log(fail);
            });
        }

        function register(username, password) {
            FireBaseService.register(vm.username, vm.password).then(function(response) {
                console.log('registered & Logged in successfully...');
                $state.go("menu.dashboard");
            }, function(fail) {
                console.log('Fail');
            });
        }

    }
})();
