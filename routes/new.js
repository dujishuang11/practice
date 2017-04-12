var express = require('express');
var router = express.Router();

router.get('/list',function(request,response){//参数第一个为请求参数，第二个为响应参数
	console.log('ino list......running where?')
	response.send('dujishaung')
})






//输出方法    放到所有模块的最下面
module.exports = router;
