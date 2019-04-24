function logout(){

	console.log("logout")
	window.localStorage.removeItem('token');
	window.location.href = "/";
};