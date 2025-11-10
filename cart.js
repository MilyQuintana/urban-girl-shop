// =========================================================
// ESTRUCTURA DEL CARRITO CON LOCALSTORAGE (cart.js)
// =========================================================

// CLAVE de localStorage para guardar los productos
const STORAGE_KEY = 'urbanGirlCart'; 

// ---------------------------------------------------------
// A. FUNCIONES DE LECTURA Y ESCRITURA
// ---------------------------------------------------------

// 1. Obtiene el carrito del almacenamiento local
function getCart() {
    // Intenta obtener los datos, si no existen, devuelve un array vacío
    const cartData = localStorage.getItem(STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
}

// 2. Guarda el carrito en el almacenamiento local
function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// ---------------------------------------------------------
// B. FUNCIÓN PRINCIPAL DE AÑADIR PRODUCTO
// ---------------------------------------------------------

function addToCart(product) {
    let cart = getCart(); // Obtiene la lista actual
    
    // Busca si el producto (por ID y Talla) ya existe en el carrito
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && item.size === product.size
    );

    if (existingItemIndex > -1) {
        // Si existe, solo aumenta la cantidad
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        // Si es nuevo, lo añade
        cart.push(product);
    }

    saveCart(cart); // Guarda el carrito actualizado
    updateCartCount(); // Actualiza el contador del encabezado
    alert(`🛒 ¡${product.quantity}x ${product.name} (Talla ${product.size}) añadido al carrito!`);
}

// ---------------------------------------------------------
// C. FUNCIÓN PARA EL CONTADOR DEL ENCABEZADO
// ---------------------------------------------------------

function updateCartCount() {
    const cart = getCart();
    // Suma la cantidad de todos los productos en el carrito
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        // Actualiza el texto del enlace 🛍️ Carrito (X)
        cartLink.textContent = `🛍️ Carrito (${totalItems})`; 
    }
}

// Inicializa el contador al cargar la página
document.addEventListener('DOMContentLoaded', updateCartCount);