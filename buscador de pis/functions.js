$(document).ready(function() {
    $('#form-user-register').submit(function(e) {
        e.preventDefault();
        validateForm();
    });

    $('#validationNom, #validationCognoms, #validationDNI, #validationUsername, #validationEmail, #validationTelf').on('focusout', function() {
        validateField($(this));
    });

    $('#btnUsername').click(function() {
        generateUsername();
    });

    function validateForm() {
        var isValid = true;

        isValid = validateField($('#validationNom')) && isValid;
        isValid = validateField($('#validationCognoms')) && isValid;
        isValid = validateField($('#validationDNI')) && isValid;
        isValid = validateField($('#validationUsername')) && isValid;
        isValid = validateField($('#validationEmail')) && isValid;
        isValid = validateField($('#validationTelf')) && isValid;

        if (isValid) {
            $('#form-user-register').submit();
        }
    }

    function validateField($field) {
        var value = $field.val().trim();
        var $feedback = $field.next('#feedback-' + $field.attr('id').substring(10));

        if (value === "") {
            $field.addClass('is-invalid').removeClass('is-valid');
            $feedback.html("Este campo es obligatorio.").addClass('invalid-feedback').removeClass('valid-feedback');
            return false;
        } else {
            if ($field.attr('id') === 'validationDNI') {
                if (!validateNIF_NIE(value)) {
                    $field.addClass('is-invalid').removeClass('is-valid');
                    $feedback.html("El DNI/NIE no es válido.").addClass('invalid-feedback').removeClass('valid-feedback');
                    return false;
                }
            } else if ($field.attr('id') === 'validationEmail') {
                if (!validateEmail(value)) {
                    $field.addClass('is-invalid').removeClass('is-valid');
                    $feedback.html("El correo electrónico no es válido.").addClass('invalid-feedback').removeClass('valid-feedback');
                    return false;
                }
            } else if ($field.attr('id') === 'validationTelf') {
                if (!validatePhone(value)) {
                    $field.addClass('is-invalid').removeClass('is-valid');
                    $feedback.html("El número de teléfono no es válido.").addClass('invalid-feedback').removeClass('valid-feedback');
                    return false;
                }
            }

            $field.removeClass('is-invalid').addClass('is-valid');
            $feedback.html("").addClass('valid-feedback').removeClass('invalid-feedback');
            return true;
        }
    }

    function validateNIF_NIE(value) {
        var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
        var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
        var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
        var str = value.toString().toUpperCase();

        if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

        var nie = str
            .replace(/^[X]/, '0')
            .replace(/^[Y]/, '1')
            .replace(/^[Z]/, '2');

        var letter = str.substr(-1);
        var charIndex = parseInt(nie.substr(0, 8)) % 23;

        return validChars.charAt(charIndex) === letter;
    }

    function validateEmail(mail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    }

    function validatePhone(phone) {
        return /^[0-9]{9}$/.test(phone);
    }

    function generateUsername() {
        var nom = $('#validationNom').val().trim().toLowerCase();
        var cognoms = $('#validationCognoms').val().trim().toLowerCase().replace(/\s+/g, ''); 
        var dni = $('#validationDNI').val().trim();

        var primeraLletraNom = nom.charAt(0).toLowerCase();

        var apellidos = cognoms.split(' ');
        var primerCognom = apellidos[0];
        var segundoCognom = apellidos[1] || '';

        var numerosDNI = dni.match(/[02468]/g).join('');

        var username = primeraLletraNom + primerCognom + segundoCognom + numerosDNI;

        $('#validationUsername').val(username);
    }
    
    $('#validationNom, #validationCognoms, #validationDNI, #validationUsername, #validationEmail, #validationTelf').on('focusin', function() {
        $(this).removeClass('is-invalid');
        $(this).next('#feedback-' + $(this).attr('id').substring(10)).html('').removeClass('invalid-feedback');
    });
});
