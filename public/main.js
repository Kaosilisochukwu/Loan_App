
$('#update-req').click(function (e) {
    e.preventDefault();
    window.location.href = "http://localhost:3000/user-update.html"
})


//fuction for user to register on the platform//
$(document).ready(function () {
    $('#register-btn').click(function (e) {
        e.preventDefault();
        let fName = $('#fname').val();
        let surname = $('#surname').val();
        let email = $('#email').val();
        let uphone = $('#phone').val();
        let uname = $('#uname').val().toLowerCase();
        let upass = $('#pword').val();
        let upass2 = $('#password2').val();
        let jsonData = {
            "name": fName,
            "surname": surname,
            "email": email,
            "phone": uphone,
            "username": uname,
            "password": upass,
            "isAdmin": false
        }
        console.log(upass2)
        if (fName == '' || fName.length < 3) {
            $('#w-fname').text('Wrong name format')
        }
        if (surname == '' || surname.length < 3) {
            $('#w-surname').text('Wrong Surname format')
        }
        if (email == '' || email.length < 3 || !email.includes('@') || !email.includes('.')) {
            $('#w-email').text('Wrong email format')
        }
        if (upass == '' || upass.length < 3 || upass.toString() != upass2.toString()) {
            $('#w-pword').text('Empty field or passwords don\'t match')
        }
        if (uphone == '' || uphone.length < 3 || isNaN(uphone)) {
            $('#w-num').text('Wrong phone number format')
        }

        if (uname == '' || uname.length < 3) {
            $('#w-user').text('Wrong phone number format')
        }

        if (fName != '' && surname != '' && email != '' && upass != '' && uphone != '' && uname != '' && !isNaN(uphone) && upass == upass2 && email.includes('@') && email.includes('.')) {
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
        }
    })
})

$('#id').text(`${sessionStorage.getItem('user')}`)


// fuction for user to logoff the app
$('#logout').click(function (e) {
    e.preventDefault();
    sessionStorage.clear();
    myId = [];
    window.location.href = "http://localhost:3000/main.html"
})

//function for user login
$(document).ready(function () {
    $('#login-btn').click(function (e) {
        e.preventDefault();
        let logUser = $('#username').val().toLowerCase();
        let logPass = $('#password').val();

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/users",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                for (let i = 0; i < data.length; i += 1) {
                    if (data[i].username.toString() != logUser.toString() || data[i].password.toString() != logPass.toString()) {

                    } else if (data[i].username.toString() == logUser.toString() && data[i].password.toString() == logPass.toString() && data[i].isAdmin == true) {
                        sessionStorage.setItem('user', data[i].username);
                        sessionStorage.setItem('pass', data[i].password);
                        sessionStorage.setItem('id', data[i].id);
                        alert("Admin login");
                        window.location.href = "http://localhost:3000/admin.html"
                        return;
                    } else if (data[i].username.toString() == logUser.toString() && data[i].password.toString() == logPass.toString()) {
                        sessionStorage.setItem('user', data[i].username);
                        sessionStorage.setItem('pass', data[i].password);
                        sessionStorage.setItem('id', data[i].id);
                        console.log(sessionStorage.getItem('id'))
                        alert(`welcome ${logUser}`);

                        window.location.href = "http://localhost:3000/dash.html"
                        return;
                    }
                }
                alert('Incorrect Username or password')
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
})

//function for user to request loan
$(window).ready(function () {
    $('#request-btn').click(function (e) {
        e.preventDefault();
        let reqName = $('#request-name').val();
        let reqSurname = $('#request-surname').val();
        let reqAmount = $('#loan-request').val();
        let returnDate = $('#pay-date').val();
        let myData = {
            "name": reqName,
            "surname": reqSurname,
            "userId": sessionStorage.getItem('id'),
            "username": sessionStorage.getItem('user'),
            "password": sessionStorage.getItem('pass'),
            "amount": reqAmount,
            "approval": ''

        }
        if (sessionStorage.getItem('user') == null || sessionStorage.getItem('pass') == null || sessionStorage.getItem('id') == null) {
            alert('Please Login');
            window.location.href = "http://localhost:3000/login.html"
            return;
        }

        if (reqName == '' || reqName.length < 3) {
            $('#hiden').removeClass(`hiden`)
        }

        if (reqSurname == '' && reqSurname < 3) {
            $('#hides').removeClass('hiden')
        }

        if (reqAmount == '' && reqSurname < 3) {
            $('#hidea').removeClass("hiden")
        }
        if (reqAmount != '' && reqSurname != '' && reqAmount != '') {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/borrowers",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(myData),
                success: function () {
                    alert('you are good to go');
                    window.location.href = "http://localhost:3000/dash.html"
                },
                error: function (error) {
                    console.log(error)
                }
            })
        }

    })
})

