$("#signup").on("click", function(){
	let username = $("#username").val();
	let email = $("#email").val();
	let password = $("#password").val();

	var data = {};     
	data["username"] = username;
	data["email"] = email;
	data["password"] = password;
	console.log(email);
	$.ajax({
		method: 'POST',
		url: '/api/signup/',
		type: 'application/json',
		data: data,
		success: function(response){
			console.log(response);
			window.localStorage.setItem("token", response.token);
			window.location.href = '/dashboard/';
		}
	}); 
}); 


