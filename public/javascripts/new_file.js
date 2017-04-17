$('button').click(function(){
	var username = $('.username').val(),
		pwd = $('.pwd').val(),
		tel = $('.tel').val(),
		email = $('.email').val();
		
	console.log(username,pwd,tel,email)
	
	$.ajax({
		url: "http://localhost:3333/zhuce/zhuce",
		type: "post",
		data: {
			username: username,
			password: pwd,
			tel: tel,
			email: email
		},
		success: function(data) {
			console.log(data)
		}
	});
})

//$.ajax({
//	url: "http://localhost:3333/item/list",
//	type: "get",
//	success: function(data) {
//		console.log(data)
//		var html = '';
//		for(var i=0; i<data.length; i++){
//			html += "<ul><li>"+data[i].username+"</li><li>"+data[i].tel+"</li><li>"+data[i].regtime+"</li></ul>"
//		}
//		$('body').append(html)
//	},
//	error: function(){
//		alert('error')
//	}
//});