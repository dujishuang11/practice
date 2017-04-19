var express = require('express');
var mysql = require('mysql');

var router = express.Router();

var pool = mysql.createPool({
	host: '127.0.0.1',//主机地址
	user: 'root',
	password: 'shuang11',
	database: 'djs',//数据库名称
	port: 3306 //端口号
});

router.post('/login', function(request, response) {
	console.log('into zhuce >>>>>>成功进入')
	var username = request.body.username,
		pwd = request.body.password;
		
		
	
		
})





