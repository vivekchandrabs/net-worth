
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
                        backgroundColor: ["#2980b9", "#e74c3c", "#8e44ad"],
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
                        backgroundColor: ["#2980b9", "#e74c3c", "#8e44ad"],
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