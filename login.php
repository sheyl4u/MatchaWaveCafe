<?php
session_start();
include("db.php");

$email = $_POST['email'];
$password = $_POST['password'];

$query = mysqli_query(
    $conn,
    "SELECT * FROM users WHERE email='$email'"
);

$data = mysqli_fetch_assoc($query);

if($data){

    if(password_verify($password, $data['password'])){

        $_SESSION['name'] = $data['name'];
        $_SESSION['email'] = $data['email'];

        echo $data['name'];

    } else {

        echo "Email atau password salah";

    }

} else {

    echo "Email atau password salah";

}
?>