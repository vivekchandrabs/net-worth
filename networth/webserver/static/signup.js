$("signup").on('click', function(){
	let username = $("#username").val();
	let email = $("#Email").val();
	let password = $("#password").val();

	var data = {};
	data["username"] = username;
	data["email"] = email;
	data["password"] = password;

	$.ajax({
		method: 'POST',
		url: 'http://127.0.0.1:8000/api/signup/',
		type: 'application/json',
		data: data,
		success: function(response){
			console.log("done");
		}
	}); 
});