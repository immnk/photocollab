(function() {
    angular.module('starter.services')
        .factory('FireBaseService', FireBaseService);
    FireBaseService.inject = ['$q', '$http', '$ionicLoading', '$firebaseAuth', '$firebaseArray'];

    function FireBaseService($q, $http, $ionicLoading, $firebaseAuth, $firebaseArray) {

        var factory = {
            login: loginUser,
            isAuthorized: isAuth,
            getAllImages: getAllImages,
            register: registerUser
            
        };
        init();

        return factory;

        function init() {
            factory.fb = new Firebase("https://photocollab.firebaseio.com/");
            factory.fbAuth = $firebaseAuth(factory.fb);
        }

        function loginUser(username, password) {
            var deferred = $q.defer();
            var response = {
                success: false
            };
            console.log(username);
            console.log(password);

            $ionicLoading.show();
            factory.fbAuth.$authWithPassword({
                email: username,
                password: password
            }).then(function(authData) {
                $ionicLoading.hide();
                response.success = true;
                deferred.resolve(response);
            }).catch(function(error) {
                $ionicLoading.hide();
                console.error("ERROR: " + error);
                response.success = false;
                deferred.reject(response);
            });

            return deferred.promise;
        }

        function isAuth() {
            var deferred = $q.defer();

            var response = {};
            var fbAuth = factory.fb.getAuth();
            if (fbAuth) {
                response.isAuthorized = true;
                deferred.resolve(response);
            } else {
                response.isAuthorized = false;
                deferred.reject(response);
            }

            return deferred.promise;
        }

        function registerUser(email, password) {
            var deferred = $q.defer();
            var response = {
                success: false
            };

            $ionicLoading.show();
            factory.fbAuth.$createUser({ email: email, password: password }).then(function(userData) {
                return fbAuth.$authWithPassword({
                    email: username,
                    password: password
                });
            }).then(function(authData) {
                $ionicLoading.hide();
                response.success = true;
                deferred.resolve(response);
            }).catch(function(error) {
                $ionicLoading.hide();
                console.error("ERROR: " + error);
                response.success = false;
                deferred.reject(response);
            });

            return deferred.promise;
        }


        function getAllImages() {
            var deferred = $q.defer();
            var fb = factory.fb;
            var response = {};

            var fbAuth = fb.getAuth();
            if (fbAuth) {
                var userReference = fb.child("users/" + fbAuth.uid);
                var syncArray = $firebaseArray(userReference.child("images"));
                // $scope.images = syncArray;
                console.log(userReference.child("images").child('image'));
                console.log(syncArray);

                response.images = syncArray;
                response.isSuccess = true;
                response.message = "Fetched all the images";
                deferred.resolve(response);
            } else {
                response.images = [];
                response.isSuccess = false;
                response.message = "UnAuthorized to get all the images";
                deferred.reject(response);
            }
            return deferred.promise;
        }
    }
})();
