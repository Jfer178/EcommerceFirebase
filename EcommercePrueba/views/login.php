<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - Mi Tienda de Barrio</title>
    <link rel="stylesheet" href="../styles/index.css">
    <link rel="stylesheet" href="../styles/login.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <header class="header">
        <nav class="nav-container">
            <div class="logo">
                <h1>Mi Tienda de Barrio</h1>
            </div>
            <div class="nav-links">
                <a href="index.html">Inicio</a>
                <a href="catalago.html">Catálogo</a>
                <a href="carrito.html"><i class="fas fa-shopping-cart"></i> Carrito</a>
                <a href="login.html" class="active"><i class="fas fa-user"></i> Iniciar Sesión</a>
            </div>
        </nav>
    </header>

    <main class="login-container">
        <div class="login-header">
            <h2>Bienvenido</h2>
            <p>Inicia sesión para continuar</p>
        </div>

        <form id="login-form">
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" required placeholder="tu@email.com">
            </div>

            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" required placeholder="••••••••">
            </div>

            <button type="submit" class="login-btn">
                <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
            </button>
        </form>

        <div class="login-footer">
            <p>¿No tienes una cuenta? <a href="#">Regístrate</a></p>
            <a href="#">¿Olvidaste tu contraseña?</a>
        </div>

        <div class="social-login">
            <p>O inicia sesión con</p>
            <div class="social-buttons">
                <button class="social-btn facebook">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button class="social-btn google">
                    <i class="fab fa-google"></i>
                </button>
                <button class="social-btn twitter">
                    <i class="fab fa-twitter"></i>
                </button>
            </div>
        </div>
    </main>

    <script src="../logic/auth.js"></script>
</body>
</html>
