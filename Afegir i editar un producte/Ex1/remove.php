<?php
//Arxiu per eliminar el producte amb la id
if (isset ($_GET["id"])) {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "prova";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die ("Connection failed: " . $conn->connect_error);
    }

    $idProducte = $_GET["id"];

    $sql = "DELETE FROM productes WHERE id = $idProducte";

    $conn->query($sql);

    $conn->close();
}
header('Location: ex1Llistat.php');

?>