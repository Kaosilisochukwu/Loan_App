
$('#update-req').click(function (e) {
    e.preventDefault();
    window.location.href = "http://localhost:3000/user-update.html"
})

$(document).ready(function () {
    $('#register-btn').click(function (e) {
        e.preventDefault();
        let fName = $('#fname').val();
        let surname = $('#surname').val();
        let email = $('#email').val();
        let uphone = $('#phone').val();
        let uname = $('#uname').val();
        let upass = $('#pword').val();
        let upass2 = $('password2').val();
        let jsonData = {
            "name": fName,
            "surname": surname,
            "email": email,
            "phone": uphone,
            "username": uname,
            "password": upass
        }

        $.ajax({
            url: "http://localhost:3000/users",
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function (data) {
                alert("Account successfully Created, you can now login");
                window.location.href = "http://localhost:3000/login.html"
            }
        })

    })
})

$('#id').text(`${sessionStorage.getItem('user')}`)

$('#logout').click(function (e) {
    e.preventDefault();
    sessionStorage.clear();
   window.location.href = "http://localhost:3000/main.html"
})

$(document).ready(function () {
    $('#login-btn').click(function (e) {
        e.preventDefault();
        let logUser = $('#username').val();
        let logPass = $('#password').val();

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/users",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                for (let i = 0; i < data.length; i += 1) {
                    if (data[i].username.toString() == logUser.toString() && data[i].password.toString() == logPass.toString() && data[i].isAdmin == true) {
                        sessionStorage.setItem('user', data[i].username);
                        sessionStorage.setItem('pass', data[i].password);
                        sessionStorage.setItem('id', data[i].id);
                        alert("Admin login");
                        window.location.href = "http://localhost:3000/admin.html"
                    }else if(data[i].username.toString() == logUser.toString() && data[i].password.toString() == logPass.toString()){
                        sessionStorage.setItem('user', data[i].username);
                        sessionStorage.setItem('pass', data[i].password);
                        sessionStorage.setItem('id', data[i].id);
                        console.log(sessionStorage.getItem('id'))
                        alert(`welcome ${logUser}`);
                        window.location.href = "http://localhost:3000/dash.html"
                    }
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
})

$('#user-requests').click(function (e) {
    e.preventDefault();
    $('#user-dash').addClass('#remove')
})

$(window).ready(function () {
    $('#request-btn').click(function (e) {
        e.preventDefault();
       let reqName = $('#request-name').val();
        let reqSurname = $('#request-surname').val();
        let reqAmount = $('#loan-request').val();
        let returnDate = $('#pay-date').val();
        let myData = {
           // "name": reqName,
           // "surname": reqSurname,
            "requests": reqAmount,
            "duration": returnDate
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/borrowers",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(myData),
            success: function () {
                alert('you are good to go');
                window.location.href = "http://localhost:3000/login.html"
            },
            error: function(error){
                console.log(error)
            }
        })
    })
})


$(window).ready(function () {
    $("#check-requests").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/borrowers",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                for (let i = 0; i < data.length; i += 1) {                    
                        $("#customers").append(`<tr>
                        <td id="table-name">${data[i].name}</td>
                        <td id="table-surname">${data[i].surname}</td>
                        <td id="table-amount">${data[i].amount}</td>
                        <td id="table-duration">${data[i].duration} Months</td>
                        <td id="table-duration">${data[i].id}</td>
       
                      </tr>`)
                       // window.location.href = "http://localhost:3000/request.html"
                    
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
})

$(window).ready(function () {
    $("#user-requests").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/borrowers",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                for (let i = 0; i < data.length; i += 1) {                    
                        $("#dash-request").append(`<tr>
                        <td id="table-name">${data[i].name}</td>
                        <td id="table-surname">${data[i].surname}</td>
                        <td id="table-amount">${data[i].amount}</td>
                        <td id="table-duration">${data[i].duration} Months</td>
                        <td id="table-duration">${data[i].id}</td>
       
                      </tr>`)
                       // window.location.href = "http://localhost:3000/request.html"
                    
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
})

$(window).ready(function () {
    $('#approve').click(function (e) {
        e.preventDefault();
        let num = $('#cusId').val();
        $.ajax({
            type: "PUT",
            url: `http://localhost:3000/borrowers/${num}`,
            dataType: "json",
            contentType: "application.json", 
        })
    })
})

$('#user-modify').click(function (e) {
    e.preventDefault();
    $('#user-modify').remove();
    $('#user-delete').remove();
    $('#hidden').removeClass('hidded');
    $('.user-dash').append(``)
})

$('#user-delete').click(function (e) {
    e.preventDefault();
})