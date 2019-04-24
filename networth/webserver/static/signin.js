$("#signin").on("click", function(){

	console.log('im here');
	let username = $("#signin_username").val();
	let password = $("#signin_password").val();
	data = {}
	data["username"] = username;
	data["password"] = password;

	$.ajax({

		method: "POST",
		url: "/api-token-auth/",
		type: "application/json",
		data: data,
		success: function(response){
			window.localStorage.setItem("token", response.token);
			window.location = '/dashboard/';
		}
	});

});

