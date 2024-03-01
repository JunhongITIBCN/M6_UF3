<?php
// Realitzar la connexió a la base de dades
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "u";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la connexió
if ($conn->connect_error) {
    die("Error de connexió: " . $conn->connect_error);
}

// Consultar les categories des de la base de dades
$sql = "SELECT id, nom FROM categories";
$result = $conn->query($sql);

// Verificar si es troben resultats
if ($result->num_rows > 0) {
    // Crear un array per emmagatzemar les categories
    $categories = array();

    // Iterar sobre els resultats i emmagatzemar cada categoria a l'array
    while($row = $result->fetch_assoc()) {
        $category = array(
            'id' => $row['id'],
            'nom' => $row['nom'] 
        );
        $categories[] = $category;
    }

    // Retornar les categories en format JSON
    echo json_encode($categories);
} else {
    echo "No s'han trobat categories";
}

// Tancar la connexió a la base de dades
$conn->close();
?>
