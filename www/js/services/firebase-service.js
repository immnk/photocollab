(function() {
    angular.module('starter.services')
        .factory('FireBaseService', FireBaseService);
    FireBaseService.inject = ['$q', '$http', '$ionicLoading', '$firebaseAuth', '$firebaseArray'];

    function FireBaseService($q, $http, $ionicLoading, $firebaseAuth, $firebaseArray) {

        var factory = {
            login: loginUser,
            
            getAllImages: getAllImages,
            register: registerUser,
            checkLogin: checkLogin
        };
        init();

        return factory;

        function init() {
            factory.ref = new Firebase("https://photocollab.firebaseio.com/");
            factory.fbAuth = $firebaseAuth(factory.ref);
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

        function checkLogin() {
            var deferred = $q.defer();

            var response = {};
            var fbAuth = factory.ref.getAuth();
            if (fbAuth) {
                response.isAuthenticated = true;
                deferred.resolve(response);
            } else {
                response.isAuthenticated = false;
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
            var ref = factory.ref;
            var response = {};

            var fbAuth = ref.getAuth();
            if (fbAuth) {
                var userReference = ref.child("users/" + fbAuth.uid);
                var syncArray = $firebaseArray(userReference.child("images"));

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
