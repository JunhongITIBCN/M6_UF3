<?php
//Arxiu per eliminar el producte amb la id
if(isset($_POST["id"])) {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "prova";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $idProducte = $_POST["id"];

    $sql = "DELETE FROM productes WHERE id = $idProducte";

    $conn->query($sql);

    $conn->close();
}
?>
