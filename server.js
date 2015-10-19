/**
	server
**/
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var exec = require('child_process').exec;

// wwwディレクトリを静的ファイルディレクトリとして登録
app.use(express.static('www'));

// サーバを開始
server.listen(process.env.PORT || 3000);



io.on('connection', function (socket) {
	console.log("新規接続がありました。");
	
	exec('echo 1 > /sys/class/gpio/gpio18/value');
	
});