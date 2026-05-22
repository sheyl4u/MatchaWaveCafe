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