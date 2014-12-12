var express = require('express');
var router = express.Router();
var weNeedThis = require("../model/facadeTime").facade;
var httpPost = require("./connectToJPA");
var httpGetUser = require("./connectToJPA");
var bcrypt= require('../../node_modules/bcryptjs/');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

router.get('/teams', function(req, res) {
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
    return;
  }

  weNeedThis.getAllTeams(function (err, wikis) {
    if (err) {
      res.status(err.status || 400);
      res.end(JSON.stringify({error: err.toString()}));
      return;
    }
    res.header("Content-type","application/json");
    res.end(JSON.stringify(wikis));
  });
});

router.post('/authenticate', function (req, res) {
  //TODO: Go and get UserName Password from "somewhere"
  //if is invalid, return 401
  var hash1;
  var user = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var status = req.body.status;

  console.log(password + "dafdsfsdf");
  httpGetUser.httpSend(user, function ( err,data) {


    httpGetUser.httpSend(user, function (err, data) {
      //console.log(password + "PASSWORD");
      console.log(data + " body");
      console.log("before");
      if (err) {
        res.status(err.status || 400);
        res.end(JSON.stringify({error: err.toString()}));
        return;
      }
      hash1 = data;

      console.log(hash1 + "adfdsfsdf");
      hash1 = data;
      bcrypt.compare(password, hash1.password, function (err, respond) {

        if (err) {
          console.log("Err:" + err)
          return res.status(500).send(err);
        }
        else {
          var profile = {
            username: hash1.username,
            email: hash1.email
          };
          var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
          res.json({token: token});
        }
        ;
      })
    });
  });
  });


  router.post('/newUser', function (req, res) {
    if(typeof global.mongo_error !== "undefined"){
      res.status(500);
      res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
      return;
    }
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var status = req.body.status;

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {

        }
        httpPost.httpPost(username, hash, email, status, function (err, data) {
          var toPost = {username : username,
            password: hash,
            email : email,
            status : status
          };
          var postData = JSON.stringify(toPost);
          if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
          }

          res.header("Content-type","application/json");

          res.end(JSON.stringify(postData));


        }); });
    });
  });



  router.get('/getComments/:teamName', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
      res.status(500);
      res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
      return;
    }
    var title = req.params.teamName;
    weNeedThis.getAllCommentsByTeamId(title , function (err, wikis) {
      if (err) {
        res.status(err.status || 400);
        res.end(JSON.stringify({error: err.toString()}));
        return;
      }
      res.header("Content-type","application/json");
      res.end(JSON.stringify(wikis));
      return;
    });
  });



  router.put('/updateVotes/:teamName', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
      res.status(500);
      res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
      return;
    }
    var title = req.params.teamName;
    var obj = req.body;
    console.log(obj);

    weNeedThis.updateVotes(title ,obj, function (err, wikis) {
      if (err) {
        res.status(err.status || 400);
        res.end(JSON.stringify({error: err.toString()}));
        return;
      }
      res.header("Content-type","application/json");
      res.end(JSON.stringify(wikis));
      return;

    });
  });

  router.put('/updateComment/:_id', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
      res.status(500);
      res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
      return;
    }
    var title = req.params._id;
    var obj = req.body;
    weNeedThis.updateComment(title ,obj, function (err, wikis) {
      if (err) {
        res.status(err.status || 400);
        res.end(JSON.stringify({error: err.toString()}));
        return;
      }
      console.log(wikis +"RestApi");
      res.header("Content-type","application/json");
      res.end(JSON.stringify(wikis));
      return;

    });
  });


  router.post('/newComment', function (req, res) {
    if(typeof global.mongo_error !== "undefined"){
      res.status(500);
      res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
      return;
    };
    var obj = req.body;
    weNeedThis.addComment(obj, function (err, wikis) {
      if (err) {
        res.status(err.status || 400);
        res.end(JSON.stringify({error: err.toString()}));
        return;
      }
      res.header("Content-type","application/json");
      res.end(JSON.stringify(wikis));
      return;

    });

  });

  router.post('/addNewUser', function (req, res) {
    if(typeof global.mongo_error !== "undefined"){
      res.status(500);
      res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
      return;
    };
    var obj = req.body;
    weNeedThis.addComment(obj, function (err, wikis) {
      if (err) {
        res.status(err.status || 400);
        res.end(JSON.stringify({error: err.toString()}));
        return;
      }
      res.header("Content-type","application/json");
      res.end(JSON.stringify(wikis));
      return;

    });

  });


  router.delete('/deleteComment/:_id', function (req, res) {
    if (typeof global.mongo_error !== "undefined") {
      res.status(500);
      res.end("Error: " + global.mongo_error + " To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
      return;
    }
    ;
    var obj = req.params._id;
    weNeedThis.removeComm(obj, function (err, wikis) {
      if (err) {
        res.status(err.status || 400);
        res.end(JSON.stringify({error: err.toString()}));
        return;
      }

      res.header("Content-type", "application/json");
      res.end(JSON.stringify(wikis));

      // return;
    });
  });



module.exports = router;
