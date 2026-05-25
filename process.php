<?php

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// require __DIR__ . '/vendor/autoload.php';
// require __DIR__ . '/db.php';

// \Midtrans\Config::$serverKey = 'Mid-server-49a4xObtkA19uqUHXVEjbemu';
// \Midtrans\Config::$isProduction = false;

// $params = array(
//     'transaction_details' => array(
//         'order_id' => rand(),
//         'gross_amount' => 10000,
//     ),
// );

// $snapToken = \Midtrans\Snap::getSnapToken($params);

// ?>

// <!DOCTYPE html>
// <html>
// <head>

// <script
// type="text/javascript"
// src="https://app.sandbox.midtrans.com/snap/snap.js"
// data-client-key="Mid-client-iz-JBWzlgZnwCLpR">
// </script>

// </head>

// <body>

// <button onclick="payNow()">
// Bayar
// </button>

// <script>

// function payNow(){

//     snap.pay('<?= $snapToken ?>');

// }

// </script>

// </body>
// </html>