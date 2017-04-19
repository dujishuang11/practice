var text = '',
	textLength = 4,
	arr = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
	
	yan()
function yan(){
	text = ''
	for(var i=0; i<textLength; i++){
		var num = Math.floor(Math.random() * 36);
		text += arr[num];
	}
	$('span').html(text);
}
$('span').click(function(){
	yan()
})

$('button').click(function(){
	var username = $('.username').val(),
		pwd = $('.pwd').val(),
		tel = $('.tel').val(),
		email = $('.email').val();
	
	if($('.yan').val() == ''){
		alert('请输入验证码');
	}else if($('span').text() != $('.yan').val()){
		alert('验证码输入错误');
		yan()
	}else if($('span').text() == $('.yan').val()){
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
	}
	
	
	
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