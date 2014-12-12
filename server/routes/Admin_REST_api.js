
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var httpSend = require('./connectToJPA');
var httpPost = require('./connectToJPA');
var bcrypt= require('../../node_modules/bcryptjs/');
var facade = require('../model/facadeTime');






/* GET home page. */
router.get('/', function(req, res) {
    res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
    //TODO: Go and get UserName Password from "somewhere"
    //if is invalid, return 401
    var hash1;
    var user = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var status = req.body.status;


    httpSend.httpSend1(user, function ( err,data) {
        if (err) {
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }
        hash1 = JSON.parse(data);

        bcrypt.compare(password, hash1.password,function (err, respond) {

            if (err) {
                console.log("Err:" + err)
                return res.status(500).send(err);
            }
            else {
                var profile = {
                    username: hash1.username,
                    status: hash1.status
                };
                var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
                res.json({token: token});
            }
            ;
        })
    });

});

router.post('/newUser', function (req, res) {
    if (!isDbRunning()) {
        return;
    }
    var user = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var status = req.body.status;

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {

            }
            httpPost.httpPost(user, hash, role, function (err, data) {
                console.log("error: " + err);
                console.log('pwd:' + hash);
                console.log("data: " + JSON.stringify(data));
                var toPost = {username : user,
                    password: password,
                    email : email,
                    status : status
                };
                var post_data = JSON.stringify(toPost);
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



//Get Partials made as Views
router.get('/partials/:partialName', function(req, res) {
    var name = req.params.partialName;
    res.render('partials/' + name);
});

module.exports = router;
