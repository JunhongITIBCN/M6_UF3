const selectDistrictes = document.getElementById("districtes");
const selectBarris = document.getElementById("barris");
const textPis = document.getElementById("nomPis");
const textDir = document.getElementById("dir");
const textPreu = document.getElementById("preu");
const textText = document.getElementById("text");
const nom_pis = document.getElementById("nom_pis");
const vies = document.getElementById("vies");
const nom_via = document.getElementById("nom_via");
const numero_via = document.getElementById("numero_via");
const pis = document.getElementById("pis");
const escala = document.getElementById("escala");
const porta = document.getElementById("porta");
const cp = document.getElementById("cp");
const preu_pis = document.getElementById("preu_pis");
const textarea = document.getElementById("textarea");

const showError = (element, message) => {
    const feedback = document.getElementById(`feedback-${element.id}`);
    element.classList.add('is-invalid');
    feedback.textContent = message;
};

const hideError = (element) => {
    const feedback = document.getElementById(`feedback-${element.id}`);
    element.classList.remove('is-invalid');
    feedback.textContent = '';
};

const validateInput = (element) => {
    if (element.value.trim() === '') {
        showError(element, 'Este campo es obligatorio.');
        return false;
    } else {
        hideError(element);
        return true;
    }
};

selectBarris.disabled = true;

const fetchData = (url, options) => {
    return fetch(url, options)
        .then(response => response.json())
        .catch(error => console.log("Error:", error));
};

const updateSelectOptions = (selectElement, data) => {
    selectElement.innerHTML = "";
    data.forEach(value => {
        let option = new Option(value.name, value.name);
        selectElement.appendChild(option);
    });
};

const updateTextContent = () => {
    textPis.textContent = `${nom_pis.value}: ${selectDistrictes.selectedOptions[0].text}, ${selectBarris.selectedOptions[0].text}`;
    textDir.textContent = `${vies.options[vies.selectedIndex].text} ${nom_via.value} ${numero_via.value} ${pis.value} ${escala.value} ${porta.value} · ${cp.value} · ${selectDistrictes.selectedOptions[0].text} · ${selectBarris.selectedOptions[0].text}`;
    textPreu.textContent = preu_pis.value;
    textText.textContent = textarea.value;
};

fetchData("getDistrictes.php")
    .then(data => updateSelectOptions(selectDistrictes, data));

selectDistrictes.addEventListener("change", () => {
    selectBarris.disabled = false;
    fetchData("getBarris.php", {
        method: 'POST',
        body: new FormData().append("id", selectDistrictes.selectedIndex)
    }).then(data => updateSelectOptions(selectBarris, data));
});

$('#form-user-register').submit(function(e) {
    e.preventDefault();
    const isValid = validateInput(nom_pis) && validateInput(vies) && validateInput(nom_via) && validateInput(numero_via) && validateInput(pis) && validateInput(escala) && validateInput(porta) && validateInput(cp) && validateInput(preu_pis) && validateInput(textarea);
    if (isValid) {
        updateTextContent();
    }
});

nom_pis.addEventListener('focusout', () => validateInput(nom_pis));
vies.addEventListener('focusout', () => validateInput(vies));
nom_via.addEventListener('focusout', () => validateInput(nom_via));
numero_via.addEventListener('focusout', () => validateInput(numero_via));
pis.addEventListener('focusout', () => validateInput(pis));
escala.addEventListener('focusout', () => validateInput(escala));
porta.addEventListener('focusout', () => validateInput(porta));
cp.addEventListener('focusout', () => validateInput(cp));
preu_pis.addEventListener('focusout', () => validateInput(preu_pis));
textarea.addEventListener('focusout', () => validateInput(textarea));

[nom_pis, vies, nom_via, numero_via, pis, escala, porta, cp, preu_pis, textarea].forEach(element => {
    element.addEventListener('focusin', () => hideError(element));
});
