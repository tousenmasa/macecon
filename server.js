/**
	server
**/
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//シェルスプリクト用
var exec = require('child_process').exec;

// wwwディレクトリを静的ファイルディレクトリとして登録
app.use(express.static('www'));

// サーバを開始
server.listen(process.env.PORT || 3000);


app.get('/on', function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html","Access-Control-Allow-Origin":"*"});
	res.write("ON");
   	res.end();
	exec('echo 1 > /sys/class/gpio/gpio18/value');
});

app.get('/off', function(req, res) {
	res.writeHead(200, {"Content-Type": "text/html","Access-Control-Allow-Origin":"*"});
	res.write("OFF");
   	res.end();
	exec('echo 0 > /sys/class/gpio/gpio18/value');
});

io.on('connection', function (socket) {
	console.log("新規接続がありました。");
	socket.on("text", function (data) {
		if(data==1){
			exec('echo 1 > /sys/class/gpio/gpio18/value');
			console.log("ON");
		}
		else{
			exec('echo 0 > /sys/class/gpio/gpio18/value');
			console.log("OFF");
		}
		
	});
	
	
	
});