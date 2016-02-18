(function() {
    'use strict';
    angular.module('starter.controllers')
        .controller("MenuController", MenuController);
    
    function MenuController(){
        var vm = this;
        init();

        function init(){
            console.log('init menu...');
        }
    }
})();
