<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito de Compras - Mi Tienda de Barrio</title>
    <link rel="stylesheet" href="../styles/index.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .cart-container {
            max-width: 1200px;
            margin: 100px auto 2rem;
            padding: 0 1rem;
        }

        .cart-item {
            background: white;
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .cart-item:hover {
            transform: translateX(5px);
        }

        .cart-item-image {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 5px;
        }

        .cart-item-details {
            flex: 1;
        }

        .cart-item-title {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }

        .cart-item-price {
            color: var(--primary-color);
            font-weight: 600;
        }

        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .quantity-btn {
            background: var(--background-color);
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .quantity-btn:hover {
            background: var(--primary-color);
            color: white;
        }

        .cart-summary {
            background: white;
            border-radius: 10px;
            padding: 1.5rem;
            margin-top: 2rem;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }

        .cart-total {
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }

        .checkout-btn {
            width: 100%;
            padding: 1rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .checkout-btn:hover {
            background: #45a049;
            transform: translateY(-2px);
        }

        .empty-cart {
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 10px;
            margin-top: 100px;
        }

        .empty-cart i {
            font-size: 4rem;
            color: #ccc;
            margin-bottom: 1rem;
        }

        .empty-cart p {
            color: #666;
            margin-bottom: 1rem;
        }
    </style>
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
                <a href="carrito.html" class="active"><i class="fas fa-shopping-cart"></i> Carrito</a>
                <a href="login.html"><i class="fas fa-user"></i> Iniciar Sesión</a>
            </div>
        </nav>
    </header>

    <main class="cart-container">
        <h2>Carrito de Compras</h2>
        <div id="cart-items">
            <!-- Los items del carrito se cargarán dinámicamente -->
        </div>
        <div id="cart-summary" class="cart-summary">
            <h3>Resumen del Pedido</h3>
            <p class="cart-total">Total: $<span id="cart-total">0.00</span></p>
            <button class="checkout-btn" id="checkout-btn">
                <i class="fas fa-credit-card"></i> Proceder al Pago
            </button>
        </div>
    </main>

    <script src="../logic/db.js"></script>
    <script src="../logic/carrito.js"></script>
</body>
</html>
