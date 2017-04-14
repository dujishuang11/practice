$.ajax({
	url: "http://localhost:3333/item/list",
	type: "post",
	data: {
		userId:"123"
	},
	success: function(data) {
//		console.log(data)
//		console.log(data[0])
//		console.log(data[0].spending)
//		var html = '';
//		for(var i=0; i<data[0].spending.length; i++){
//			html += "<ul><li>"+data[0].spending[i].time+"</li><li>"+data[0].spending[i].category+"</li><li>"+data[0].spending[i].count+"</li></ul>"
//		}
	},
	error: function(){
		alert('error')
	}
});