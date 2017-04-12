$.ajax({
	url: "http://localhost:3333/item/list",
	type: "get",
	success: function(data) {
		console.log('成功')
		console.log(data)
	}	
});