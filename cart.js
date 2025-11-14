// =========================================================
// ARCHIVO: cart.js (Lógica principal del carrito)
// =========================================================

const STORAGE_KEY = 'urbanGirlCart'; // Clave para guardar en localStorage

/**
 * 1. OBTIENE EL CARRITO
 * Lee el carrito desde localStorage. Si no existe, devuelve un array vacío.
 */
function getCart() {
    const cartData = localStorage.getItem(STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
}

/**
 * 2. GUARDA EL CARRITO
 * Convierte el array del carrito a JSON y lo guarda en localStorage.
 */
function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/**
 * 3. ACTUALIZA EL CONTADOR DEL ENCABEZADO
 * Esta es la función que refleja el total en la barra de inicio.
 */
function updateCartCount() {
    const cart = getCart();
    // Suma la 'quantity' de todos los ítems en el carrito
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Busca el enlace del carrito en el encabezado
    const cartLink = document.querySelector('.cart-link'); // Usaremos esta clase
    
    if (cartLink) {
        // Actualiza el texto para mostrar el número
        cartLink.textContent = `🛍️ Carrito (${totalItems})`;
    }
}

/**
 * 4. AÑADE AL CARRITO (La función del botón)
 * Esta es la función que llamará el botón de 'producto.html'.
 */
function addToCart(product) {
    let cart = getCart();
    
    // Busca si el producto (por ID y Talla) ya existe
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && item.size === product.size
    );

    if (existingItemIndex > -1) {
        // Si existe, solo suma la cantidad
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        // Si es nuevo, lo añade al array
        cart.push(product);
    }

    saveCart(cart); // Guarda el carrito actualizado
    updateCartCount(); // Actualiza el contador del encabezado
    
    // Alerta al usuario
    alert(`¡${product.quantity}x ${product.name} (Talla ${product.size}) añadido al carrito!`);
}

/**
 * 5. INICIALIZADOR
 * Llama a updateCartCount() cada vez que se carga una página 
 * para que el contador esté siempre actualizado.
 */
document.addEventListener('DOMContentLoaded', updateCartCount);

/* --- ESTILOS PARA FORMULARIO "AVÍSAME" (AGOTADO) --- */

/* Estilo para el texto de Agotado */
.stock-display.sold-out {
    font-size: 1.2em;
    font-weight: 700;
    margin-top: -15px;
    margin-bottom: 20px;
    color: #e63946; /* Un rojo de alerta */
}

/* Oculta etiquetas visualmente pero las deja para accesibilidad */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.notify-me-form {
    background-color: var(--color-fondo); /* Fondo pastel suave */
    padding: 20px;
    border-radius: 8px;
    border: 1px dashed var(--color-acento-rosa);
}

.notify-me-form h4 {
    margin-top: 0;
    color: var(--color-acento-rosa);
}
.notify-me-form p {
    font-size: 0.9em;
    color: #666;
    margin-bottom: 15px;
}

.notify-me-form form {
    display: flex;
    gap: 10px;
}

.notify-me-form input[type="email"] {
    flex-grow: 1;
    padding: 10px 15px;
    border: 1px solid var(--color-gris-claro);
    border-radius: 5px;
}
.notify-me-form input[type="email"]:focus {
    border-color: var(--color-acento-menta);
    outline: none;
}

.notify-submit-btn {
    padding: 10px 20px;
    background-color: var(--color-acento-menta);
    color: var(--color-texto);
    border: none;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}
.notify-submit-btn:hover {
    background-color: #92d989;
}
