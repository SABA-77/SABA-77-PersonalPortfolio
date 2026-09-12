let form = document.getElementById("loginForm");

let email = document.getElementById("email");

let password = document.getElementById("password");

let showPassword = document.getElementById("showPassword");

let emailError = document.getElementById("emailError");

let passwordError = document.getElementById("passwordError");

let successMessage = document.getElementById("successMessage");


// Form submission
form.addEventListener("submit", function(event) {

    event.preventDefault();

    emailError.textContent = "";

    passwordError.textContent = "";

    successMessage.textContent = "";


    // Email validation
    if (email.value === "") {

        emailError.textContent = "Email is required.";

    }


    // Password validation
    if (password.value === "") {

        passwordError.textContent = "Password is required.";

    }


    // Check password length
    else if (password.value.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

    }


    // Check whether fields are valid
    if (email.value !== "" && password.value.length >= 6) {

        successMessage.textContent =
            "Login successful!";

    }

});


// Show / Hide password
showPassword.addEventListener("change", function() {

    if (showPassword.checked) {

        password.type = "text";

    }

    else {

        password.type = "password";

    }

});


// Email validation while typing
email.addEventListener("input", function() {

    if (email.value === "") {

        emailError.textContent = "Email is required.";

    }

    else {

        emailError.textContent = "";

    }

});


// Password validation while typing
password.addEventListener("input", function() {

    if (password.value === "") {

        passwordError.textContent =
            "Password is required.";

    }

    else if (password.value.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

    }

    else {

        passwordError.textContent = "";

    }

});