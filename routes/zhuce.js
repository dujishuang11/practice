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

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


function getAllUsers (username,callback){
	pool.getConnection(function(err,connection){
		var sql = 'select * from user where username = ?';
		connection.query(sql,[username],function(err,result){
			console.log('result:'+result)
			if(err){
				console.log("getAllUsers Error:"+err.message);
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
	getAllUsers(username,function(err,results){
		if(results == '' || results == null){
			getUser(username,pwd,tel,email,function(err,results){
				if(err){
					response.send(err)
				}else if(results.insertId > 0){
					console.log('results'+results)
					response.send({flag:1,result:results})
				}
			})
		}else if(results != '' || results != null){
			console.log("用户名已存在")
			response.send({flag:2})
		}else {
			response.send('注册失败')
		} 
	})
})

//登陆
router.post('/login', function(request, response) {
	var username = request.body.username,
		pwd = request.body.password;
	
	console.log(username,pwd)
	getAllUsers(username,function(err,result){
		if(result.length == 0){
			response.send({flag:2})
		}else if(result.length > 0){
			if(result[0].pwd == pwd){
				response.send({flag:1})
			}else if(result[0].pwd != pwd){
				response.send({flag:3})
			}else {
				response.send({flag:4})
			}
		}else {
			response.send({flag:4})
		}
	})
})

function getList(callback){
	pool.getConnection(function(err,connection){
		var sql = 'select * from user';
		connection.query(sql,function(err,result){
			if(err){
				console.log("getAllUsers Error:"+arr.message);
				return;
			}
			connection.release();//释放链接
			callback(err,result)
		})
	})
}

//列表
router.get('/liebiao', function(request, response) {
	console.log("进入列表》》》》")
	
	getList(function(err,result){
		if(result.length > 0){
			response.send({result:result})
		}
	})
	
})

//信息查询
function getListUser (uid,callback){
	pool.getConnection(function(err,connection){
		var sql = 'select * from user where id = ?';
		connection.query(sql,[uid],function(err,result){
			if(err){
				console.log("getAllUsers Error:"+err.message);
				return;
			}
			connection.release();//释放链接
			callback(err,result)
		})
	})
}

router.get('/xiugai', function(request, response) {
	console.log("进入修改》》》》")
	var uid = request.query.uid;
	getListUser(uid,function(err,result){
		console.log("result:"+result)
		if(result.length > 0){
			response.send({flag:1,result:result})
		}else {
			response.send({flag:2})
		}
	})
	
})

function getListGai (username,pwd,tel,email,uid,callback){
	pool.getConnection(function(err,connection){
		var sql = "update user set username = ?,pwd = ?,tel = ?,email = ? where id = ?";
		connection.query(sql,[username,pwd,tel,email,uid],function(err,result){
			if(err){
				console.log("getAllUsers Error:"+arr.message);
				return;
			}
			connection.release();//释放链接
			callback(err,result)
		})
	})
}

router.post('/xiugai', function(request, response) {
	console.log("进入修改>>>>>>>>>")
	var uid = request.body.uid,
		username = request.body.username,
		pwd = request.body.password,
		tel = request.body.tel,
		email = request.body.email;
	getListGai(username,pwd,tel,email,uid,function(err,result){
		console.log("result:"+result)
		if(result.changedRows > 0){//判断修改的行数     如数据没有修改changedRows为0
			response.send({flag:1})
		}else if(err){
			response.send({flag:2})
		}else {
			response.send({flag:3})
		}
	})
	
})


module.exports = router;