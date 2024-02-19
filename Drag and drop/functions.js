// 1. Declarar una array buida on aniran tots els fitxers
let filesArray = [];

// 2. Declarar els objects que farem servir
const dropArea = document.querySelector('.drop-area');
const dragDropText = document.querySelector('h2');
const button = document.querySelector('button');
const input = document.querySelector('#input-file');
const preview = document.querySelector('#preview');

// 3. Invalidar l’acció per defecte del drag & drop
['dragover', 'dragleave', 'drop'].forEach(evt => {
    dropArea.addEventListener(evt, prevDefault);
});

function prevDefault(e) {
    e.preventDefault();
}

// 4. Acció dragover
dropArea.addEventListener("dragover", function () {
    dropArea.classList.add("active");
    dragDropText.textContent = "Arrossega els fitxers aquí";
});

// 5. Acció dragleave
dropArea.addEventListener("dragleave", function () {
    dropArea.classList.remove("active");
    dragDropText.textContent = "Arrossega i deixa anar els fitxers aquí";
});

// 6. Acción drop
dropArea.addEventListener("drop", function (event) {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    Array.from(droppedFiles).forEach(file => {
        // Verificar si el archivo ya existe en el array por su nombre
        const fileExists = filesArray.some(existingFile => existingFile.name === file.name);
        
        // Si el archivo no existe, agrégalo al array
        if (!fileExists) {
            filesArray.push(file);
        }
    });

    showFiles();
    dropArea.classList.remove("active");
    dragDropText.textContent = "Arrossega i deixa anar els fitxers aquí";
});


// 7. Función showFiles
function showFiles() {
    preview.innerHTML = '';  
    filesArray.forEach((file, index) => {
        processFile(file, index); 
    });
}

// 8. Funció processFile(file, index)
function processFile(file, index) {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const docType = file.type;

    if (!validExtensions.includes(docType)) {
        console.log("El archivo " + file.name + " no tiene una extensión de imagen válida.");
        return;
    }

    let reader = new FileReader();
    reader.onload = function() {
        const fileURL = reader.result;
        let prev = `<div class="previewImage">
                        <img src="${fileURL}" />
                        <span>${file.name}</span>
                        <span onclick="removeBtn(${index})" class="material-symbols-outlined removeBtn">c</span>
                    </div>`;
        preview.innerHTML += prev;
    };
    reader.readAsDataURL(file);
}

// 9. Funció removeBtn(i)
function removeBtn(index) {
    filesArray.splice(index, 1);
    preview.innerHTML = '';
    showFiles(); 
}

// 10. Click al botó Upload Files
button.addEventListener("click", function(e) {
    e.preventDefault();
    input.click();
});

// 11. Gestiona els arxius seleccionats
input.addEventListener("change", function() {
    const selectedFiles = input.files;
    Array.from(selectedFiles).forEach(file => {
        const fileExists = filesArray.some(existingFile => existingFile.name === file.name);
        
        if (!fileExists) {
            filesArray.push(file);
        }
    });
    showFiles();
});