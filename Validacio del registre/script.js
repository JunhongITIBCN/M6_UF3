document.addEventListener("DOMContentLoaded", function() {
    const userNameInput = document.getElementById("name");
    const emailInput = document.getElementById("mail");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("password_conf");
    const addressInput = document.getElementById("adress");

    const userNameError = document.getElementById("name-error");
    const emailError = document.getElementById("mail-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("password-conf-error");
    const addressError = document.getElementById("address-error");

    userNameInput.addEventListener("focusout", function() {
        validateField(userNameInput, userNameError, "El nom és obligatori.");
    });

    emailInput.addEventListener("focusout", function() {
        validateEmail(emailInput, emailError);
    });

    passwordInput.addEventListener("input", function() {
        validatePassword(passwordInput, passwordError);
    });

    confirmPasswordInput.addEventListener("input", function() {
        validateConfirmPassword(confirmPasswordInput, confirmPasswordError);
    });

    addressInput.addEventListener("focusout", function() {
        validateField(addressInput, addressError, "La direcció és obligatòria.");
    });

    function validateField(input, errorElement, errorMessage) {
        if (input.value.trim() !== "") {
            input.style.background = "green";
            errorElement.innerHTML = "";
            return true;
        } else {
            input.style.background = "red";
            errorElement.innerHTML = errorMessage;
            return false;
        }
    }

    function validateEmail(input, errorElement) {
        const email = input.value.trim();
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            input.style.background = "green";
            errorElement.innerHTML = "";
            return true;
        } else {
            input.style.background = "red";
            errorElement.innerHTML = "El correu electrònic introduït no és vàlid.";
            return false;
        }
    }

    function validatePassword(input, errorElement) {
        const password = input.value.trim();
        const lowerCaseLetters = /[a-z]/;
        const upperCaseLetters = /[A-Z]/;
        const numbers = /[0-9]/;
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let errors = [];
    
        if (password.length < 8 || password.length > 15) {
            errors.push("La contrasenya ha de tenir entre 8 i 15 caràcters.");
        }
        if (!lowerCaseLetters.test(password)) {
            errors.push("La contrasenya ha de contenir almenys una lletra minúscula.");
        }
        if (!upperCaseLetters.test(password)) {
            errors.push("La contrasenya ha de contenir almenys una lletra majúscula.");
        }
        if (!numbers.test(password)) {
            errors.push("La contrasenya ha de contenir almenys un número.");
        }
        if (!specialChars.test(password)) {
            errors.push("La contrasenya ha de contenir almenys un caràcter especial.");
        }
    
        if (errors.length === 0) {
            input.style.background = "green";
            errorElement.innerHTML = "";
            return true;
        } else {
            input.style.background = "red";
            errorElement.innerHTML = errors.join("<br>");
            return false;
        }
    }

    function validateConfirmPassword(input, errorElement) {
        const password = passwordInput.value.trim();
        const confirmPassword = input.value.trim();
        
        if (confirmPassword === password) {
            input.style.background = "green";
            errorElement.innerHTML = "";
            return true;
        } else {
            input.style.background = "red";
            errorElement.innerHTML = "La confirmació de la contrasenya no coincideix amb la contrasenya introduïda.";
            return false;
        }
    }

    function validateForm() {
        const isUserNameValid = validateField(userNameInput, userNameError, "El nom és obligatori.");
        const isEmailValid = validateEmail(emailInput, emailError);
        const isPasswordValid = validatePassword(passwordInput, passwordError);
        const isConfirmPasswordValid = validateConfirmPassword(confirmPasswordInput, confirmPasswordError);
        const isAddressValid = validateField(addressInput, addressError, "La direcció és obligatòria.");
        
        return isUserNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isAddressValid;
    }

    const form = document.forms["myForm"];
    form.addEventListener("submit", function(e) {
        if (!validateForm()) {
            e.preventDefault(); 
        }
    });
});
