<?php
session_start();
include("db.php");
$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$check = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");

if(mysqli_num_rows($check) > 0){
    echo "email_exists";
    exit;
}

mysqli_query($conn, "
INSERT INTO users(name,email,password)
VALUES('$name','$email','$password')
");

$user = mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");
$data = mysqli_fetch_assoc($user);

$_SESSION['user'] = $data;
echo "success";
?>