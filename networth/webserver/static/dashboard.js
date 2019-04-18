$(document).ready(function(){
	$.ajax({
		method: "GET",
		url: "/api/expense",
		type: "application/json",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
		},
		success: function(response) {
			console.log(response);
		},
		error: function(xhr){
			if (xhr.statusText == "Unauthorized") {
				alert("You're not authorised to access this page. Please Login.");
				window.location.href = "/";
				
			}
		}
	});
});