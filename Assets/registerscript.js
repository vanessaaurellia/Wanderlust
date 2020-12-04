let forms = {
    'nama': false,
    'email': false,
    'password1': false,
    'password2': false,
    'TTL': false,
    'terms': false
};

function validate() {
    if (document.getElementById('terms').checked) {
        forms.terms = true;
    }
    if (forms['nama'] && forms['email'] && forms['password1'] && forms['password2'] && forms['TTL'] && forms['terms']) {
        document.getElementById('registerButton').removeAttribute('disabled');
        document.getElementById('registerButton').classList.remove('disabled');
    } else {
        document.getElementById('registerButton').setAttribute('disabled', true);
        document.getElementById('registerButton').classList.add('disabled');
    }
}

function isEmail(email) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function validPassword(password) {
    let regex = /^(?=.*\d)(?=.*[a-z]).{6,}$/;
    return regex.test(password);
}

function checkEmpty(data) {
    let inputName = data.name; //name of input
    let nameField = $('input[name="' + inputName + '"]'); //Input element
    let dataInput = nameField.val(); //Value inputted

    let valid;
    let message;

    let whichInput = '';
    switch (inputName) {
        case 'nama':
            whichInput = 'name';
            break;
        case 'email':
            whichInput = 'email address';
            break;
        case 'password1':
            whichInput = 'password';
            break;
        case 'password2':
            whichInput = 'password';
            break;
        case 'TTL':
            whichInput = 'birth date';
        default:
            break;
    }

    if (dataInput == '') {
        valid = false;
        message = 'Please insert ' + whichInput + '.';
    } else if (inputName == 'email') {
        if (!isEmail(dataInput)) { //Check if email is valid
            valid = false;
            message = 'Email address is not valid.';
        } else {
            valid = true;
        }
    } else if (inputName == 'password2') {
        let password1 = $('input[name="password1"]');
        if (password1.val() != dataInput) {
            valid = false;
            message = 'Password doesn\'t match';
        } else {
            valid = true;
        }
    } else if (inputName == 'password1') {
        let password2 = $('input[name="password2"]');
        if (password2.val() != dataInput) {
            forms['password2'] = false;

            password2.removeClass('is-valid');
            password2.addClass('is-invalid');

            password2.siblings('.invalid-feedback').remove();
            password2.after(`
                <div class="invalid-feedback">
                    Password doesn't match
                </div>
            `);
        } else {
            forms['password2'] = true;

            password2.addClass('is-valid');
            password2.removeClass('is-invalid');
            password2.siblings('.invalid-feedback').remove();
        }

        if (dataInput.length < 6) {
            valid = false;
            message = 'Password must be more than 6 characters';
        } else if (!validPassword(dataInput)) {
            valid = false;
            message = 'Password must contains letters and numbers';
        } else {
            valid = true;
        }
    } else {
        valid = true;
    }

    if (valid) {
        forms['' + inputName + ''] = true;

        nameField.addClass('is-valid');
        nameField.removeClass('is-invalid');
        nameField.siblings('.invalid-feedback').remove();
    } else {
        forms['' + inputName + ''] = false;

        nameField.removeClass('is-valid');
        nameField.addClass('is-invalid');

        nameField.siblings('.invalid-feedback').remove();
        nameField.after(`
            <div class="invalid-feedback">
                ` + message + `
            </div>
        `);
    }

    validate();
}

$('#registerButton').click(() => {
    $.ajax({
        url: 'database/users.json',
        dataType: 'JSON',
        method: 'GET',
        success: (result) => {
            let isRegistered = false;
            result.forEach(user => {
                if (user.email == $('input[name="email"]').val()) {
                    isRegistered = true;
                }
            });

            if (isRegistered) {
                $('#exampleModal').modal('show');
                $('.modal-body').html("Email is already registered");
            } else {
                $.ajax({
                    url: 'register.php',
                    dataType: 'JSON',
                    method: 'POST',
                    data: {
                        'name': $('input[name="nama"]').val(),
                        'email': $('input[name="email"]').val(),
                        'password': $('input[name="password1"]').val(),
                        'TTL': $('input[name="TTL"]').val(),
                    },
                    success: (data) => {
                        $('#exampleModal').modal('show');
                        $('.modal-body').html("You are successfully registered!");
                        $('.modal-footer a').removeAttr('data-dismiss');
                        $('.modal-footer a').attr('href', 'login.html');
                        $('.modal-footer a').html('Proceed');
                    }
                });
            }
        }
    });
});

validate();