<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/vendor/autoload.php';
require_once 'db.php';

\Midtrans\Config::$serverKey = 'Mid-server-CrTdnigRuLCIl34SLTt9CEVO';
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

$order_id = "ORDER-" . time();

$name = "Budi";
$email = "budi@email.com";
$amount = 10000;

$conn->query("
INSERT INTO orders(order_id,name,email,amount,status)
VALUES('$order_id','$name','$email','$amount','pending')
");

$params = array(
    'transaction_details' => array(
        'order_id' => $order_id,
        'gross_amount' => $amount,
    ),
    'customer_details' => array(
        'first_name' => $name,
        'email' => $email,
    )
);

$snapToken = \Midtrans\Snap::getSnapToken($params);

echo $snapToken;