console.log("Hi, this is a test.");

function updateTable() {
    var url = "api/name_list_get";

    $.getJSON(url, null, function resultHandler(result) {
        $('#datatable tbody').html('<tr><td>' + result[0].id + '</td>' +
            '<td>' + result[0].first + '</td>' +
            '<td>' + result[0].last + '</td>' +
            '<td>' + result[0].email + '</td>' +
            '<td>' + result[0].phone + '</td>' +
            '<td>' + result[0].birthday + '</td>' +
            '<td><button type=\'button\' name=\'delete\' class=\'deleteButton btn\' value=\'' + result[0].id + '\'>Delete</button></td></tr>');
       for(var i=1; i<result.length; i++) {
           $('#datatable tbody').append('<tr><td>' + result[i].id + '</td>' +
               '<td>' + result[i].first + '</td>' +
               '<td>' + result[i].last + '</td>' +
               '<td>' + result[i].email + '</td>' +
               '<td>' + result[i].phone + '</td>' +
               '<td>' + result[i].birthday + '</td>' +
               '<td><button type=\'button\' name=\'delete\' class=\'deleteButton btn\' value=\'' + result[i].id + '\'>Delete</button></td></tr>');
       }
    });
}

updateTable();

var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

function showDialogAdd() {
    console.log("Opening add item modal");

    $('#id').val("");
    $('#firstName').val("");
    $('#firstName').removeClass('is-valid');
    $('#firstName').removeClass('is-invalid');
    $('#lastName').val("");
    $('#lastName').removeClass('is-valid');
    $('#lastName').removeClass('is-invalid');
    $('#email').val("");
    $('#email').removeClass('is-valid');
    $('#email').removeClass('is-invalid');
    $('#phone').val("");
    $('#phone').removeClass('is-valid');
    $('#phone').removeClass('is-invalid');
    $('#birthday').val("");
    $('#birthday').removeClass('is-valid');
    $('#birthday').removeClass('is-invalid');

    $('#myModal').modal('show');
}

var firstName = $('#firstName');
firstName.on('change', validateFirstName);

function validateFirstName() {
    var regex = /^[A-Z]+ ?([A-Za-z]+)?$/;
    var firstNameInput = $('#firstName');
    if(regex.test(firstNameInput.val())) {
        firstNameInput.removeClass('is-invalid');
        firstNameInput.addClass('is-valid');
        console.log("valid first name")
        return true;
    } else {
        firstNameInput.removeClass('is-valid');
        firstNameInput.addClass('is-invalid');
        console.log("invalid first name");
        return false
    }
}

var lastName = $('#lastName');
lastName.on('change', validateLastName);

function validateLastName() {
    var regex1 = /^([A-Z]([a-z]+)? )?[A-Z][a-z]+$/;
    var regex2 = /^([A-Z]'[A-Z][a-z]+)$/;
    var lastNameInput = $('#lastName');
    if(regex1.test(lastNameInput.val()) || regex2.test(lastNameInput.val())) {
        lastNameInput.removeClass('is-invalid');
        lastNameInput.addClass('is-valid');
        console.log("valid last name")
        return true;
    } else {
        lastNameInput.removeClass('is-valid');
        lastNameInput.addClass('is-invalid');
        console.log("invalid last name");
        return false
    }
}

var email = $('#email');
email.on('change', validateEmail);

function validateEmail() {
    var regex = /^\w+((\.\w+)+)?@(\w+\.)+[a-z]+$/;
    var emailInput = $('#email');
    if(regex.test(emailInput.val())) {
        emailInput.removeClass('is-invalid');
        emailInput.addClass('is-valid');
        console.log("valid email")
        return true;
    } else {
        emailInput.removeClass('is-valid');
        emailInput.addClass('is-invalid');
        console.log("invalid email");
        return false
    }
}

var phone = $('#phone');
phone.on('change', validatePhone);

function validatePhone() {
    var regex = /^\d{3}-\d{3}-\d{4}$/;
    var phoneInput = $('#phone');
    if(regex.test(phoneInput.val())) {
        phoneInput.removeClass('is-invalid');
        phoneInput.addClass('is-valid');
        console.log("valid phone");
        return true;
    } else {
        phoneInput.removeClass('is-valid');
        phoneInput.addClass('is-invalid');
        console.log("invalid phone");
        return false
    }
}

var birthday = $('#birthday');
birthday.on('change', validateBirthday);

function validateBirthday() {
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    var birthdayInput = $('#birthday');
    if(regex.test(birthdayInput.val())) {
        birthdayInput.removeClass('is-invalid');
        birthdayInput.addClass('is-valid');
        console.log("valid birthday");
        return true;
    } else {
        birthdayInput.removeClass('is-valid');
        birthdayInput.addClass('is-invalid');
        console.log("invalid birthday");
        return false
    }
}

var saveButton = $('#saveChanges');
saveButton.on('click', saveToDatabase);

function saveToDatabase() {
    console.log("Validating inputs");
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
    validateBirthday();
    console.log("Inputs validated");

    if($('#firstName').hasClass('is-valid') &&
        $('#lastName').hasClass('is-valid') &&
        $('#email').hasClass('is-valid') &&
        $('#phone').hasClass('is-valid') &&
        $('#birthday').hasClass('is-valid')) {

        var firstNameVal = $('#firstName').val();
        var lastNameVal = $('#lastName').val();
        var emailVal = $('#email').val();
        var phoneVal = $('#phone').val();
        var birthdayVal = $('#birthday').val();

        var jsonObject = {
            first: firstNameVal,
            last: lastNameVal,
            email: emailVal,
            phone: phoneVal,
            birthday: birthdayVal
        };
        var url = "api/name_list_edit";

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(jsonObject),
            success: [
                function(dataFromServer) {
                    console.log("success");
                    updateTable();
                }
            ],
            contentType: "application/json",
            dataType: 'text'
        });

        console.log('Saving person to database...');

        console.log('Closing modal');
        $('#myModal').modal('hide');

    } else {
        console.log('Not all fields are valid');
    }
}

function deleteItem(e) {
    console.log("Delete");
    console.log(e.target.value);
}

// $(".deleteButton").on('click', deleteItem);

$(document).on('click', ".deleteButton", deleteItem);