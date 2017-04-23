var express = require('express');
var mysql = require('mysql');
var formidable = require('formidable');
var fs = require('fs');

var router = express.Router();

var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'shuang11',
	database: 'webnews',
	port: 3306
});

//function getImages(callback){
//	
//}

router.post('/img', function(request, response) {
	console.log("进入图片上传》》》》》》")
	var form = new formidable.IncomingForm();//创建IncomingForm对象
	
	form.uploadDir = "public/images/";//设置上传文件存放的文件夹，可以使用fs.renmae()来改变上传文件的存放位置和文件名
	
	//如果form.uploadDir不赋值，它默认的位置是c:\User\用户名\AppData\Local\Temp
	form.parse(request,function(error,fields,files){
		for(var i in files){
			var file = files[i];
			var fName = (new Date()).getTime();//将图片以当前时间的毫秒数重新命名
			switch (file.type) {
				case "image/jpeg":
					fName = fName + ".jpg";
					break;
				case "image/png":
					fName = fName + ".png";
					break;
				case "image/gif":
					fName = fName + ".gif";
					break;
			}
			var newPath = "public/images/"+fName;
			fs.renameSync(file.path,newPath);//重命名
			response.send(fName);
		}
	})
})



module.exports = router;