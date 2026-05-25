<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require 'config/db.php';
require 'vendor/autoload.php';

\Midtrans\Config::$serverKey = 'Mid-server-49a4xObtkA19uqUHXVEjbemu';
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

$customer_name = $_POST['customer_name'];
$product_name = $_POST['product_name'];
$total_price = $_POST['total_price'];

$order_id = "ORDER-" . rand();

mysqli_query($conn, "
INSERT INTO orders (
    order_id,
    customer_name,
    product_name,
    total_price,
    status
) VALUES (
    '$order_id',
    '$customer_name',
    '$product_name',
    '$total_price',
    'pending'
)
");

$params = array(
    'transaction_details' => array(
        'order_id' => $order_id,
        'gross_amount' => $total_price,
    ),

    'customer_details' => array(
        'first_name' => $customer_name,
    ),
);

$snapToken = \Midtrans\Snap::getSnapToken($params);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Pembayaran</title>

    <script 
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="Mid-client-iz-JBWzlgZnwCLpR">
    </script>
</head>
<body>

<script>

snap.pay('<?= $snapToken ?>', {

    onSuccess: function(result){
        window.location.href = "success.php";
    },

    onPending: function(result){
        alert("Menunggu pembayaran");
    },

    onError: function(result){
        alert("Pembayaran gagal");
    }

});

</script>

</body>
</html>