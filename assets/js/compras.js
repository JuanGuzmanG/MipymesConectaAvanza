// archivo.js (Combinado)

// Productos de ejemplo
const productos = [
  { id: 1, nombre: "Software logistica 1", precio: 100, categoria: "inventario", imagen: "assets/img/marketplace.jpg" },
  { id: 2, nombre: "Prestamo 1", precio: 150, categoria: "financiero", imagen: "assets/img/marketplace.jpg" },
  { id: 3, nombre: "Curso 1", precio: 200, categoria: "educativo", imagen: "assets/img/marketplace.jpg" },
  { id: 4, nombre: "Campaña 1", precio: 200, categoria: "marketing", imagen: "assets/img/marketplace.jpg" },
  { id: 5, nombre: "Software logistica 2", precio: 110, categoria: "inventario", imagen: "assets/img/marketplace.jpg" },
  { id: 6, nombre: "Prestamo 2", precio: 160, categoria: "financiero", imagen: "assets/img/marketplace.jpg" },
  { id: 7, nombre: "Curso 2", precio: 210, categoria: "educativo", imagen: "assets/img/marketplace.jpg" },
  { id: 8, nombre: "Campaña 2", precio: 210, categoria: "marketing", imagen: "assets/img/marketplace.jpg" },
  { id: 9, nombre: "Software logistica 3", precio: 120, categoria: "inventario", imagen: "assets/img/marketplace.jpg" },
  { id: 10, nombre: "Prestamo 3", precio: 170, categoria: "financiero", imagen: "assets/img/marketplace.jpg" },
  { id: 11, nombre: "Curso 3", precio: 220, categoria: "educativo", imagen: "assets/img/marketplace.jpg" },
  { id: 12, nombre: "Campaña 3", precio: 220, categoria: "marketing", imagen: "assets/img/marketplace.jpg" },
  { id: 13, nombre: "Software logistica 4", precio: 130, categoria: "inventario", imagen: "assets/img/marketplace.jpg" },
  { id: 14, nombre: "Prestamo 4", precio: 180, categoria: "financiero", imagen: "assets/img/marketplace.jpg" },
  { id: 15, nombre: "Curso 4", precio: 230, categoria: "educativo", imagen: "assets/img/marketplace.jpg" },
  { id: 16, nombre: "Campaña 4", precio: 230, categoria: "marketing", imagen: "assets/img/marketplace.jpg" }
];

// Inicializar carrito
let carrito = [];
const carritoDOM = document.getElementById("carrito");
const totalDOM = document.getElementById("total");
const botonVaciar = document.getElementById("boton-vaciar");
const cartCounter = document.getElementById("cart-counter");
const filtros = document.querySelectorAll(".form-check-input");

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const totalProductos = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
  cartCounter.textContent = totalProductos;
}

// Función para guardar el carrito en Local Storage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para cargar el carrito desde Local Storage
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

// Función para renderizar los productos
function renderizarProductos(listaProductos = productos) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  listaProductos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
      <div class="card h-100 p-3">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" />
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <div class="text-center">
            <button class="btn btn-primary" data-id="${producto.id}">Agregar</button>
          </div>
        </div>
      </div>`;
    cardsContainer.appendChild(card);
  });

  document.querySelectorAll(".btn-primary").forEach((boton) =>
    boton.addEventListener("click", agregarProducto)
  );
}

// Función para agregar un producto al carrito
function agregarProducto(event) {
  const idProducto = parseInt(event.target.dataset.id);
  const producto = productos.find((prod) => prod.id === idProducto);
  const productoExistente = carrito.find((prod) => prod.id === idProducto);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
  // Actualizar el carrito en el sidebar
  carritoDOM.innerHTML = "";
  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "align-items-center", "border-primary-subtle");
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center w-100">
        <div class="d-flex align-items-center">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail" style="width: 50px; margin-right: 10px;" />
          <div>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</div>
        </div>
        <div class="ml-auto">
          <button class="btn btn-danger btn-sm" data-index="${index}">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>`;
    carritoDOM.appendChild(li);

    li.querySelector(".btn-danger").addEventListener("click", () => {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }
      guardarCarritoEnLocalStorage();
      actualizarCarrito();
    });
  });

  // Actualizar el total del carrito
  const total = carrito.reduce((sum, prod) => sum + prod.precio * prod.cantidad, 0);
  totalDOM.textContent = total;

  // Actualizar el contador de productos
  actualizarContadorCarrito();
}

// Función para filtrar productos por categorías
function filtrarProductos() {
  const categoriasSeleccionadas = Array.from(filtros)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const productosFiltrados = categoriasSeleccionadas.length > 0
    ? productos.filter((producto) => categoriasSeleccionadas.includes(producto.categoria))
    : productos;

  renderizarProductos(productosFiltrados);
}

// Manejo del evento para vaciar el carrito
botonVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarritoEnLocalStorage();
  actualizarCarrito();
});

// Inicializar la aplicación
cargarCarritoDesdeLocalStorage();
renderizarProductos();

filtros.forEach((checkbox) =>
  checkbox.addEventListener("change", filtrarProductos)
);
