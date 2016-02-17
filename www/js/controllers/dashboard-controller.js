(function() {
    'use strict';
    angular.module('starter.controllers')
        .controller("DashboardController", DashboardController);
    DashboardController.inject = ['$state', '$ionicHistory', '$cordovaCamera', 'FireBaseService'];

    function DashboardController($state, $ionicHistory, $cordovaCamera, FireBaseService) {
        var vm = this;
        vm.upload = upload;

        init();

        function init() {
            $ionicHistory.clearHistory();
            vm.images = [];
            FireBaseService.getAllImages().then(function(response) {
                vm.images = response.images;
                console.log(response.images);
            }, function(error) {
                console.error(error.message);
                $state.go('login');
            });
        }

        function upload() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                targetWidth: 500,
                targetHeight: 500,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                syncArray.$add({ image: imageData }).then(function() {
                    alert("Image has been uploaded");
                });
            }, function(error) {
                console.error(error);
            });
        }

    }
})();
