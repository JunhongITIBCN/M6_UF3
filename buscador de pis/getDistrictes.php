<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prova";

$conn = new mysqli($servername, $username, $password, $dbname);


if (mysqli_ping($conn)) {
    $sql = "SELECT * FROM districtes";

    $query = mysqli_query($conn, $sql);

    $object = new stdClass();

    $return = array();
    while ($row = $query->fetch_assoc()) {
        $object = new stdClass();
        $object->id = $row["id"];
        $object->name = $row["name"];

        array_push($return, $object);
    }

    echo json_encode($return);

    mysqli_close($conn);
}