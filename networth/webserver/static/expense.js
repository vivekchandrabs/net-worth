var count = 1;
var checkout = 1;
var edit_exp_id = 1;
var edit_inc_id = 1;
var date = new Date()
var current_date = date.getMonth() + 1
var income_date = date.getMonth() + 1


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

// for the edit expense modal;
function edit_expense(month_number){

	
	if(current_date + month_number <= 1){
		current_date = 1;
	}
	else if(current_date + month_number >= 12){
		current_date = 12
	}
	else{

		current_date = month_number + current_date
	}
	let data = {}
	data["month"] = current_date
	console.log(data);
	console.log(current_date);
	$.ajax({

		method:"GET",
		url:"/api/expense/",
		type:"application/json",	
		data: data,
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
		},
		success: function(response){
			$("#edit_exp_div").empty();
			$("#edit_exp_div").append(`
				<div id="edit_exp_div_item">

				</div>	
				`)
			
			$("#edit_exp_div_item").append(`
				<table  class="table" id="edit_exp_div_item_table">
				<thead>
						<tr">
						<td scope="col"><b>Category</b></td>
						<td scope="col"><b>Title</b></td>
						<td scope="col"><b>Description</b></td>
						<td scope="col"><b>Cost</b></td>
						<td scope="col"><b>Option</b></td>
						</tr>
				</thead>
				</table>
				`)
			edit_exp_id = 1;
			for(let i of response){
				
				$("#edit_exp_div_item_table").append(`
						
						
						<tr scope="row">
						<td scope="col">${i.categories.title}</td>
						<td scope="col"><input class="form-control" id="${edit_exp_id}title" value="${i.title}"></td>
						<td scope="col"><input class="form-control" id="${edit_exp_id}des" value="${i.description}"></td>
						<td scope="col"><input class="form-control" id="${edit_exp_id}cost" value="${i.cost}"></td>
						<td scope="col"><button class="btn btn-sm btn-success"  data-dismiss="modal" onclick="edit_exp_function(${edit_exp_id},${i.id})" style="margin-top:3px;">save</button></td>
						</tr>					
					
					`)
				edit_exp_id = edit_exp_id + 1;
			
			}			
		}
	})

};


// for after editing the expense and clicking on the save button.
function edit_exp_function(id,expense_id){
	title_id = "#"+id+"title"
	des_id = "#"+id+"des";
	cost_id = "#"+id+"cost"
	
	var title = ($(title_id).val());
	var des = ($(des_id).val());
	var cost = ($(cost_id).val());
	let json_data = {}
	
	json_data["title"] = title;
	json_data["description"] = des;
	json_data["cost"] = cost;

	url = "/api/expense/"+expense_id+"/"
	$.ajax({

		method:"PATCH",
		url: url,
		type: "application/json",
		data: json_data,
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
		},
		success: function(response){
			console.log("done");
		}

	})
	
}

//edit income button modal.
function edit_income(month_number){
	

	if(income_date + month_number <= 1){
		income_date = 1;
	}
	else if(income_date + month_number >= 12){
		income_date = 12
	}
	else{

		income_date = month_number + income_date
	}
	let data = {};
	data["month"] = income_date;
	console.log(income_date);
	$.ajax({

		method:"GET",
		url:"/api/income/",
		type:"application/json",
		
		data: data,
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
		},
		
		success: function(response){
			$("#edit_inc_div").empty();
			$("#edit_inc_div").append(`
				<div id="edit_inc_div_item">

				</div>	
				`)
			
			$("#edit_inc_div_item").append(`
				<table  class="table" id="edit_inc_div_item_table">
				<thead>
						<tr">
						<td scope="col"><b>Category</b></td>
						<td scope="col"><b>Title</b></td>
						<td scope="col"><b>Description</b></td>
						<td scope="col"><b>Cost</b></td>
						<td scope="col"><b>Option</b></td>
						</tr>
				</thead>
				</table>
				`)
			edit_inc_id = 1;
			for(let i of response){
				
				$("#edit_inc_div_item_table").append(`
						
						
						<tr scope="row">
						<td scope="col">${i.categories.title}</td>
						<td scope="col"><input class="form-control" id="${edit_inc_id}titlei" value="${i.title}"></td>
						<td scope="col"><input class="form-control" id="${edit_inc_id}desi" value="${i.description}"></td>
						<td scope="col"><input class="form-control" id="${edit_inc_id}costi" value="${i.money}"></td>
						<td scope="col"><button class="btn btn-sm btn-success"  data-dismiss="modal" onclick="edit_inc_function(${edit_inc_id},${i.id})" style="margin-top:3px;">save</button></td>
						</tr>					
					
					`)
				edit_inc_id = edit_inc_id + 1;
			
			}			
		}			
		
	})

};

// after saving the edited modal.
function edit_inc_function(id,income_id){
	title_id = "#"+id+"titlei"
	des_id = "#"+id+"desi";
	cost_id = "#"+id+"costi"
	
	var title = ($(title_id).val());
	var des = ($(des_id).val());
	var cost = ($(cost_id).val());
	let json_data = {}
	
	json_data["title"] = title;
	json_data["description"] = des;
	json_data["money"] = cost;

	console.log(json_data);
	url = "/api/income/"+income_id+"/"
	$.ajax({

		method:"PATCH",
		url: url,
		type: "application/json",
		data: json_data,
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token "+ window.localStorage["token"])
		},
		success: function(response){
			console.log("done");
		}

	})
	
}

// $(document).ready(function(){
// 	var ctx = $('#pieChart');

// 	$.ajax({
// 		method: "GET",
// 		url: "/api/monthexp/",
// 		type: "application/json",
// 		beforeSend: function(xhr){
// 			xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);

// 		},
// 		success: function(response){
// 			var myPieChart = new Chart(ctx, {
//     			type: 'doughnut',
//     			data: {
//    				 	labels: response.labels,
//    				 	datasets:[{
//    				 		label: 'Yearly Expense',
//    				 		backgroundColor: 'rgb(255, 99, 132)',
//    				 		borderColor: 'rgb(255, 99, 132)',
//    				 		data: response.data,
   				 	 	
//    				 	}]
//    				 },
//    				  options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// 			});
// 		}
// 	})
// })












































