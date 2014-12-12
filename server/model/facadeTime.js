/**
 * Created by Kaloyan on 12/2/2014.
 */

var mongoose = require('mongoose');
var model = require('../model/db');
var teamModel = mongoose.model('teams');
var commModel = mongoose.model('comments');

function getAllTeams(callback) {
    model.TeamsModel.find({})
        .exec(function (err, teams) {
            if (err) {

                return callback(err);
            }
            callback(null, teams);
        });
}

function getAllCommentsByTeamId(teamName,callback) {
    model.CommentsModel.find({team: teamName})
        .exec(function (err, comments) {
            if (err) {

                return callback(err);
            }
            callback(null, comments);
        });
}

function getTeamById(teamName, callback) {
    model.TeamsModel.find({teamName: teamName})
        .exec(function (err, details) {
            if (err) {
                callback(err);
            }
            callback(null, details);
        });

}

function getUserbyUserName(username, callback) {
    model.UsersModel.find({username: username})
        .exec(function (err, details) {
            if (err) {
                callback(err);
            }
            callback(null, details);
        });

}

function getCommentById(id, callback) {
    model.CommentsModel.find({_id: id})
            .exec(function (err, details) {
            if (err) {
                callback(err);
            }
            callback(null, details);
        });

}



function addComment(newComm, callback){
    commModel.create(newComm, function (err, createNewComm){
        if(err){
            return callback(err);
        }
        callback(null, createNewComm);
    })
}

function addUser(newUser, callback){
    model.UsersModel.create(newUser, function (err, createNewUser){
        if(err){
            return callback(err);
        }
        callback(null, createNewUser);
    })
}

function updateVotes(team,theActualTeam, callback){
    var number = Number(theActualTeam.votes + 1);
    teamModel.findOneAndUpdate({teamName: team},  {$set: {votes : number}})
        .exec(function (err, details) {
            if (err) {
               return callback(err);
            }
            callback(null, details);
        });

}

function updateComment(commentID, theComm, callback){
    model.CommentsModel.findByIdAndUpdate(commentID, {$set: {comm : theComm.comm}})
        .exec(function (err, details) {
            if (err) {
                return callback(err);
            }
            callback(null, details);
        });
}

function removeComm(id, callback){
    commModel.findByIdAndRemove(id, function(err, removedOrder){
        if(err){
            return callback(err);
        }
        callback(null,removedOrder);
    });
}



exports.facade = {
    getAllTeams : getAllTeams,
    getAllCommentsByTeamId : getAllCommentsByTeamId,
    getTeamById : getTeamById,
    removeComm : removeComm,
    updateVotes : updateVotes,
    updateComment :updateComment,
    getCommentById : getCommentById,
    addComment : addComment,
    addUser : addUser,
    getUserbyUserName : getUserbyUserName
}