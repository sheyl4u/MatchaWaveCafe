<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>MatchaWave Payment</title>

<script src="https://app.sandbox.midtrans.com/snap/snap.js"
data-client-key="Mid-client-_4-QMLHAwzVUVfC_"></script>

<body>
<button id="pay">Bayar</button>

<script>
document.getElementById('pay').onclick = async function(){
  const res = await fetch('checkout.php');
  const token = await res.text();

  window.snap.pay(token, {
    onSuccess: function(){
      alert("Berhasil");
    },
    onPending: function(){
      alert("Pending");
    },
    onError: function(){
      alert("Gagal");
    }
  });
};