// Función para crear las tarjetas de productos
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <div class="product-actions">
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
                <button class="btn btn-secondary view-details" data-id="${product.id}">
                    <i class="fas fa-eye"></i> Ver Detalles
                </button>
            </div>
        </div>
    `;

    // Agregar animación al hover
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
    });

    // Agregar evento al botón de carrito
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
        if (window.db.addToCart(productId)) {
            showNotification('Producto agregado al carrito');
            animateButton(addToCartBtn);
        }
    });

    return card;
}

// Función para mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animar la notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remover la notificación después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para animar botón
function animateButton(button) {
    button.classList.add('clicked');
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 300);
}

// Función para cargar productos
function loadProducts(products) {
    const productsContainer = document.getElementById('catalog-products') || document.getElementById('products-container');
    if (!productsContainer) return;

    // Limpiar el contenedor
    productsContainer.innerHTML = '';

    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <p>No se encontraron productos</p>
            </div>
        `;
        return;
    }

    products.forEach((product, index) => {
        const card = createProductCard(product);
        // Agregar animación de entrada
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        productsContainer.appendChild(card);

        // Animar la entrada de cada tarjeta
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Función para manejar la búsqueda
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        const category = document.getElementById('category-filter').value;
        let products = window.db.getProducts();

        if (category) {
            products = window.db.getProductsByCategory(category);
        }

        if (query) {
            products = window.db.searchProducts(query);
        }

        loadProducts(products);
    });
}

// Función para manejar el filtro de categorías
function handleCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    if (!categoryFilter) return;

    categoryFilter.addEventListener('change', (e) => {
        const category = e.target.value;
        const searchQuery = document.getElementById('search-input').value;
        let products = window.db.getProducts();

        if (category) {
            products = window.db.getProductsByCategory(category);
        }

        if (searchQuery) {
            products = window.db.searchProducts(searchQuery);
        }

        loadProducts(products);
    });
}

// Agregar estilos para las notificaciones
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .btn.clicked {
        transform: scale(0.95);
    }

    .no-products {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 10px;
        margin-top: 2rem;
    }

    .no-products i {
        font-size: 3rem;
        color: #ccc;
        margin-bottom: 1rem;
    }

    .no-products p {
        color: #666;
    }
`;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(window.db.getProducts());
    handleSearch();
    handleCategoryFilter();
});
