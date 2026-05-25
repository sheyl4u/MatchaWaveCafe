<?php
require_once 'db.php';

$json = file_get_contents("php://input");
$data = json_decode($json);

$order_id = $data->order_id;
$status = $data->transaction_status;

$conn->query("UPDATE orders SET status='$status'
 WHERE order_id='$order_id'");