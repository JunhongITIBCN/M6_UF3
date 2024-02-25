document.addEventListener("DOMContentLoaded", function() {
    // Obtenir els elements dels camps d'entrada i els missatges d'error
    const inputNom = document.getElementById("name");
    const inputCorreu = document.getElementById("mail");
    const inputContrasenya = document.getElementById("password");
    const inputConfirmarContrasenya = document.getElementById("password_conf");
    const inputAdreca = document.getElementById("adress");

    const errorNom = document.getElementById("name-error");
    const errorCorreu = document.getElementById("mail-error");
    const errorContrasenya = document.getElementById("password-error");
    const errorConfirmarContrasenya = document.getElementById("password-conf-error");
    const errorAdreca = document.getElementById("address-error");

    // Validar el camp quan es surti d'ell
    inputNom.addEventListener("focusout", function() {
        validarCamp(inputNom, errorNom, "El nom és obligatori.");
    });

    inputCorreu.addEventListener("focusout", function() {
        validarCorreu(inputCorreu, errorCorreu);
    });

    inputContrasenya.addEventListener("input", function() {
        validarContrasenya(inputContrasenya, errorContrasenya);
    });

    inputConfirmarContrasenya.addEventListener("input", function() {
        validarConfirmarContrasenya(inputConfirmarContrasenya, errorConfirmarContrasenya);
    });

    inputAdreca.addEventListener("focusout", function() {
        validarCamp(inputAdreca, errorAdreca, "La direcció és obligatòria.");
    });

    // Funció per validar el camp
    function validarCamp(input, errorElement, errorMessage) {
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

    // Funció per validar el correu electrònic
    function validarCorreu(input, errorElement) {
        const correu = input.value.trim();
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correu)) {
            input.style.background = "green";
            errorElement.innerHTML = "";
            return true;
        } else {
            input.style.background = "red";
            errorElement.innerHTML = "El correu electrònic introduït no és vàlid.";
            return false;
        }
    }

    // Funció per validar la contrasenya
    function validarContrasenya(input, errorElement) {
        const contrasenya = input.value.trim();
        const lowerCaseLetters = /[a-z]/;
        const upperCaseLetters = /[A-Z]/;
        const numbers = /[0-9]/;
        const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        let errors = [];
    
        if (contrasenya.length < 8 || contrasenya.length > 15) {
            errors.push("La contrasenya ha de tenir entre 8 i 15 caràcters.");
        }
        if (!lowerCaseLetters.test(contrasenya)) {
            errors.push("La contrasenya ha de contenir almenys una lletra minúscula.");
        }
        if (!upperCaseLetters.test(contrasenya)) {
            errors.push("La contrasenya ha de contenir almenys una lletra majúscula.");
        }
        if (!numbers.test(contrasenya)) {
            errors.push("La contrasenya ha de contenir almenys un número.");
        }
        if (!specialChars.test(contrasenya)) {
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

    // Funció per validar la confirmació de la contrasenya
    function validarConfirmarContrasenya(input, errorElement) {
        const contrasenya = inputContrasenya.value.trim();
        const confirmarContrasenya = input.value.trim();
        
        if (confirmarContrasenya === contrasenya) {
            input.style.background = "green";
            errorElement.innerHTML = "";
            return true;
        } else {
            input.style.background = "red";
            errorElement.innerHTML = "La confirmació de la contrasenya no coincideix amb la contrasenya introduïda.";
            return false;
        }
    }

    // Funció per validar el formulari abans de l'enviament
    function validarFormulari() {
        const esNomValid = validarCamp(inputNom, errorNom, "El nom és obligatori.");
        const esCorreuValid = validarCorreu(inputCorreu, errorCorreu);
        const esContrasenyaValid = validarContrasenya(inputContrasenya, errorContrasenya);
        const esConfirmarContrasenyaValid = validarConfirmarContrasenya(inputConfirmarContrasenya, errorConfirmarContrasenya);
        const esAdrecaValid = validarCamp(inputAdreca, errorAdreca, "La direcció és obligatòria.");
        
        return esNomValid && esCorreuValid && esContrasenyaValid && esConfirmarContrasenyaValid && esAdrecaValid;
    }

    // Afegir un escoltador d'esdeveniments al formulari per validar abans de l'enviament
    const formulari = document.forms["myForm"];
    formulari.addEventListener("submit", function(e) {
        if (!validarFormulari()) {
            e.preventDefault(); 
        }
    });
});
