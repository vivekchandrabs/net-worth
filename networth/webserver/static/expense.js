var count = 1;
var checkout = 1;

$(document).ready(function(){
	$.ajax({

		method:"GET",
		url:"/api/expense/",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
		},
		success: function(response) {
			console.log(response);
			for (let expense of response) {
				$('#all-expenses').append(`<tr>
					<td>${expense.title}</td>
					<td>${expense.description}</td>
					<td>${expense.cost}</td>
					<td>${ expense.categories.title}</td>
					<td><button class="btn btn-sm btn-success edit-expense id="edit">Edit   </button></td>
				</tr>`)
			}
		}
	});
});

$("#add").on('click', function(){
	
	
	$("#category").append(`
		<label for="recipient-name" class="col-form-label">Enter your new category :</label>
		<input id = ${count} class = "form-control" type='text'>
		`)

	$("#description").append(`
		<label for="recipient-name" class="col-form-label">Enter your new description :</label>
		<input id = ${count+"d"} class = "form-control" type='text'>
		`)
	count = count + 1;
	console.log(count);
});

// saving the new category
$("#save_category").on("click", function(){

	for(let i=0;i<count;i++)
	{

		var cat = $("#"+i).val();
		var description = $("#"+i+"d").val();
		let data = {}
		data["title"] = cat;
		data["description"] = description;
		
		$.ajax({

			method:"POST",
			url:"/api/category/",
			type: "application/json",
			data: data,
			beforeSend: function(xhr){

			xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
			},
			success: function(response)
			{
				console.log("done");
			}

		});
	}
	$('#category').empty()
	$("#description").empty()
	count = 1;

});

// will fetch all the category of the user to render in the delete category div.
//for the delete category button
$("#delete_cat").on("click", function(){
$.ajax({
	method: "GET",
	url:"http://127.0.0.1:8000/api/category/",
	beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
	},
	success: function(response){
		$("#delcategory").empty()
		checkout = 1;
		console.log("here")
		for(let i of response)
		{
			$("#delcategory").append(`
				<input type="checkbox"  value=${i.id} id=${checkout}>
				<label>${i.title}</label><br>
				`);
			checkout = checkout + 1;

		}
	}

})
});

// for the add expense button
$("#add_expense").on("click", function(){

$.ajax({
	method: "GET",
	url:"http://127.0.0.1:8000/api/category/",
	beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
	},
	success: function(response){
		$("#select_category").empty();
		for(let i of response)
		{
			$("#select_category").append(`
				
  					<option value=${i.id}>${i.title}</option>
			`);

			
		}
	}

})
});
//for the add income button
$("#add_income").on("click", function(){


$.ajax({
	method: "GET",
	url:"http://127.0.0.1:8000/api/category/",
	beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
	},
	success: function(response){

		$("#select_category_income").empty();
		for(let i of response)
		{
			
			$("#select_category_income").append(`
				
  					<option value=${i.id}>${i.title}</option>
			`);

		}
	}

})
});

// delete category
$("#del_category").on('click', function(){

	for(let i =0; i<checkout; i++){
		var id = "#"+i;
		if( $(id).prop("checked") == true )
		{
			// console.log($(id).val());
			var url = "/api/category/"+$(id).val()+"/";
			$.ajax({
				method:"DELETE",
				url: url,
				beforeSend: function(xhr){
					xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
				},
				success: function(response){

					console.log("done");
				}

			});			
		}
	}
});

//For add expense modal.

$("#done").on('click', function(){
	
	let cat_id = $("#select_category").find(":selected").val();
	let cost_money = $("#expense_cost").val()
	let cost_title = $("#expense_title").val()
	let cost_des = $("#expense_des").val()

	let json_data = {}

	json_data["title"] = cost_title
	json_data["categories"] = cat_id
	json_data["cost"] = cost_money
	json_data["description"] = cost_des

	
	$.ajax({
				method:"POST",
				url: "/api/expense/",
				type: "application/json",
				data: json_data,
				beforeSend: function(xhr){
					xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
				},
				success: function(response){

					console.log("done")
				}

			});
	
});


//saving new income
$("#save_income").on("click", function(){
	let cat_id = $("#select_category_income").find(":selected").val();
	let cost_money = $("#income_money").val()
	let cost_title = $("#income_title").val()
	let cost_des = $("#income_des").val()

	let json_data = {};
	json_data["title"] = cost_title
	json_data["description"] = cost_des
	json_data["money"] = cost_money
	json_data["categories"] = cat_id
	$.ajax({

		method:"POST",
		url:"/api/income/",
		type:"application/json",
		data: json_data,
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])

		},
		success: function(response){
			console.log("done")
		}

	});	

});

$("#edit_expense").on("click", function(){

	// let cat_id = $("#select_category").find(":selected").val();
	// let cost_money = $("#expense_cost").val()
	// let cost_title = $("#expense_title").val()
	// let cost_des = $("#expense_des").val()

	// let json_data = {}

	// json_data["title"] = cost_title
	// json_data["categories"] = cat_id
	// json_data["cost"] = cost_money
	// json_data["description"] = cost_des

	$.ajax({

		method:"GET",
		url:"/api/expense/",
		type:"application/json",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
		},
		success: function(response){
			console.log(response);
			$("#edit_exp_cat").empty();
			$("#edit_exp_title").empty();
			$("#edit_exp_des").empty();
			$("#edit_exp_cost").empty();
			for(let i of response){
				console.log(i)
				$("#edit_exp_cat").append(`
					<label for="recipient-name" class="col-form-label">${i.categories.title}</label>
					<br>
					`)

				$("#edit_exp_title").append(`
					<input class="form-control" value="${i.title}">
					<br>
					`)
				$("#edit_exp_des").append(`
					<input class="form-control" value="${i.description}">
					<br>
					`)
				$("#edit_exp_cost").append(`
					<input class="form-control" value="${i.cost}">
					<br>
					`)
			
			}			
		}
	})

});



$("#edit_income").on("click", function(){
	

	$.ajax({

		method:"GET",
		url:"/api/income/",
		type:"application/json",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
		},
		success: function(response){
			console.log(response);
			$("#edit_inc_cat").empty();
			$("#edit_inc_title").empty();
			$("#edit_inc_des").empty();
			$("#edit_inc_cost").empty();
			for(let i of response){
				console.log(i)
				
				$("#edit_inc_cat").append(`
					<label for="recipient-name" class="col-form-label">${i.categories.title}</label>
					<br>
					`)

				$("#edit_inc_title").append(`
					<input class="form-control" value="${i.title}">
					<br>
					`)
				$("#edit_inc_des").append(`
					<input class="form-control" value="${i.description}">
					<br>
					`)
				$("#edit_inc_cost").append(`
					<input class="form-control" value="${i.cost}">
					<br>
					`)
			
			}			
		}
	})

});














































