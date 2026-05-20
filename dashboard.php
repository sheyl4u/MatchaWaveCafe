<?php

session_start();

if(!isset($_SESSION['user'])){

    header("Location:index.html");

}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
    content="width=device-width,
    initial-scale=1.0">

    <title>Dashboard</title>

    <link rel="stylesheet"
    href="style.css">

</head>

<body>

<div class="login-box">

    <h1>
        Welcome,
        <?php
        echo $_SESSION['user']['username'];
        ?>
        🍵
    </h1>

    <br>

    <a href="logout.php">

        <button>
            Logout
        </button>

    </a>

</div>

</body>
</html>