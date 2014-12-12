'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/teams', {
            templateUrl: 'app/view2/view2.html',
            controller: 'ViewVoteTeam'
        });
    }])

    .controller('ViewVoteTeam', ['$scope','$http', 'WikiFactory', function ($scope, $http,  WikiFactory) {


        WikiFactory.getAllTeams()
            .success(function (data, status, headers, config) {
                $scope.teams = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
        //    }
        $scope.updateVotes = function (teamName){
            WikiFactory.updateVotes(teamName)
                .success(function (data, status, headers, config) {
                    $scope.updatedTeam = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }]);


