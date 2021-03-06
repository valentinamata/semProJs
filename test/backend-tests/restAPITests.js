

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var team = mongoose.model("teams");
var comment = mongoose.model("comments");
describe('REST API for /teams', function () {
  //Start the Server before the TESTS
  before(function (done) {
    testServer = app.listen(testPort, function () {
      console.log("Server is listening on: " + testPort);
      done();
    })
        .on('error', function (err) {
          console.log(err);
        });
  })


  beforeEach(function (done) {
    team.remove({}, function () {
      console.log("teams:");
      var w1 = {"_id": 3, "teamName": "Bla", "votes": 3};
      var w2 = {"_id": 4, "teamName": "Bla2", "votes": 4};
      var w3 = {"_id": 5, "teamName": "Bla3", "votes": 5};

      comment.remove({},function(){
        var w4 = { comm: "wer", team: "Bla"};
        var w5 ={ comm: "werz", team: "Bla"};
        team.create(w1, function (err) {
          team.create(w2, function (err) {
            team.create(w3, function (err) {
             comment.create(w4, function(err){
                comment.create(w5, function(err){
                  done();
                })
               })
            })
          })
        });
      })
    });

  })


  after(function () {  //Stop server after the test
    //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
    //mongoose.connection.db.dropDatabase();
    testServer.close();
  })


  it("Should get team", function (done) {
    http.get("http://localhost:" + testPort + "/api/getTeam/Bla", function (res) {
      res.setEncoding("utf8");//response data is now a string
      res.on("data", function (chunk) {
        console.log(chunk + " here 1")
        var n = chunk;
        n.length.should.equal(28);
        n[0].teamName.should.equal("Bla");
        n[0].votes.should.equal(3);
        //n[0].categories[0].should.equal("newShit");
        //n[1].title.should.equal("hallo");
        done();
      });
    })
  })

  it("Should get teams", function (done) {
    http.get("http://localhost:" + testPort + "/api/teams", function (res) {
      res.setEncoding("utf8");//response data is now a string
      res.on("data", function (chunk) {
        console.log(chunk + " sdvsfg")
        var n = JSON.parse(chunk);
        n.length.should.equal(3);
        n[2].teamName.should.equal("Bla3");
        n[2].votes.should.equal(5);
        n[1].teamName.should.equal("Bla2");
        n[1].votes.should.equal(4);
        n[0].teamName.should.equal("Bla");
        n[0].votes.should.equal(3);
        done();
      });
    })
  });


  it("Should get all comments for a team", function (done) {
    http.get("http://localhost:" + testPort + "/api/getComments/Bla", function (res) {
      res.setEncoding("utf8");//response data is now a string
      res.on("data", function (chunk) {
        console.log(chunk + "here2")
        var n = JSON.parse(chunk);
        n.length.should.equal(32);
        n[0].comm.should.equal("wer");
        n[1].comm.should.equal("werz");
        done();
      });
    })
  })})