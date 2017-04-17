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

//获取信息列表
function getAllUsers (callback){
	pool.getConnection(function(err,connection){
		var sql = 'select * from user';
		connection.query(sql,function(err,result){
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

router.get('/list', function(request, response) { //参数第一个为请求参数，第二个为响应参数
//	var id = request.query.id;
//	console.log(id)
//	response.send()
	getAllUsers(function(err,results){
		if(err){
			response.send(err)
		}else if(results){
			console.log(">>>"+results)
			response.send(results)
		}
	});
})

//router.post('/list', function(request, response){
//	var id = request.body.userId
//	console.log(id)
//})

//输出方法    放到所有模块的最下面
module.exports = router;
