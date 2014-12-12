'use strict';

angular.module('myAppRename.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'app/view1/main.html',
            controller: 'MainPage'
        })

    }])

    .controller('MainPage', ['$scope','$http', 'WikiFactory', function ($scope, $http,  WikiFactory){


        $scope.createU = function(comment){
            WikiFactory.createU(comment)
                .success(function (data, status, headers, config) {
                    $scope.userInfo = data;
                    console.log(data + " success");
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                    console.log(data + " error")
                });
        }

        $scope.checkUser = function(users){
            $scope.users = users;
        }

        $scope.getUser = function(username){
            WikiFactory.getUser(username)
                .success(function (data, status, headers, config) {
                    $scope.userData = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }

    }]);