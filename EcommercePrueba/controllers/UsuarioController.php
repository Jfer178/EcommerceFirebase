<?php
require_once '../database/db.php';
require_once '../models/Usuario.php';

class UsuarioController {
    private $usuarioModel;

    public function __construct($db) {
        $this->usuarioModel = new Usuario($db);
    }

    public function login($email, $password) {
        $usuario = $this->usuarioModel->buscarUsuarioPorEmail($email);

        if ($usuario && password_verify($password, $usuario['contraseña'])) {
            session_start();
            $_SESSION['usuario'] = $usuario;
            header("Location: ../views/dashboard.php");
            exit();
        } else {
            header("Location: ../views/login.php?error=Credenciales incorrectas");
            exit();
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $controller = new UsuarioController($conn);
    $controller->login($_POST['email'], $_POST['password']);
}
?>
