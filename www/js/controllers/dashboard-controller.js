(function() {
    'use strict';
    angular.module('starter.controllers')
        .controller("DashboardController", DashboardController);
    DashboardController.inject = ['$scope', '$state', '$ionicHistory', '$ionicModal',
        '$ionicSlideBoxDelegate', '$cordovaCamera', 'FireBaseService'
    ];

    function DashboardController($scope, $state, $ionicHistory, $ionicModal,
        $ionicSlideBoxDelegate, $cordovaCamera, FireBaseService) {
        var vm = this;
        vm.upload = upload;
        vm.openModal = openModal;
        vm.closeModal = closeModal;
        vm.slideChanged = slideChanged;

        vm.options = {
            loop: false,
            effect: "fade",
            speed: 500
        };
        vm.data = {};
        $scope.$watch('data.slider', function(nv, ov) {
            vm.slider = vm.data.slider;
        })

        init();

        function init() {
            $ionicHistory.clearHistory();
            vm.images = [];
            FireBaseService.getAllImages().then(function(response) {
                vm.images = response.images;
            }, function(error) {
                console.error(error.message);
                $state.go('login');
            });
            $ionicModal.fromTemplateUrl('templates/image-popover.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                vm.modal = modal;
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
                vm.images.$add({ image: imageData }).then(function() {
                    alert("Image has been uploaded");
                });
            }, function(error) {
                console.error(error);
            });
        }

        function openModal(index) {
            console.log('clicked image..');
            $ionicSlideBoxDelegate.slide(index);
            vm.modal.show();
        };

        function closeModal() {
            vm.modal.hide();
        };

        function slideChanged(index) {
            vm.slideIndex = index;
        };
    }
})();
