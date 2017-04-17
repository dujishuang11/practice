var express = require('express');
var mysql = require('mysql');

var router = express.Router();

//数据库的连接方式有两种：1、直连；2、数据库链接池

//数据库连接池方式
var pool = mysql.createPool({
	host: '127.0.0.1',//主机地址
	user: 'root',
	password: 'shuang11',
	database: 'djs',//数据库名称
	port: 3306 //端口号
});


function getAllUsers (username,callback){
	pool.getConnection(function(err,connection){
		var sql = 'select * from user where username = ?';
		connection.query(sql,[username],function(err,result){
			console.log('result:'+result)
			if(err){
				console.log("getAllUsers Error:"+arr.message);
				return;
			}
			connection.release();//释放链接
			callback(err,result)
		})
	})
}

function getUser (username,pwd,tel,email,callback){
	pool.getConnection(function(err,connection){
		var sql = 'insert into user (username,pwd,tel,email) values (?,?,?,?)';
		connection.query(sql,[username,pwd,tel,email],function(err,result){
			if(err){
				console.log("getAllUsers Error:"+arr.message);
				return;
			}
			connection.release();//释放链接
			callback(err,result)
		})
	})
}


router.post('/zhuce', function(request, response) {
	console.log('into zhuce >>>>>>成功进入')
	var username = request.body.username,
		pwd = request.body.password,
		tel = request.body.tel,
		email = request.body.email;
//	console.log(username,pwd,tel,email)
	getAllUsers(username,function(err,results){
		if(err){
			response.send(err)
		}else if(results != ''){
			console.log("用户名已存在")
//			response.send(results)
		}else {
			getUser(username,pwd,tel,email,function(err,results){
				if(err){
					response.send(err)
				}else if(results){
					console.log('注册成功')
				}
			})
		}
	})
})




module.exports = router;