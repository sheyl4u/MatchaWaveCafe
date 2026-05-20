<?php

include 'db.php';

/* tampilkan error */
error_reporting(E_ALL);
ini_set('display_errors', 1);

$username = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

/* hash password */
$passwordHash = password_hash(
    $password,
    PASSWORD_DEFAULT
);

/* query insert */

$sql = "INSERT INTO users
(username,email,password)

VALUES
('$username','$email','$passwordHash')";

if(mysqli_query($conn,$sql)){

    echo "success";

}else{

    echo mysqli_error($conn);

}

?>