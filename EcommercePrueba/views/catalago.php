<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo - Mi Tienda de Barrio</title>
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
                <a href="index.html">Inicio</a>
                <a href="catalago.html" class="active">Catálogo</a>
                <a href="carrito.html"><i class="fas fa-shopping-cart"></i> Carrito</a>
                <a href="login.html"><i class="fas fa-user"></i> Iniciar Sesión</a>
            </div>
        </nav>
    </header>

    <main class="catalog-container">
        <div class="catalog-header">
            <h2>Nuestro Catálogo</h2>
            <div class="catalog-filters">
                <input type="text" id="search-input" placeholder="Buscar productos..." class="search-input">
                <select id="category-filter" class="category-filter">
                    <option value="">Todas las categorías</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="alimentos">Alimentos</option>
                    <option value="limpieza">Limpieza</option>
                </select>
            </div>
        </div>

        <div class="products-grid" id="catalog-products">
            <!-- Los productos se cargarán dinámicamente -->
        </div>
    </main>

    <script src="../logic/db.js"></script>
    <script src="../logic/catalogo.js"></script>
</body>
</html>
