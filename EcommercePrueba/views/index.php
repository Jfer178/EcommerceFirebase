<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Tienda de Barrio DE JEREMY PENDEJA</title>
    <link rel="stylesheet" href="../styles/index.css">
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
                <a href="index.html" class="active">Inicio</a>
                <a href="catalago.html">Catálogo</a>
                <a href="carrito.html"><i class="fas fa-shopping-cart"></i> Carrito</a>
                <a href="login.html"><i class="fas fa-user"></i> Iniciar Sesión</a>
            </div>
        </nav>
    </header>

    <main>
        <section class="hero">
            <h2 class="welcome-text">Bienvenido a Mi Tienda de Barrio</h2>
            <p class="subtitle">Descubre los mejores productos para tu hogar</p>
        </section>

        <section class="featured-products">
            <h2>Productos Destacados</h2>
            <div class="products-grid" id="products-container">
                <!-- Los productos se cargarán dinámicamente con JavaScript -->
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contacto</h3>
                <p>Email: info@mitiendadebarrio.com</p>
                <p>Teléfono: (123) 456-7890</p>
            </div>
            <div class="footer-section">
                <h3>Síguenos</h3>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Mi Tienda de Barrio. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="logic/db.js"></script>
    <script src="logic/catalogo.js"></script>
</body>
</html>
