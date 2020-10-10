<?php
//En el destino colocar el correo alque quieres que lleguen los datos del contacto de tu formulario
    $destino = "richardjimenez.9641@gmail.com";
    $name = $_POST["name"];
    $mail = $_POST["mail"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];
    $contenido = "Nombre: " . $name . "\nCorreo: " . $mail . "\nNúmero: " . $phone . "\nAsunto: " . $message;
    mail($destino, "Contacto", $contenido);
    header("Location:index.html");
//Esto es opcional, aqui pueden colocar un mensaje de "enviado correctamente" o redireccionarlo a algun lugar
?>