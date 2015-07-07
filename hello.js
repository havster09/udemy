var http = require('http');
host = '127.0.0.1';
port = '9000';

var server = http.createServer(function(req,res){
   res.writeHead(200,{'Content-Type':'text/html'});
   res.end('puk u');
})
.listen(port,host,function(){
       console.log('running on '+port);
    });



