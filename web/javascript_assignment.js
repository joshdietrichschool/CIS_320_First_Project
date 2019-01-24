function printHello() {
    console.log("Hello");
}

var calculateButton = $("#button2");
calculateButton.on("click", calculateValue);

function calculateValue() {
    var num1 = $("#field1").val();
    var num2 = $("#field2").val();
    var sum = parseInt(num1) + parseInt(num2);
    $("#field3").val("" + sum);
}

var hideButton = $("#button3");
hideButton.on("click", hideParagraph);

function hideParagraph() {
    var paragraph = $("#paragraphToHide");
    paragraph.toggle();
}

var validateButton = $("#button4");
validateButton.on("click", validateInput);

function validateInput() {
    var phoneNumber = $("#phoneField").val();
    var regex = /^[1-9]\d{2}-\d{3}-\d{4}$/;

    if(regex.test(phoneNumber)) {
        console.log("OK");
    } else {
        console.log("Bad");
    }
}

var JSONButton = $("#button5");
JSONButton.on("click", createJSON);

function createJSON() {
    var person = {};

    person.firstName = $("#firstName").val();
    person.lastName = $("#lastName").val();
    person.email = $("#email").val();

    var json = JSON.stringify(person);
    console.log(json);
}