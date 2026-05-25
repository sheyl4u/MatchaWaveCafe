<?php

require_once 'vendor/autoload.php';

\Midtrans\Config::$serverKey = 'Mid-server-49a4xObtkA19uqUHXVEjbemu';
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

$total = isset($_GET['total'])
    ? (int)$_GET['total']
    : 10000;

$name = isset($_GET['name']) ? $_GET['name'] : 'Customer';
$email = isset($_GET['email']) ? $_GET['email'] : '';

$params = array(
    'transaction_details' => array(
        'order_id' => 'ORDER-' . rand(),
        'gross_amount' => $total,
    ),
    'customer_details' => array(
        'first_name' => $name,
        'email'      => $email,
    )
);

$snapToken = \Midtrans\Snap::getSnapToken($params);

echo trim($snapToken);