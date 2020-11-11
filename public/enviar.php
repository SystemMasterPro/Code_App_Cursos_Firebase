<?php
//En el destino colocar el correo alque quieres que lleguen los datos del contacto de tu formulario
$nombre = $_POST['name'];
$mail = $_POST['mail'];
$empresa = $_POST['message'];

$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$mensaje = "Este mensaje fue enviado por " . $nombre . ",\r\n";
$mensaje .= "Su e-mail es: " . $mail . " \r\n";
$mensaje .= "Mensaje: " . $_POST['message'] . " \r\n";
$mensaje .= "Enviado el " . date('d/m/Y', time()) . " \r\n";
$mensaje .= "Y su numero es el ". $_POST['phone'];

$para = 'richardjimenez.9641@gmail.com';
$asunto = 'CURSOS ONLINE ';

mail($para, $asunto, utf8_decode($mensaje), $header);

header("Location:index.html");
//Esto es opcional, aqui pueden colocar un mensaje de "enviado correctamente" o redireccionarlo a algun lugar
?>