var http = require("http");
var username = "valentina.mata94@gmail.com";

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
            console.log(JSON.parse(result));
            //callback(null, JSON.parse(result));
        });
    });

    request.on('error', function(e)
    {
        console.log(e);
       // callback(e);
    });
    //the following is mandatory
    request.end();
