function login() {

    var url = "api/login_servlet";

    // Grab data from the HTML form
    var loginId = $("#loginId").val();

    // Create a JSON request based on that data
    var dataToServer = {loginId : loginId};

    // Post
    $.post(url, dataToServer, function (dataFromServer) {
        // We are done. Write a message to our console
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin();
        // Clear the form
        $("#loginId").val("");
    });
}

// This gets session info from our back-end servlet.
function getLogin() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result
        $('#getLoginResult').html(dataFromServer);
        if(String(dataFromServer).includes("You are not currently logged in.")) {
            $('#logOutHeader').hide();
            $('#logOut').hide();
        } else {
            $('#logOutHeader').show();
            $('#logOut').show();
        }
    });
}

// This method calls the servlet that invalidates our session
function logOut() {

    var url = "api/log_out_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin();
    });
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLogin);

button = $('#login');
button.on("click", login);

button = $('#logOut');
button.on("click", logOut);

getLogin();