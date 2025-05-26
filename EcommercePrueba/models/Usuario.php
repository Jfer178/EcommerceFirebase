<?php
require_once '../database/db.php';

class Usuario {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function buscarUsuarioPorEmail($email) {
        $query = "SELECT * FROM usuarios WHERE correo = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function registrarUsuario($correo, $contraseña, $nombre, $rol) {
        $hashPassword = password_hash($contraseña, PASSWORD_DEFAULT);
        $query = "INSERT INTO usuarios (correo, contraseña, nombre, rol, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, NOW(), NOW())";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("ssss", $correo, $hashPassword, $nombre, $rol);
        return $stmt->execute();
    }
}
?>
