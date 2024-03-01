<?php
// Realitza la connexió a la base de dades
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "u";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la connexió
if ($conn->connect_error) {
    die("Error de connexió: " . $conn->connect_error);
}

// Recollir l'ID de la categoria seleccionada
$categoryId = $_POST['cat1'];

// Consultar les subcategories des de la base de dades per a la categoria seleccionada
$sql = "SELECT id, nom FROM subcategories WHERE categoria_id = $categoryId";
$result = $conn->query($sql);

// Verificar si s'han trobat resultats
if ($result->num_rows > 0) {
    // Crear un array per emmagatzemar les subcategories
    $subcategories = array();

    // Iterar sobre els resultats i emmagatzemar cada subcategoria a l'array
    while($row = $result->fetch_assoc()) {
        $subcategory = array(
            'id' => $row['id'],
            'nom' => $row['nom']
        );
        $subcategories[] = $subcategory;
    }

    // Retornar les subcategories en format JSON
    echo json_encode($subcategories);
} else {
    echo "No s'han trobat subcategories per a la categoria seleccionada";
}

// Tancar la connexió a la base de dades
$conn->close();
?>
