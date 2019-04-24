let colors = ["#e74c3c","#3498db","#2ecc71","#3498db","#f1c40f","#4834d4","#130f40","#95afc0","#f0932b"]
function checkAuth() {
    if (!window.localStorage['token']) {
        alert("You're not authorised to access this page. Please Login.");
        window.location = "/";
    }
}

function drawAllExpenseChart() {
   var ctx = $('#myChart');
    $.ajax({
        method: "GET",
        url: "/api/allmonthexpense/",
        type: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
        },
        success: function(response) {
            console.log(response);
            var myPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: response.labels,
                    datasets: [{
                        label: 'Yearly Expense',
                        backgroundColor: colors,
                        borderColor: 'rgb(0, 0, 0)',
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
        }
    });
}

function drawExpenseBarChart() {
  var ctx = $('#BarChart');

    $.ajax({
        method: "GET",
        url: "/api/barchartexp/",
        type: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
        },
        success: function(response) {
            var myBarChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Yearly Expense',
                        backgroundColor: colors,
                        borderColor: 'rgb(0,0,0)',
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
        }
    });
}

function drawExpenseTable() {
  $.ajax({
        method: "GET",
        url: "/api/tabledata/",

        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
        },
        success: function(response) {
            console.log(response);
            for (let i of response)
                $("#expense_table").append(`
          <tr scope="row">            
            <td>${i.categories.title}</td>
            <td>${i.title}</td>
            <td>${i.description}</td>
            <td>${i.cost}</td>
          </tr>
        `)
        }
    });
}

function drawIncomeChart(){
  var ctx = $('#ExpBar');

    $.ajax({
        method: "GET",
        url: "/api/barchartinc/",
        type: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
        },
        success: function(response) {
            var myBarChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Yearly Income',
                        backgroundColor: colors,
                        borderColor: 'rgb(0,0,0)',
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

    
        }
    });
}


function drawAllIncomeChart() {
  var ctx = $('#ExpPie');

    $.ajax({
        method: "GET",
        url: "/api/allmonthincome/",
        type: "application/json",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Token " + window.localStorage["token"]);
        },
        success: function(response) {
            console.log(response);
            var myPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: response.labels,
                    datasets: [{
                        label: 'Yearly Income',
                        backgroundColor: colors,
                        borderColor: 'rgb(0, 0, 0)',
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

        }
    });
}