<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/vendor/autoload.php';
require_once 'db.php';

/* =========================================
   MIDTRANS CONFIG
========================================= */

\Midtrans\Config::$serverKey = 'Mid-server-CrTdnigRuLCIl34SLTt9CEVO';
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

/* =========================================
   AMBIL DATA DARI FETCH JS
========================================= */

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$name   = $data['name'];
$email  = $data['email'];
$phone  = $data['phone'];
$amount = $data['total'];

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

$snapToken =
\Midtrans\Snap::getSnapToken($params);

/* =========================================
   KIRIM TOKEN KE JS
========================================= */

echo json_encode([
    "token" => $snapToken
]);

?>