//function for user to request loans
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
                        <td id="table-duration">${data[i].id}</td>
                        <td id="table-name">${data[i].name}</td>
                        <td id="table-name">${data[i].userId}</td>
                        <td id="table-surname">${data[i].surname}</td>
                        <td id="table-amount">${data[i].amount}</td>
                        <td id="table-amount">${data[i].approval}</td>       
                      </tr>`)
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
})

//function for user to modify their requests
const modifyUserRequest = (ids, jsonData) => {
    $.ajax({
        type: "PATCH",
        url: `http://localhost:3000/borrowers/${ids}`,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        success: function (data) {
            location.reload();
        }
    })
}

//function for admin to approve user requests
$('#approve').click(function (e) {
    e.preventDefault();
    let ids = $('#cusId').val();
    let jsonData = {
        "approval": true
    }
    modifyUserRequest(ids, jsonData);
    alert(`Request ${ids} has successfully been approved`);
})

//function for admin to decline user requests
$('#loanDecline').click(function (e) {
    e.preventDefault();
    let ids = $('#cusId').val();
    let jsonData = {
        "approval": false
    }
    modifyUserRequest(ids, jsonData)
    alert(`Request ${ids} has successfully been declined`);
})


//function for user to get thier requests
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

                    if (data[i].userId == sessionStorage.getItem('id')) {
                        if (data[i].approval === true) {
                            $("#dash-request").append(`<tr>
                            <td id="table-duration">${data[i].id}</td>
                            <td id="table-amount">${data[i].amount}</td>
                            <td id="table-amount">Request Approved</td> 
                          </tr>`)
                        } else if (data[i].approval === false) {
                            $("#dash-request").append(`<tr>
                            <td id="table-duration">${data[i].id}</td>
                            <td id="table-amount">${data[i].amount}</td>
                            <td id="table-amount">Request Declined</td> 
                          </tr>`)
                        } else {
                            myId.push(data[i].id)
                            $("#dash-request").append(`<tr>
                            <td id="table-duration">${data[i].id}</td>
                            <td id="table-amount">${data[i].amount}</td>
                            <td id="table-amount">Request Pending</td> 
                          </tr>`)
                        }
                    }
                }
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
})


//function for users to modify their requests
$('#user-modify').click(function (e) {
    e.preventDefault();
    $('#user-modify').remove();
    $('#user-delete').remove();
    $('#hidden').removeClass('hidded');
})

// $('#user-delete').click(function (e) {
//     e.preventDefault();
// })

$(window).ready(function () {
    $("#user-delete").click(function (e) {
        let ids = $('#cusId').val()
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/borrowers",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                    for (let i = 0; i < data.length; i += 1) {

                        if (data[i].id.toString() == ids.toString() && data[i].approval == true) {
                            alert('OOops!!! This request has been approved')
                            i = data.length;
                        } else if (data[i].id.toString() == ids.toString() && data[i].userId == sessionStorage.getItem('id') && data[i].approval == false) {
                            let jsonD = {
                                "id": `${ids}`
                            }

                            $.ajax({
                                url: `http://localhost:3000/borrowers/${ids}`,
                                method: 'DELETE',
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify(jsonD),

                                success: function (data) {
                                    console.log(data);
                                    alert('successfully DELETED');
                                    location.reload();
                                },
                                error: function () {
                                    console.log('error')
                                }
                            })
                        }
                    }
               
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
})



//
$(window).ready(function () {
    $("#change-btn").click(function (e) {
        let ids = $('#cusId').val();
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/borrowers",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                    for (let i = 0; i < data.length; i += 1) {

                        let newAmount = $('#new-amount').val();
                        let jsonData = {
                            "amount": newAmount
                        }
                        if (newAmount == '') {
                            alert('Incorrect value for new amount')
                            break;
                        }
                        if (data[i].id.toString() == ids.toString() && data[i].approval == true) {
                            alert('Request has already been approved')
                            i = data.length;
                            location.reload();
                        } else if (data[i].id.toString() == ids.toString() && data[i].approval == false) {

                            $.ajax({
                                type: "PATCH",
                                url: `http://localhost:3000/borrowers/${ids}`,
                                dataType: "json",
                                contentType: 'application/json',
                                data: JSON.stringify(jsonData),
                                success: function () {
                                    alert("Your Request has successfully been modified");
                                    location.reload();
                                    // window.location.href = "http://localhost:3000/login.html"
                                }
                            })
                        }
                    }
               
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        })
    })
})
