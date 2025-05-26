// Simulación de base de datos con productos
const products = [
    {
        id: 1,
        name: "Arroz Premium",
        price: 2.99,
        image: "/img/cocacola.png",
        description: "Arroz de grano largo premium",
        category: "alimentos",
        stock: 50
    },
    {
        id: 2,
        name: "Aceite de Oliva",
        price: 5.99,
        image: "/img/cocacola.png",
        description: "Aceite de oliva extra virgen",
        category: "alimentos",
        stock: 30
    },
    {
        id: 3,
        name: "Leche Entera",
        price: 1.99,
        image: "/img/cocacola.png",
        description: "Leche entera fresca",
        category: "bebidas",
        stock: 40
    },
    {
        id: 4,
        name: "Pan Integral",
        price: 2.49,
        image: "/img/cocacola.png",
        description: "Pan integral recién horneado",
        category: "alimentos",
        stock: 25
    },
    {
        id: 5,
        name: "Detergente Líquido",
        price: 4.99,
        image: "/img/cocacola.png",
        description: "Detergente líquido para ropa",
        category: "limpieza",
        stock: 35
    },
    {
        id: 6,
        name: "Agua Mineral",
        price: 0.99,
        image: "/img/cocacola.png",
        description: "Agua mineral natural",
        category: "bebidas",
        stock: 100
    },
    {
        id: 7,
        name: "Jabón de Baño",
        price: 1.49,
        image: "/img/cocacola.png",
        description: "Jabón de baño suave",
        category: "limpieza",
        stock: 45
    },
    {
        id: 8,
        name: "Café Molido",
        price: 3.99,
        image: "/img/cocacola.png",
        description: "Café molido premium",
        category: "bebidas",
        stock: 30
    }
];

// Carrito de compras
let cart = [];

// Funciones para el manejo de productos
const getProducts = () => {
    return products;
};

const getProductById = (id) => {
    return products.find(product => product.id === id);
};

const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(product => product.category === category);
};

const searchProducts = (query) => {
    query = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );
};

// Funciones para el manejo del carrito
const addToCart = (productId, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return false;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    saveCart();
    return true;
};

const removeFromCart = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
};

const updateCartItemQuantity = (productId, quantity) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
    }
};

const getCart = () => {
    return cart;
};

const clearCart = () => {
    cart = [];
    saveCart();
};

const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Persistencia del carrito en localStorage
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const loadCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
};

// Cargar el carrito al iniciar
loadCart();

// Exportar funciones
window.db = {
    getProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getCart,
    clearCart,
    getCartTotal
};
