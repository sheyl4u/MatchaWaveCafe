<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/vendor/autoload.php';
require_once 'db.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/db.php';

\Midtrans\Config::$serverKey = 'Mid-server-49a4xObtkA19uqUHXVEjbemu';
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

$customer_name = $_POST['customer_name'];
$product_name  = $_POST['product_name'];
$total_price   = (int) $_POST['total_price'];

$order_id = "ORDER-" . rand();

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

echo $snapToken;

/* =========================================
   BUAT ORDER ID
========================================= */

$order_id = "ORDER-" . time();

/* =========================================
   SIMPAN KE DATABASE
========================================= */

$conn->query("
INSERT INTO orders(
order_id,
name,
email,
amount,
status
)

VALUES(
'$order_id',
'$name',
'$email',
'$amount',
'pending'
)
");

/* =========================================
   DATA MIDTRANS
========================================= */

$params = array(

    'transaction_details' => array(
        'order_id' => $order_id,
        'gross_amount' => $amount,
    ),

    'customer_details' => array(
        'first_name' => $name,
        'email' => $email,
        'phone' => $phone
    )

);

/* =========================================
   GENERATE SNAP TOKEN
========================================= */

try {

    $snapToken =
    \Midtrans\Snap::getSnapToken($params);

    echo json_encode([
        "token" => $snapToken
    ]);

} catch (Exception $e) {

    echo json_encode([
        "error" => $e->getMessage()
    ]);

}
?>