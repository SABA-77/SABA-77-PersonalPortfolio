let form = document.getElementById("signupForm");

let name = document.getElementById("name");

let email = document.getElementById("email");

let phone = document.getElementById("phone");

let password = document.getElementById("password");

let confirmPassword =
    document.getElementById("confirmPassword");

let showPassword =
    document.getElementById("showPassword");

let terms =
    document.getElementById("terms");


let nameError =
    document.getElementById("nameError");

let emailError =
    document.getElementById("emailError");

let phoneError =
    document.getElementById("phoneError");

let passwordError =
    document.getElementById("passwordError");

let confirmPasswordError =
    document.getElementById("confirmPasswordError");

let termsError =
    document.getElementById("termsError");

let successMessage =
    document.getElementById("successMessage");



/* Form Submit */

form.addEventListener("submit", function(event) {

    event.preventDefault();


    /* Clear old messages */

    nameError.textContent = "";

    emailError.textContent = "";

    phoneError.textContent = "";

    passwordError.textContent = "";

    confirmPasswordError.textContent = "";

    termsError.textContent = "";

    successMessage.textContent = "";


    let valid = true;



    /* Name Validation */

    if (name.value === "") {

        nameError.textContent =
            "Full name is required.";

        valid = false;

    }



    /* Email Validation */

    if (email.value === "") {

        emailError.textContent =
            "Email is required.";

        valid = false;

    }

    else if (!email.value.includes("@")) {

        emailError.textContent =
            "Enter a valid email.";

        valid = false;

    }



    /* Phone Validation */

    if (phone.value === "") {

        phoneError.textContent =
            "Phone number is required.";

        valid = false;

    }

    else if (phone.value.length !== 10) {

        phoneError.textContent =
            "Phone number must contain 10 digits.";

        valid = false;

    }



    /* Password Validation */

    if (password.value === "") {

        passwordError.textContent =
            "Password is required.";

        valid = false;

    }

    else if (password.value.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        valid = false;

    }



    /* Confirm Password */

    if (confirmPassword.value === "") {

        confirmPasswordError.textContent =
            "Please confirm your password.";

        valid = false;

    }

    else if (
        confirmPassword.value !== password.value
    ) {

        confirmPasswordError.textContent =
            "Passwords do not match.";

        valid = false;

    }



    /* Terms */

    if (!terms.checked) {

        termsError.textContent =
            "You must accept the Terms & Conditions.";

        valid = false;

    }



    /* Success */

    if (valid) {

        successMessage.textContent =
            "Account created successfully! 🎉";

        form.reset();

    }

});



/* Show / Hide Password */

showPassword.addEventListener("change", function() {

    if (showPassword.checked) {

        password.type = "text";

        confirmPassword.type = "text";

    }

    else {

        password.type = "password";

        confirmPassword.type = "password";

    }

});



/* Name Validation */

name.addEventListener("input", function() {

    if (name.value === "") {

        nameError.textContent =
            "Full name is required.";

    }

    else {

        nameError.textContent = "";

    }

});



/* Email Validation */

email.addEventListener("input", function() {

    if (email.value === "") {

        emailError.textContent =
            "Email is required.";

    }

    else if (!email.value.includes("@")) {

        emailError.textContent =
            "Enter a valid email.";

    }

    else {

        emailError.textContent = "";

    }

});



/* Phone Validation */

phone.addEventListener("input", function() {

    if (phone.value === "") {

        phoneError.textContent =
            "Phone number is required.";

    }

    else if (phone.value.length !== 10) {

        phoneError.textContent =
            "Phone number must contain 10 digits.";

    }

    else {

        phoneError.textContent = "";

    }

});



/* Password Validation */

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



/* Confirm Password Validation */

confirmPassword.addEventListener("input", function() {

    if (confirmPassword.value === "") {

        confirmPasswordError.textContent =
            "Please confirm your password.";

    }

    else if (
        confirmPassword.value !== password.value
    ) {

        confirmPasswordError.textContent =
            "Passwords do not match.";

    }

    else {

        confirmPasswordError.textContent = "";

    }

});