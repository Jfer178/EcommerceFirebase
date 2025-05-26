<?php
$servidor = "localhost";
$usuario = "root";
$password = "";
$base_datos = "tie";

// Crear conexión
$conn = new mysqli($servidor, $usuario, $password, $base_datos);

// Verificar conexión
if ($conn->connect_error) {
    die("❌ Conexión fallida: " . $conn->connect_error);
} else {
    echo "✅ Conexión exitosa con la base de datos '$base_datos' 🎉";
}
?>
