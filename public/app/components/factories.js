'use strict';

/* Factories */

angular.module('myAppRename.factories', []).
    factory('WikiFactory',function ($http) {
      var url = "/api";
      var api = {};
      api.getAllTeams= function(){
        return $http.get(url+"/teams");
      }
      api.addComm = function(newComm){
        return $http.post(url+"/newComment",newComm);
      }
      api.updateVotes = function(team){
        return $http.put(url+'/updateVotes/'+team.teamName, team);
      }
      api.getAllCommentsByTeamId = function(teamName){
        return $http.get(url+'/getComments/'+teamName);
      }
      api.updateComment = function(commId){
        return $http.put(url+'/updateComment/'+commId._id, commId);
      }
      api.deleteComment = function(comm){
        return $http.delete(url+'/deleteComment/'+comm._id);
      }
      api.createU = function(obj){
        console.log(obj + " factories")
        return $http.post(url +'/newUser', obj);
      }


      return api;
    })

