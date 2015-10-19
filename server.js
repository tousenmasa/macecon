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

//IOポート
exec('echo 18 > /sys/class/gpio/export');
exec('echo out > /sys/class/gpio/gpio18/direction');

exec('echo 23 > /sys/class/gpio/export');
exec('echo out > /sys/class/gpio/gpio23/direction');

exec('echo 4 > /sys/class/gpio/export');
exec('echo out > /sys/class/gpio/gpio4/direction');

exec('echo 27 > /sys/class/gpio/export');
exec('echo out > /sys/class/gpio/gpio27/direction');

exec('echo 25 > /sys/class/gpio/export');
exec('echo out > /sys/class/gpio/gpio25/direction');

exec('echo 7 > /sys/class/gpio/export');
exec('echo out > /sys/class/gpio/gpio7/direction');

exec('echo 10 > /sys/class/gpio/export');
exec('echo out > /sys/class/gpio/gpio10/direction');

exec('echo 11 > /sys/class/gpio/export');
exec('echo out > /sys/class/gpio/gpio11/direction');


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
	
	socket.on("IO18", function (IO18) {
		if(IO18==1){
			exec('echo 1 > /sys/class/gpio/gpio18/value');
			console.log("18がONされました．");
		}
		else{
			exec('echo 0 > /sys/class/gpio/gpio18/value');
			console.log("18がOFFされました．");
		}
		
	});
	
	socket.on("IO23", function (IO17) {
		if(IO17==1){
			exec('echo 1 > /sys/class/gpio/gpio23/value');
			console.log("23がONされました．");
		}
		else{
			exec('echo 0 > /sys/class/gpio/gpio23/value');
			console.log("23がOFFされました．");
		}
		
	});
	
	socket.on("state", function (state) {
		switch (state){
		case 22:
			console.log("前進");
			exec('echo 1 > /sys/class/gpio/gpio18/value');
			exec('echo 0 > /sys/class/gpio/gpio23/value');
			exec('echo 1 > /sys/class/gpio/gpio4/value');
			exec('echo 0 > /sys/class/gpio/gpio27/value');
			exec('echo 1 > /sys/class/gpio/gpio25/value');
			exec('echo 0 > /sys/class/gpio/gpio7/value');
			exec('echo 1 > /sys/class/gpio/gpio10/value');
			exec('echo 0 > /sys/class/gpio/gpio11/value');
			break;
		case 11:
			console.log("後退");
			exec('echo 0 > /sys/class/gpio/gpio18/value');
			exec('echo 1 > /sys/class/gpio/gpio23/value');
			exec('echo 0 > /sys/class/gpio/gpio4/value');
			exec('echo 1 > /sys/class/gpio/gpio27/value');
			exec('echo 0 > /sys/class/gpio/gpio25/value');
			exec('echo 1 > /sys/class/gpio/gpio7/value');
			exec('echo 0 > /sys/class/gpio/gpio10/value');
			exec('echo 1 > /sys/class/gpio/gpio11/value');
			break;
		case 21:
			console.log("右旋回");
			exec('echo 1 > /sys/class/gpio/gpio18/value');
			exec('echo 0 > /sys/class/gpio/gpio23/value');
			exec('echo 0 > /sys/class/gpio/gpio4/value');
			exec('echo 1 > /sys/class/gpio/gpio27/value');
			exec('echo 1 > /sys/class/gpio/gpio25/value');
			exec('echo 0 > /sys/class/gpio/gpio7/value');
			exec('echo 0 > /sys/class/gpio/gpio10/value');
			exec('echo 1 > /sys/class/gpio/gpio11/value');
			break;
		case 12:
			console.log("左旋回");
			exec('echo 0 > /sys/class/gpio/gpio18/value');
			exec('echo 1 > /sys/class/gpio/gpio23/value');
			exec('echo 1 > /sys/class/gpio/gpio4/value');
			exec('echo 0 > /sys/class/gpio/gpio27/value');
			exec('echo 0 > /sys/class/gpio/gpio25/value');
			exec('echo 1 > /sys/class/gpio/gpio7/value');
			exec('echo 1 > /sys/class/gpio/gpio10/value');
			exec('echo 0 > /sys/class/gpio/gpio11/value');
			break;
		case 00:
			console.log("停止");
			exec('echo 0 > /sys/class/gpio/gpio18/value');
			exec('echo 0 > /sys/class/gpio/gpio23/value');
			exec('echo 0 > /sys/class/gpio/gpio4/value');
			exec('echo 0 > /sys/class/gpio/gpio27/value');
			exec('echo 0 > /sys/class/gpio/gpio25/value');
			exec('echo 0 > /sys/class/gpio/gpio7/value');
			exec('echo 0 > /sys/class/gpio/gpio10/value');
			exec('echo 0 > /sys/class/gpio/gpio11/value');
			break;
}
		
	});
	
	socket.on("speed", function (speed) {

			console.log(speed);

		
	});
	
	
	
});