<?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "matcha_wave"
);

if(!$conn){

    die("Koneksi database gagal!");

}

?>

<?php

$conn = new mysqli("localhost", "root", "", "matchawave");

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}