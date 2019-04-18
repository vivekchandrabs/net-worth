$(document).ready(function(){
	var ctx = $('#myChart');

	$.ajax({
		method: "GET",
		url: "/api/allmonthexpense/",
		type: "application/json",
		beforeSend: function(xhr){
			xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
		},
		success: function(response) {
			var myBarChart = new Chart(ctx, {
    			type: 'bar',
   				 data: {
   				 	 labels: response.labels,
   				 	 datasets:[{
   				 	 	label: 'Yearly Expense',
   				 	 	backgroundColor: 'rgb(255, 99, 132)',
   				 	 	borderColor: 'rgb(255, 99, 132)',
   				 	 	data: response.data,
   				 	 	
   				 	 }]
   				 },
   				  options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    			
});
		},
		error: function(xhr){
			if (xhr.statusText == "Unauthorized") {
				alert("You're not authorised to access this page. Please Login.");
				window.location.href = "/";
				
			}
		}
	});
});
