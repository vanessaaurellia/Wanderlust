let email = false;
let password = false;

function validate() {
    if (email && password) {
        document.getElementById('loginButton').removeAttribute('disabled');
        document.getElementById('loginButton').classList.remove('disabled');
    } else {
        document.getElementById('loginButton').setAttribute('disabled', true);
        document.getElementById('loginButton').classList.add('disabled');
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function validateInput(element) {
    let name = element.getAttribute('name');
    let val = element.value;
    if (val == '') {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        if (name == 'email') {
            email = false;
        } else {
            password = false;
        }
    } else if (name == 'email') {
        if (!isEmail(val)) {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
            email = false;
        } else {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
            email = true;
        }
    } else {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        if (name == 'email') {
            email = true;
        } else {
            password = true;
        }
    }

    validate();
}

document.getElementById('loginButton').addEventListener('click', function () {
    let inputEmail = document.getElementById('email').value;
    let inputPassword = document.getElementById('password').value;
    $.ajax({
        method: 'GET',
        url: 'database/users.json',
        dataType: 'JSON',
        success: (result) => {
            let data = result;
            let userName,
                userEmail,
                userPassword;

            let isEmail = false;
            data.forEach(user => {
                if (user.email == inputEmail) {
                    isEmail = true;
                    userName = user.name;
                    userEmail = user.email;
                    userPassword = user.password;
                }
            });

            if (!isEmail) {
                $('#exampleModal').modal('show');
                document.getElementsByClassName('modal-body')[0].innerHTML = "Email is not registered";
            } else if (userPassword != inputPassword) {
                $('#exampleModal').modal('show');
                document.getElementsByClassName('modal-body')[0].innerHTML = "Wrong password";
            } else {
                localStorage.setItem('session', JSON.stringify({
                    name: userName,
                    email: userEmail
                }));
                $('#exampleModal').modal('show');
                document.getElementsByClassName('modal-body')[0].innerHTML = "You are successfully logged in!";
                $('.modal-footer a').removeAttr('data-dismiss');
                $('.modal-footer a').html('Proceed');
            }
        }
    });
});

validate();