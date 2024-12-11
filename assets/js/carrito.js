function actualizarContadorGlobal() {
const cartCounter = document.getElementById("cart-counter"); // Referencia al contador en la página
if (cartCounter) {
const carritoGuardado = localStorage.getItem("carrito"); // Obtenemos el carrito guardado
const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// Calculamos el total de productos en el carrito
const totalProductos = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);

// Actualizamos el texto del contador
cartCounter.textContent = totalProductos;

// Ocultamos o mostramos el contador según el número de productos
cartCounter.style.display = totalProductos > 0 ? "inline" : "none";
}
}

// Llamar a la función al cargar la página
actualizarContadorGlobal();