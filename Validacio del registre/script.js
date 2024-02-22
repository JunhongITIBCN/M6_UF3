const form = document.getElementById("myForm");

form.addEventListener("focusin", (event) => {
    event.target.style.background = "pink";
});
form.addEventListener("focusout", (event) => {
    event.target.style.background = "";
});

function validateForm() {
    return
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    //Validacions

    form.submit();
});

