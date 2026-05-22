<?php
require_once 'vendor/autoload.php';

// Konfigurasi Midtrans
\Midtrans\Config::$serverKey = 'Mid-server-CrTdnigRuLCIl34SLTt9CEVO';
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

// Ambil total dari URL
$total = isset($_GET['total']) ? (int)$_GET['total'] : 10000;

// Data transaksi
$params = array(
  'transaction_details' => array(
    'order_id' => 'ORDER-' . rand(),
    'gross_amount' => $total,
  ),
  'customer_details' => array(
    'first_name' => "Siswa",
    'email' => "siswa@mail.com",
  ),
);

// Generate Snap Token
$snapToken = \Midtrans\Snap::getSnapToken($params);

// Kirim token ke frontend
echo $snapToken;
?>