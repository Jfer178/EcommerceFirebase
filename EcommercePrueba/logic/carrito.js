// Función para crear un elemento del carrito
function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <h3 class="cart-item-title">${item.name}</h3>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
        </div>
        <button class="btn btn-secondary remove-item" data-id="${item.id}">
            <i class="fas fa-trash"></i>
        </button>
    `;

    // Agregar eventos a los botones
    const decreaseBtn = cartItem.querySelector('.decrease');
    const increaseBtn = cartItem.querySelector('.increase');
    const removeBtn = cartItem.querySelector('.remove-item');

    decreaseBtn.addEventListener('click', () => {
        if (item.quantity > 1) {
            window.db.updateCartItemQuantity(item.id, item.quantity - 1);
            updateCart();
        }
    });

    increaseBtn.addEventListener('click', () => {
        window.db.updateCartItemQuantity(item.id, item.quantity + 1);
        updateCart();
    });

    removeBtn.addEventListener('click', () => {
        cartItem.style.transform = 'translateX(100px)';
        cartItem.style.opacity = '0';
        setTimeout(() => {
            window.db.removeFromCart(item.id);
            updateCart();
        }, 300);
    });

    return cartItem;
}

// Función para actualizar el carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cart = window.db.getCart();

    // Limpiar el contenedor
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
                <a href="catalago.html" class="btn btn-primary">Ver Productos</a>
            </div>
        `;
        document.getElementById('cart-summary').style.display = 'none';
    } else {
        document.getElementById('cart-summary').style.display = 'block';
        cart.forEach(item => {
            const cartItem = createCartItem(item);
            cartItems.appendChild(cartItem);
        });
    }

    // Actualizar el total
    const total = window.db.getCartTotal();
    cartTotal.textContent = total.toFixed(2);
}

// Función para verificar si el usuario está logueado
function isUserLoggedIn() {
    return localStorage.getItem('userLoggedIn') === 'true';
}

// Función para mostrar notificación personalizada
function showCustomNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    
    const content = document.createElement('div');
    content.className = 'notification-content';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'notification-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    };
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    content.appendChild(closeBtn);
    content.appendChild(messageText);
    notification.appendChild(content);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    if (type === 'success') {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Función para manejar el checkout
function handleCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        const cart = window.db.getCart();
        if (cart.length === 0) {
            showCustomNotification('El carrito está vacío', 'error');
            return;
        }

        // Verificar si el usuario está logueado
        if (!isUserLoggedIn()) {
            showCustomNotification('Proceso Denegado', 'error');
            const loginMessage = document.createElement('p');
            loginMessage.className = 'login-message';
            loginMessage.textContent = 'Debe iniciar sesión para completar la compra';
            document.querySelector('.custom-notification.error .notification-content').appendChild(loginMessage);
            
            // Agregar botón para ir a login
            const loginBtn = document.createElement('a');
            loginBtn.href = 'login.html';
            loginBtn.className = 'login-redirect-btn';
            loginBtn.textContent = 'Ir a Iniciar Sesión';
            document.querySelector('.custom-notification.error .notification-content').appendChild(loginBtn);
            return;
        }

        // Animación del botón
        checkoutBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            checkoutBtn.style.transform = 'scale(1)';
        }, 200);

        // Proceso de compra exitoso
        showCustomNotification('¡Proceso Exitoso! Gracias por su compra', 'success');
        window.db.clearCart();
        updateCart();
    });
}

// Agregar estilos para las notificaciones personalizadas
const style = document.createElement('style');
style.textContent = `
    .custom-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 20px;
        min-width: 300px;
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .custom-notification.show {
        transform: translateX(0);
    }

    .custom-notification.error {
        border-left: 4px solid #f44336;
    }

    .custom-notification.success {
        border-left: 4px solid #4CAF50;
    }

    .notification-content {
        position: relative;
    }

    .notification-close {
        position: absolute;
        top: -10px;
        right: -10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
        padding: 5px;
        line-height: 1;
    }

    .notification-close:hover {
        color: #333;
    }

    .login-message {
        margin-top: 10px;
        color: #666;
        font-size: 0.9em;
    }

    .login-redirect-btn {
        display: inline-block;
        margin-top: 10px;
        padding: 8px 16px;
        background-color: var(--primary-color);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-size: 0.9em;
        transition: background-color 0.3s ease;
    }

    .login-redirect-btn:hover {
        background-color: #45a049;
    }
`;
document.head.appendChild(style);

// Inicializar el carrito cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
    handleCheckout();
});
