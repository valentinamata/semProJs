
var http = require("http");

var httpPost = function(username, password, email, status,callback){
    var obj = {
        username : username,
        password :  password,
        email : email,
        status : status
    }

    var postData = JSON.stringify(obj);
    var options = {
        hostname : "137.135.179.104",
        port : "3333",
        method : 'POST',
        path : '/user',
        headers : {
            'Content-Type' : 'application/json',
            'Content-Length': postData.length
        }
    };

    var request = http.request(options, function(res) {
        var result = "";
        res.on('data', function (details) {
            result += details;
        })
        res.on('end', function () {
            callback(null, JSON.stringify(result));
        })
    });
    request.on('error', function(e){
        callback(e);
    })
    request.write(postData);
    request.end();

};

var httpSend = function(username, callback)
{
    var options={
        hostname:'137.135.179.104',
        port:'3333',
        method:'GET',
        path: '/user/' + encodeURIComponent(username)
    };

    var request=http.request(options, function(res)
    {
        var result="";
        res.on('data', function(details)
        {
            // console.log(details + " 123")
            result+=details;
        });
        res.on('end',function() {
            callback(null, JSON.parse(result));
        });
    });

    request.on('error', function(e)
    {
        callback(e);
    });
    //the following is mandatory
    request.end();
};


module.exports = {
    httpPost : httpPost,
    httpSend : httpSend
}