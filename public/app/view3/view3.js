'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/comments', {
    templateUrl: 'app/view3/view3.html',
    controller: 'ViewComments'
  })
   .when("/comment/:teamName", {
            templateUrl: "app/view3/commentsF.htm",
            controller: "ViewComments"
        })
      .when("/comment", {
          templateUrl: "app/view3/commentsFUK.htm",
          controller: "ViewComments"
      })
}])

    .controller('ViewComments', ['$scope','$http', 'WikiFactory', function ($scope, $http,  WikiFactory){
      $scope.getAllCommentsByTeamId = function(teamName){
       var justOneComment = [];


          WikiFactory.getAllCommentsByTeamId(teamName)
            .success(function (data, status, headers, config) {
                  console.log("sdgdfkngkdf " + data[0].comm);
                  $scope.comms = data;
                  justOneComment = data;
            }).
            error(function (data, status, headers, config) {
              $scope.error = data;
            });
      }


        $scope.saveComment = function(ngComment){
            if($scope.ngComment._id != null){

                console.log($scope.ngComment._id);
                WikiFactory.updateComment(ngComment);

                $scope.ngComment =null;
            }
            else{
                WikiFactory.addComm(ngComment);
                $scope.ngComment =null;
            }

        }



        $scope.editComm = function(ngComment){
            $scope.ngComment = ngComment;
        }

        WikiFactory.getAllTeams()
            .success(function (data, status, headers, config) {
                $scope.teams = data;

            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

        $scope.addComm = function(comment){
            WikiFactory.addComm(comment)
                .success(function (data, status, headers, config) {
                    $scope.addComm = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }




        $scope.deleteComment = function(comment){
            WikiFactory.deleteComment(comment)
                .success(function (data, status, headers, config) {
                    $scope.deleteComm = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }

    }]);


