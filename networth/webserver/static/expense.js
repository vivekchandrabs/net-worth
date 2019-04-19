var count = 1;
var checkout = 1;
$("#add").on('click', function(){
	
	
	$("#category").append(`
		<input id = ${count} class = "form-control" type='text'>
		`)
	count = count + 1;
	console.log(count);


});

$("#save_category").on("click", function(){

	for(let i=0;i<count;i++)
	{
		var cat = $("#"+i).val();
		console.log(cat);
	}
	$('#category').empty()
})


$.ajax({
	method: "GET",
	url:"http://127.0.0.1:8000/api/category/",
	beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
	},
	success: function(response){
		for(let i of response)
		{
			$("#delcategory").append(`
				<input type="checkbox" name="vehicle1" value=${i.id} id=${checkout}>
				<label>${i.title}</label><br>
				`)
			checkout = checkout + 1;

		}
	}

})


$("#del_category").on('click', function(){

	for(let i =0; i<checkout; i++){
		var id = "#"+i
		if( $(id).prop("checked") == true )
		{
			console.log($(id).val());
		}
	}
})
