var http = require('http');
var fs = require('fs');
var path = require('path');
host = '127.0.0.1';
port = '9000';

var mimes = {
    ".html":"text/html",
    ".htm":"text/html",
    ".css":"text/css",
    ".js":"text/javascript",
    ".jpg":"image/jpeg"
};

var server = http.createServer(function(req,res){
   var filepath = (req.url === '/')?('./index.html'): ('.'+req.url);
    var contentType = mimes[path.extname(filepath)];
    fs.exists(filepath,function(file_exists){
        if(file_exists){
            res.writeHead(200,{'Content-Type':contentType});
            var streamFile = fs.createReadStream(filepath).pipe(res);
            streamFile.on('error',function(){
                res.writeHead(500);
                res.end();
            });
        }
        else{
            res.writeHead(404);
            res.end('no file');
        }
    })
})
.listen(port,host,function(){
       console.log('running on '+port);
    });



