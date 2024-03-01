// Funció per obtenir i mostrar les categories des del servidor
function getCategories() {
    fetch("categories.php")
        .then(response => response.json())
        .then(data => {
            // Netegem les opcions existents del selector de categories
            var categorySelect = document.getElementById("category");
            categorySelect.innerHTML = ""; // Netegem el selector de categories

            // Iterem sobre les categories i afegim les opcions al selector
            data.forEach(category => {
                var opt = document.createElement('option');
                opt.value = category.id;
                opt.text = category.nom;
                categorySelect.appendChild(opt);
            });

            // Omplim també el selector de subcategories amb les subcategories de la categoria seleccionada per defecte
            getSubcategories();
        })
        .catch(error => {
            console.log(error); // Mostrem errors si els hi ha
        });
}

// Funció per obtenir i mostrar les subcategories
function getSubcategories() {
    // Recollim el valor seleccionat de la categoria
    var categoryId = document.getElementById("category").value;

    // Creem un nou objecte FormData
    let formData = new FormData();

    // Afegim dades a l'objecte FormData
    formData.append("cat1", categoryId);

    // Configurem les opcions de la sol·licitud fetch
    let options = {
        method: 'POST', // Mètode POST
        body: formData // Cos de la sol·licitud és l'objecte FormData
    };

    // Creem la sol·licitud fetch per obtenir les subcategories corresponents a la categoria seleccionada
    fetch("subcategories.php", options)
        .then(response => response.json()) // El primer then processa la resposta i la converteix en JSON
        .then(data => {
            // Netegem les opcions existents del selector de subcategories
            var subcategorySelect = document.getElementById("subcategory");
            subcategorySelect.innerHTML = ""; // Netegem el selector de subcategories

            // Iterem sobre les subcategories i afegim les opcions al selector
            data.forEach(subcategory => {
                var opt = document.createElement('option');
                opt.value = subcategory.id;
                opt.text = subcategory.nom;
                subcategorySelect.appendChild(opt);
            });
        })
        .catch(error => {
            console.log(error); // Mostrem errors si els hi ha
        });
}

// Executem getCategories() quan es carrega la pàgina
document.addEventListener("DOMContentLoaded", getCategories);

// Gestionem l'esdeveniment de canvi en el selector de categories per obtenir i mostrar les subcategories corresponents
document.getElementById("category").addEventListener("change", getSubcategories);
